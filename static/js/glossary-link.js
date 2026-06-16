/* Glossary connections: auto-link the first mention of any glossary term on a page,
   and show a hover preview with the term summary. Index is built at /glossary/index.json. */
(function () {
  'use strict';
  var body = document.querySelector('.article-body');
  if (!body) return;

  // Generic short words we never auto-link (too common, would be noise).
  var STOP = { ai: 1, ml: 1, ui: 1, ux: 1, os: 1, db: 1, an: 1, is: 1, it: 1, or: 1, no: 1 };
  var curPath = location.pathname.replace(/\/+$/, '/');

  fetch('/glossary/index.json', { credentials: 'same-origin', cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (terms) {
      if (!terms || !terms.length) return;

      // alias (lowercased) -> {u,s,t}. Keep the longest set of aliases for matching.
      var map = new Map();
      var aliases = [];
      terms.forEach(function (e) {
        if (!e.u || e.u.replace(/\/+$/, '/') === curPath) return; // skip self
        (e.a || [e.t]).forEach(function (al) {
          if (!al) return;
          var key = al.toLowerCase().trim();
          if (key.length < 3 || STOP[key]) return;
          if (!map.has(key)) { map.set(key, { u: e.u, s: e.s || '', t: e.t, r: e.r || [], k: e.k || '' }); aliases.push(al); }
        });
      });
      if (!aliases.length) return;

      // Longest aliases first so "Retrieval Augmented Generation" beats "Generation".
      aliases.sort(function (a, b) { return b.length - a.length; });
      function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
      var re = new RegExp('\\b(' + aliases.map(esc).join('|') + ')\\b', 'gi');

      var used = new Set();          // one link per glossary target per page
      var SKIP = { A: 1, CODE: 1, PRE: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, BUTTON: 1, SCRIPT: 1, STYLE: 1 };
      function blocked(node) {
        for (var p = node.parentNode; p && p !== body; p = p.parentNode) {
          if (SKIP[p.nodeName] || (p.classList && (p.classList.contains('gl-term') || p.classList.contains('code-block')))) return true;
        }
        return false;
      }

      // Collect text nodes first (DOM mutation during walk is unsafe).
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

      // Interactive, pinnable preview card. Hover = quick peek; single click = pin it open
      // (read it, click the related links); click the same term again = hide; double-click =
      // jump to the full glossary entry. Esc or an outside click also dismisses a pinned card.
      var card = document.createElement('div');
      card.className = 'gl-hover';
      card.setAttribute('hidden', '');
      document.body.appendChild(card);
      var hideTimer, pinned = null, overCard = false;

      function es2(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
      function render(t) {
        var rel = [];
        try { rel = JSON.parse(t.getAttribute('data-gl-rel') || '[]'); } catch (e) {}
        var relHtml = rel.length
          ? '<div class="gl-hover-rel"><span class="gl-hover-rel-label">Related</span>' +
            rel.map(function (x) { return '<a href="' + es2(x.u) + '">' + es2(x.t) + '</a>'; }).join('') + '</div>'
          : '';
        card.innerHTML =
          '<div class="gl-hover-term">' + es2(t.getAttribute('data-gl-term')) + '</div>' +
          '<div class="gl-hover-sum">' + es2(t.getAttribute('data-gl-sum') || 'Summary coming soon.') + '</div>' +
          relHtml +
          '<a class="gl-hover-link" href="' + es2(t.getAttribute('href')) + '">Open full entry &rarr;</a>' +
          '<span class="gl-hover-hint">Click to pin, double-click to open</span>';
      }
      function position(t) {
        var r = t.getBoundingClientRect();
        var cw = Math.min(card.offsetWidth || 340, 360);
        var left = Math.max(10, Math.min(r.left, window.innerWidth - cw - 10));
        var top = r.bottom + 8;
        if (top + card.offsetHeight > window.innerHeight - 10) top = Math.max(10, r.top - card.offsetHeight - 8);
        card.style.left = left + 'px';
        card.style.top = top + 'px';
      }
      function show(t, pin) {
        clearTimeout(hideTimer);
        render(t);
        card.classList.toggle('is-pinned', !!pin);
        card.removeAttribute('hidden');
        position(t);
      }
      function hide() { hideTimer = setTimeout(function () { if (!overCard && !pinned) card.setAttribute('hidden', ''); }, 150); }
      function unpin() { pinned = null; card.classList.remove('is-pinned'); card.setAttribute('hidden', ''); }

      body.addEventListener('mouseover', function (e) { var t = e.target.closest('.gl-term'); if (t && !pinned) show(t, false); });
      body.addEventListener('mouseout', function (e) { if (e.target.closest('.gl-term') && !pinned) hide(); });
      card.addEventListener('mouseenter', function () { overCard = true; clearTimeout(hideTimer); });
      card.addEventListener('mouseleave', function () { overCard = false; hide(); });

      var clickTimer = null;
      body.addEventListener('click', function (e) {
        var t = e.target.closest('.gl-term'); if (!t) return;
        e.preventDefault();
        if (clickTimer) return;                       // second click of a double-click: let dblclick handle it
        clickTimer = setTimeout(function () {
          clickTimer = null;
          if (pinned === t) { unpin(); }              // click again -> hide
          else { pinned = t; show(t, true); }         // click -> pin open
        }, 240);
      });
      body.addEventListener('dblclick', function (e) {
        var t = e.target.closest('.gl-term'); if (!t) return;
        e.preventDefault();
        clearTimeout(clickTimer); clickTimer = null;
        window.location.href = t.getAttribute('href'); // double-click -> open the page
      });

      document.addEventListener('click', function (e) {
        if (pinned && !e.target.closest('.gl-term') && !e.target.closest('.gl-hover')) unpin();
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pinned) unpin(); });

      body.addEventListener('focusin', function (e) { var t = e.target.closest('.gl-term'); if (t && !pinned) show(t, false); });
      body.addEventListener('focusout', function (e) { if (e.target.closest('.gl-term') && !pinned) hide(); });
    })
    .catch(function () {});
})();
