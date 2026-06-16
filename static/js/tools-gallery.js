/* Comprehensive tools gallery: faceted filtering (category/provider/type/free), top quick
   filters synced with the rail, search, and favorites (localStorage, never sent). */
(function () {
  'use strict';
  var grid = document.querySelector('.tg-grid');
  if (!grid) return;
  var FAVKEY = 'aiwiki.favorites.v1';
  function loadFav() { try { return JSON.parse(localStorage.getItem(FAVKEY)) || {}; } catch (e) { return {}; } }
  function saveFav(o) { try { localStorage.setItem(FAVKEY, JSON.stringify(o)); } catch (e) {} }
  var favs = loadFav();

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.tg-card'));
  var groupFacets = document.querySelectorAll('.tg-facet[data-group]');
  var browseFacets = document.querySelectorAll('.tg-facet[data-facet]');
  var stats = document.querySelectorAll('.tg-stat');
  var search = document.querySelector('.tg-search');
  var empty = document.querySelector('.xp-empty');
  var shown = document.querySelector('.tg-shown');
  var favCount = document.querySelector('.tg-fav-count');

  var state = { category: null, provider: null, type: null, free: null, fav: false, text: '' };

  function matches(c) {
    if (state.fav && !favs[c.getAttribute('data-slug')]) return false;
    if (state.category && c.getAttribute('data-category') !== state.category) return false;
    if (state.provider && c.getAttribute('data-provider') !== state.provider) return false;
    if (state.type && c.getAttribute('data-type') !== state.type) return false;
    if (state.free && c.getAttribute('data-free') !== '1') return false;
    if (state.text) {
      var hay = (c.getAttribute('data-title') || '') + ' ' + (c.getAttribute('data-tags') || '');
      if (hay.indexOf(state.text) === -1) return false;
    }
    return true;
  }
  function apply() {
    var n = 0;
    for (var i = 0; i < cards.length; i++) {
      var ok = matches(cards[i]);
      cards[i].style.display = ok ? '' : 'none';
      if (ok) n++;
    }
    if (shown) shown.textContent = n;
    if (empty) empty.hidden = n > 0;
  }
  function noFilters() { return !state.category && !state.provider && !state.type && !state.free && !state.fav; }
  function syncUI() {
    groupFacets.forEach(function (b) {
      b.classList.toggle('is-active', state[b.getAttribute('data-group')] === b.getAttribute('data-value'));
    });
    browseFacets.forEach(function (b) {
      var f = b.getAttribute('data-facet');
      b.classList.toggle('is-active', (f === 'fav') ? state.fav : (f === 'all' && noFilters()));
    });
    stats.forEach(function (s) {
      var v = s.getAttribute('data-stat'), on = false;
      if (v === 'all') on = noFilters();
      else if (v.indexOf('provider:') === 0) on = state.provider === v.split(':')[1];
      else if (v === 'free') on = !!state.free;
      s.classList.toggle('is-active', on);
    });
  }
  function refresh() { syncUI(); apply(); }

  groupFacets.forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.getAttribute('data-group'), v = b.getAttribute('data-value');
      state[g] = (state[g] === v) ? null : v;
      state.fav = false;
      refresh();
    });
  });
  browseFacets.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-facet');
      if (f === 'all') { state = { category: null, provider: null, type: null, free: null, fav: false, text: state.text }; }
      else if (f === 'fav') { state.fav = !state.fav; }
      refresh();
    });
  });
  stats.forEach(function (s) {
    s.addEventListener('click', function () {
      var v = s.getAttribute('data-stat');
      state = { category: null, provider: null, type: null, free: null, fav: false, text: state.text };
      if (v.indexOf('provider:') === 0) state.provider = v.split(':')[1];
      else if (v === 'free') state.free = '1';
      refresh();
    });
  });
  if (search) search.addEventListener('input', function () { state.text = search.value.trim().toLowerCase(); apply(); });

  // favorites
  function renderFav() {
    cards.forEach(function (c) {
      var btn = c.querySelector('.tg-fav');
      if (btn) btn.classList.toggle('is-on', !!favs[c.getAttribute('data-slug')]);
    });
    if (favCount) favCount.textContent = Object.keys(favs).length;
  }
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.tg-fav');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    var slug = btn.getAttribute('data-slug');
    if (favs[slug]) delete favs[slug]; else favs[slug] = Date.now();
    saveFav(favs); renderFav();
    if (state.fav) apply();
  });
  renderFav();
  refresh();
})();
