/* Glossary connections.
   Two behaviours, from one index built at /glossary/index.json:
   1. Inside an article body, auto-link the first mention of any glossary/tool term.
   2. EVERYWHERE on the page, show a hover preview card for any link that points to a
      glossary or tool article - including hand-written links and cards on layout pages
      like /layers/ and /architecture/, not just the auto-generated ones. */
(function () {
  'use strict';

  // Generic short words we never auto-link (too common, would be noise).
  var STOP = { ai: 1, ml: 1, ui: 1, ux: 1, os: 1, db: 1, an: 1, is: 1, it: 1, or: 1, no: 1 };
  var curPath = location.pathname.replace(/\/+$/, '/');

  // Load the term index, retrying a few times if it is not ready yet (covers the dev server
  // building it on demand, and any transient network hiccup in production).
  function loadIndex(tries) {
    return fetch('/glossary/index.json', { credentials: 'same-origin', cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (t) { if (!t || !t.length) throw new Error('empty'); return t; })
      .catch(function (e) {
        if (tries > 0) return new Promise(function (res) { setTimeout(res, 800); }).then(function () { return loadIndex(tries - 1); });
        return [];
      });
  }

  loadIndex(4)
    .then(function (terms) {
      if (!terms || !terms.length) return;

      // url (normalised, trailing slash) -> entry, so any <a> to that page can preview.
      var byUrl = {};
      terms.forEach(function (e) { if (e.u) byUrl[e.u.replace(/\/+$/, '/')] = e; });

      /* ---------- hover preview card (works site-wide) ---------- */
      var card = document.createElement('div');
      card.className = 'gl-hover';
      card.setAttribute('hidden', '');
      document.body.appendChild(card);
      var hideTimer, pinned = null, overCard = false;

      function es2(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
      function render(e, isProse) {
        var rel = e.r || [];
        var relHtml = rel.length
          ? '<div class="gl-hover-rel"><span class="gl-hover-rel-label">Related</span>' +
            rel.slice(0, 4).map(function (x) { return '<a href="' + es2(x.u) + '">' + es2(x.t) + '</a>'; }).join('') + '</div>'
          : '';
        card.innerHTML =
          '<div class="gl-hover-term">' + es2(e.t) + '</div>' +
          '<div class="gl-hover-sum">' + es2(e.s || 'Summary coming soon.') + '</div>' +
          relHtml +
          '<a class="gl-hover-link" href="' + es2(e.u) + '">Open full entry &rarr;</a>' +
          (isProse ? '<span class="gl-hover-hint">Click to pin, double-click to open</span>' : '');
      }
      function position(el) {
        var r = el.getBoundingClientRect();
        var cw = Math.min(card.offsetWidth || 340, 360);
        var left = Math.max(10, Math.min(r.left, window.innerWidth - cw - 10));
        var top = r.bottom + 8;
        if (top + card.offsetHeight > window.innerHeight - 10) top = Math.max(10, r.top - card.offsetHeight - 8);
        card.style.left = left + 'px';
        card.style.top = top + 'px';
      }
      function show(el, entry, pin, isProse) {
        clearTimeout(hideTimer);
        render(entry, isProse);
        card.classList.toggle('is-pinned', !!pin);
        card.removeAttribute('hidden');
        position(el);
      }
      function hide() { hideTimer = setTimeout(function () { if (!overCard && !pinned) card.setAttribute('hidden', ''); }, 150); }
      function unpin() { pinned = null; card.classList.remove('is-pinned'); card.setAttribute('hidden', ''); }
      card.addEventListener('mouseenter', function () { overCard = true; clearTimeout(hideTimer); });
      card.addEventListener('mouseleave', function () { overCard = false; hide(); });

      // Resolve the entry + whether it is a prose auto-link, for a hovered element.
      var CHROME = '.gl-hover, .nav-container, .site-header, .site-footer, .footer-container, .mobile-nav, .nav-mega';
      function lookup(el) {
        var term = el.closest('.gl-term');
        if (term) {
          var rel = []; try { rel = JSON.parse(term.getAttribute('data-gl-rel') || '[]'); } catch (e) {}
          return { prose: true, el: term, entry: { t: term.getAttribute('data-gl-term'), s: term.getAttribute('data-gl-sum'), u: term.getAttribute('href'), r: rel } };
        }
        var a = el.closest('a[href]');
        if (!a || a.closest(CHROME)) return null;
        var href;
        try { href = new URL(a.href, location.origin).pathname.replace(/\/+$/, '/'); } catch (e) { return null; }
        if (href === curPath) return null;
        var entry = byUrl[href];
        return entry ? { prose: false, el: a, entry: entry } : null;
      }

      document.addEventListener('mouseover', function (e) {
        if (pinned) return;
        var el = e.target.closest('.gl-term, a[href]'); if (!el) return;
        var hit = lookup(el); if (!hit) return;
        show(hit.el, hit.entry, false, hit.prose);
      });
      document.addEventListener('mouseout', function (e) {
        if (pinned) return;
        if (e.target.closest('.gl-term, a[href]')) hide();
      });

      // Click-to-pin only for auto-linked prose terms; real links navigate normally.
      var clickTimer = null;
      document.addEventListener('click', function (e) {
        var term = e.target.closest('.gl-term');
        if (!term) { if (pinned && !e.target.closest('.gl-hover')) unpin(); return; }
        e.preventDefault();
        if (clickTimer) return;
        clickTimer = setTimeout(function () {
          clickTimer = null;
          if (pinned === term) unpin();
          else { pinned = term; show(term, lookup(term).entry, true, true); }
        }, 240);
      });
      document.addEventListener('dblclick', function (e) {
        var t = e.target.closest('.gl-term'); if (!t) return;
        e.preventDefault(); clearTimeout(clickTimer); clickTimer = null;
        window.location.href = t.getAttribute('href');
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pinned) unpin(); });

      /* ---------- auto-link prose (article bodies only) ---------- */
      var body = document.querySelector('.article-body');
      if (!body) return;

      var map = new Map();
      var aliases = [];
      terms.forEach(function (e) {
        if (e.x) return;                                          // hover-only entry, never auto-link in prose
        if (!e.u || e.u.replace(/\/+$/, '/') === curPath) return; // skip self
        (e.a || [e.t]).forEach(function (al) {
          if (!al) return;
          var key = al.toLowerCase().trim();
          if (key.length < 3 || STOP[key]) return;
          if (!map.has(key)) { map.set(key, { u: e.u, s: e.s || '', t: e.t, r: e.r || [], k: e.k || '' }); aliases.push(al); }
        });
      });
      if (!aliases.length) return;

      aliases.sort(function (a, b) { return b.length - a.length; });
      function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
      var re = new RegExp('\\b(' + aliases.map(esc).join('|') + ')\\b', 'gi');

      var used = new Set();
      var SKIP = { A: 1, CODE: 1, PRE: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, BUTTON: 1, SCRIPT: 1, STYLE: 1 };
      function blocked(node) {
        for (var p = node.parentNode; p && p !== body; p = p.parentNode) {
          if (SKIP[p.nodeName] || (p.classList && (p.classList.contains('gl-term') || p.classList.contains('code-block')))) return true;
        }
        return false;
      }

      var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null);
      var nodes = [], n;
      while ((n = walker.nextNode())) { if (n.nodeValue.trim().length > 2 && !blocked(n)) nodes.push(n); }

      nodes.forEach(function (node) {
        var current = node;
        while (current && current.nodeValue) {
          re.lastIndex = 0;
          var text = current.nodeValue, m, hit = null;
          while ((m = re.exec(text))) {
            var key = m[0].toLowerCase();
            var entry = map.get(key);
            if (entry && !used.has(entry.u)) { hit = { i: m.index, len: m[0].length, entry: entry }; break; }
          }
          if (!hit) break;
          used.add(hit.entry.u);
          var after = current.splitText(hit.i + hit.len);
          var termNode = current.splitText(hit.i);
          var a = document.createElement('a');
          a.className = hit.entry.k === 't' ? 'gl-term gl-tool' : 'gl-term';
          a.href = hit.entry.u;
          a.setAttribute('data-gl-term', hit.entry.t);
          a.setAttribute('data-gl-sum', hit.entry.s);
          if (hit.entry.r && hit.entry.r.length) a.setAttribute('data-gl-rel', JSON.stringify(hit.entry.r.slice(0, 4)));
          a.textContent = termNode.nodeValue;
          termNode.parentNode.replaceChild(a, termNode);
          current = after;
        }
      });
    })
    .catch(function () {});
})();
