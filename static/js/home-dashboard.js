/* home-dashboard.js — turns the homepage into a front door instead of a brochure.
 *
 * Reads two stores that already exist on every visitor's machine and are written
 * by scripts already loaded site-wide. This file only reads them; it starts no
 * new tracking and sends nothing anywhere.
 *
 *   aiwiki.visited.v1  (visited.js)      { "/path/": epochMillis }
 *   ai-wiki-lib-v1     (wiki-library.js) { articles: { "/path/": {title, status, savedAt} } }
 *
 * Progressive enhancement: the markup ships with a fallback block visible and the
 * personal block hidden. If there is nothing stored — a first visit, a cleared
 * browser, a private window — nothing changes and the fallback stands. Only when
 * real data exists do we swap. That way the common case (a first-time visitor)
 * is never shown a set of empty boxes.
 */
(function () {
  'use strict';

  var VISITED_KEY = 'aiwiki.visited.v1';
  var LIB_KEY = 'ai-wiki-lib-v1';
  var MAX = 5;

  function readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch (e) { return null; }
  }

  var visited = readJSON(VISITED_KEY) || {};
  var lib = readJSON(LIB_KEY) || {};
  var articles = (lib && lib.articles) || {};

  var visitedPaths = Object.keys(visited);
  var libPaths = Object.keys(articles);

  // Nothing to personalise: leave the server-rendered fallback exactly as it is.
  if (!visitedPaths.length && !libPaths.length) return;

  var personal = document.getElementById('home-personal');
  var fallback = document.getElementById('home-fallback');
  if (!personal) return;

  function norm(p) { return String(p || '').replace(/\/+$/, '') + '/'; }

  function titleFromPath(p) {
    var seg = norm(p).replace(/\/$/, '').split('/').pop() || '';
    if (!seg) return p;
    return seg.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function sectionFromPath(p) {
    var parts = norm(p).split('/').filter(Boolean);
    return parts.length ? parts[0].replace(/-/g, ' ') : '';
  }

  function li(path, title, meta, metaClass) {
    var a = document.createElement('a');
    a.className = 'hd-row';
    a.href = path;
    var t = document.createElement('span');
    t.className = 'hd-row-title';
    t.textContent = title || titleFromPath(path);
    var s = document.createElement('span');
    s.className = 'hd-row-sec';
    s.textContent = sectionFromPath(path);
    // Order matters: the grid is `1fr auto`, and .hd-row-sec is pinned to
    // column 1. Appending title -> meta -> sec puts the meta label top-right and
    // the section under the title, matching the server-rendered rows exactly.
    a.appendChild(t);
    if (meta) {
      var m = document.createElement('span');
      m.className = 'hd-row-meta' + (metaClass ? ' ' + metaClass : '');
      m.textContent = meta;
      a.appendChild(m);
    }
    a.appendChild(s);
    return a;
  }

  function fill(id, nodes, emptyText) {
    var host = document.getElementById(id);
    if (!host) return 0;
    host.textContent = '';
    if (!nodes.length) {
      if (emptyText) {
        var p = document.createElement('p');
        p.className = 'hd-empty';
        p.textContent = emptyText;
        host.appendChild(p);
      }
      return 0;
    }
    nodes.forEach(function (n) { host.appendChild(n); });
    return nodes.length;
  }

  function ago(ms) {
    var d = Math.floor((Date.now() - ms) / 86400000);
    if (d <= 0) return 'today';
    if (d === 1) return 'yesterday';
    if (d < 30) return d + ' days ago';
    var m = Math.floor(d / 30);
    return m === 1 ? 'a month ago' : m + ' months ago';
  }

  /* 1. Mid-read: whatever wiki-library.js has marked "reading". */
  var reading = libPaths
    .filter(function (p) { return articles[p] && articles[p].status === 'reading'; })
    .sort(function (a, b) { return (articles[b].savedAt || 0) - (articles[a].savedAt || 0); })
    .slice(0, MAX)
    .map(function (p) { return li(p, articles[p].title, 'reading', 'hd-meta-accent'); });

  /* 2. Saved for later. */
  var saved = libPaths
    .filter(function (p) { return articles[p] && articles[p].status === 'saved'; })
    .sort(function (a, b) { return (articles[b].savedAt || 0) - (articles[a].savedAt || 0); })
    .slice(0, MAX)
    .map(function (p) { return li(p, articles[p].title, null); });

  /* 3. Recently read, excluding anything already shown above. */
  var shown = {};
  reading.concat(saved).forEach(function (n) { shown[norm(n.getAttribute('href'))] = 1; });
  var recent = visitedPaths
    .filter(function (p) { return !shown[norm(p)]; })
    .sort(function (a, b) { return visited[b] - visited[a]; })
    .slice(0, MAX)
    .map(function (p) {
      var meta = articles[p] && articles[p].title;
      return li(p, meta, ago(visited[p]));
    });

  var nReading = fill('hd-reading', reading);
  var nSaved = fill('hd-saved', saved);
  var nRecent = fill('hd-recent', recent);

  // Hide any of the three blocks that came up empty, so we never show a titled
  // box with nothing in it.
  [['hd-reading', nReading], ['hd-saved', nSaved], ['hd-recent', nRecent]].forEach(function (pair) {
    var blk = document.querySelector('[data-hd-block="' + pair[0] + '"]');
    if (blk && !pair[1]) blk.hidden = true;
  });

  if (nReading || nSaved || nRecent) {
    personal.hidden = false;
    if (fallback) fallback.hidden = true;
  }

  /* 4. The genuinely novel one: pages you have read that changed afterwards.
   *    Needs the site's lastmod index, so it loads async and appears late.
   *    Failure here is silent — the rest of the page does not depend on it. */
  if (!visitedPaths.length) return;

  fetch('/index.json', { credentials: 'omit' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (pages) {
      if (!pages || !pages.length) return;
      var byUrl = {};
      pages.forEach(function (p) { if (p && p.url) byUrl[norm(p.url)] = p; });

      var stale = visitedPaths
        .map(function (p) {
          var page = byUrl[norm(p)];
          if (!page || !page.lastmod) return null;
          var mod = Date.parse(page.lastmod + 'T23:59:59');
          if (!mod || mod <= visited[p]) return null;
          return { path: p, page: page, mod: mod };
        })
        .filter(Boolean)
        .sort(function (a, b) { return b.mod - a.mod; })
        .slice(0, MAX)
        .map(function (x) {
          return li(x.page.url, x.page.title, 'updated ' + ago(x.mod), 'hd-meta-accent');
        });

      if (!stale.length) return;
      fill('hd-stale', stale);
      var blk = document.querySelector('[data-hd-block="hd-stale"]');
      if (blk) blk.hidden = false;
      personal.hidden = false;
      if (fallback) fallback.hidden = true;
    })
    .catch(function () { /* index unavailable: this block simply never appears */ });
})();
