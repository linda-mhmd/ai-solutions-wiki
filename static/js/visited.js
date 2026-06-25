/* Visited tracking (localStorage only, never sent anywhere). Marks the current page as
   seen and flags already-seen cards/links so studying feels like progress. */
(function () {
  'use strict';
  var KEY = 'aiwiki.visited.v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  var visited = load();
  var path = location.pathname.replace(/\/+$/, '/');

  // Mark the current page as visited if it is a real content page.
  if (document.querySelector('.article-content') || document.querySelector('.tool-hero')) {
    var prev = visited[path];            // last time this page was seen (before now)
    var firstTime = !prev;
    visited[path] = Date.now();
    save(visited);
    if (!firstTime) {
      // Returning to a page seen before: a quiet eye in the breadcrumb area, with the
      // last-seen date/time revealed on hover. Low-key, not a loud badge.
      // Append into the breadcrumb's flex row (the ol) so the eye sits inline at the end,
      // not orphaned on its own line below the trail.
      var host = document.querySelector('.breadcrumbs ol') || document.querySelector('.sl-breadcrumb');
      if (host && !document.querySelector('.seen-note')) {
        var label = 'Seen before';
        if (prev) {
          try {
            var d = new Date(prev);
            var ds = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
            var ts = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
            label = 'Seen before · ' + ds + ', ' + ts;
          } catch (e) {}
        }
        var s = document.createElement('span');
        s.className = 'seen-note';
        s.setAttribute('tabindex', '0');
        s.setAttribute('role', 'note');
        s.setAttribute('aria-label', label);
        s.setAttribute('data-tip', label);
        s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
        host.appendChild(s);
      }
    }
  }

  // Explicitly "learned" pages (from the Mark as learned button).
  var learned = {};
  try { learned = JSON.parse(localStorage.getItem('aiwiki.learned.v1')) || {}; } catch (e) {}

  // Flag already-visited and learned cards / list links.
  var sel = 'a.sl-card, a.idx-article-row, a.idx-news-card, a.th-foot-link, a.sl-sb-link';
  document.querySelectorAll(sel).forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '/') return;
    var p = href.replace(/\/+$/, '/');
    if (learned[p]) a.classList.add('is-learned');
    else if (visited[p] && p !== path) a.classList.add('is-visited');
  });
})();
