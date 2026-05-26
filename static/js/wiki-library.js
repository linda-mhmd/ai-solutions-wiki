/* wiki-library.js — browser-only knowledge base for ai-solutions.wiki
   All data lives in localStorage. Nothing is sent to a server.
   User content is set via textContent/value/setAttribute — never via innerHTML. */

(function () {
  'use strict';

  var KEY = 'ai-wiki-lib-v1';
  var STATUS_LABELS = { saved: 'Saved', reading: 'Reading', done: 'Done' };

  // ─── DOM builder (safe, no innerHTML for user content) ─────────────────────

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'className') node.className = attrs[k];
      else if (k === 'textContent') node.textContent = attrs[k];
      else if (k === 'value') node.value = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    if (children) children.forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function txt(s) { return document.createTextNode(s || ''); }

  function clearAndAppend(container, nodes) {
    while (container.firstChild) container.removeChild(container.firstChild);
    nodes.forEach(function (n) { if (n) container.appendChild(n); });
  }

  // ─── Data layer ────────────────────────────────────────────────────────────

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      var d = JSON.parse(raw);
      return d.v === 1 ? d : fresh();
    } catch (e) { return fresh(); }
  }

  function fresh() { return { v: 1, articles: {}, playlists: [], customLinks: [] }; }

  function persist(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch (e) { console.warn('[wiki-library] localStorage write failed:', e); }
  }

  function track(event, props) {
    if (typeof plausible === 'function') plausible(event, { props: props || {} });
  }

  // ─── Article CRUD ──────────────────────────────────────────────────────────

  function getArticle(url) { return load().articles[url] || null; }

  function saveArticle(meta, status) {
    var d = load();
    var ex = d.articles[meta.url] || {};
    d.articles[meta.url] = {
      title: meta.title, section: meta.section, tags: meta.tags || [],
      savedAt: ex.savedAt || Date.now(),
      status: status || ex.status || 'saved',
      note: ex.note || '', questions: ex.questions || ''
    };
    persist(d);
    track('Save Article', { section: meta.section });
  }

  function unsaveArticle(url) {
    var d = load(); delete d.articles[url]; persist(d);
    track('Unsave Article', {});
  }

  function updateField(url, field, value) {
    var d = load();
    if (d.articles[url]) { d.articles[url][field] = value; persist(d); }
  }

  // ─── Playlist CRUD ─────────────────────────────────────────────────────────

  function createPlaylist(name, goal) {
    var d = load();
    var pl = { id: uid(), name: name, goal: goal || '', urls: [], createdAt: Date.now() };
    d.playlists.push(pl); persist(d);
    track('Create Playlist', {});
    return pl.id;
  }

  function deletePlaylist(id) {
    var d = load(); d.playlists = d.playlists.filter(function (p) { return p.id !== id; }); persist(d);
  }

  // ─── Custom links CRUD ─────────────────────────────────────────────────────

  function addCustomLink(url, title, note) {
    var d = load();
    d.customLinks.push({ id: uid(), url: url, title: title || url, note: note || '', addedAt: Date.now() });
    persist(d);
    track('Add Custom Link', {});
  }

  function deleteCustomLink(id) {
    var d = load(); d.customLinks = d.customLinks.filter(function (l) { return l.id !== id; }); persist(d);
  }

  // ─── Export / Import ───────────────────────────────────────────────────────

  function exportLibrary() {
    var d = load();
    var blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ai-wiki-library-' + dateStr() + '.json';
    a.click();
    track('Export Library', { count: Object.keys(d.articles).length });
  }

  function importLibrary(file, onDone) {
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var inc = JSON.parse(e.target.result);
        if (inc.v !== 1) { alert('Unrecognised file format.'); return; }
        var existing = load();
        existing.articles = Object.assign({}, existing.articles, inc.articles || {});
        existing.playlists = existing.playlists.concat(inc.playlists || []);
        existing.customLinks = existing.customLinks.concat(inc.customLinks || []);
        persist(existing);
        track('Import Library', { count: Object.keys(inc.articles || {}).length });
        if (onDone) onDone();
      } catch (err) { alert('Could not read file. Make sure it is a valid AI Solutions Wiki export.'); }
    };
    reader.readAsText(file);
  }

  // ─── Plan generator ────────────────────────────────────────────────────────

  function generatePlan() {
    var d = load();
    var entries = Object.entries(d.articles);
    var reading = entries.filter(function (e) { return e[1].status === 'reading'; });
    var saved = entries.filter(function (e) { return e[1].status === 'saved'; });
    var done = entries.filter(function (e) { return e[1].status === 'done'; });

    function artLine(url, a) {
      var lines = ['- [' + a.title + '](https://ai-solutions.wiki' + url + ')'];
      if (a.note) lines.push('  > ' + a.note);
      if (a.questions) lines.push('  > Questions: ' + a.questions);
      return lines.join('\n');
    }

    var out = ['# My AI Learning Plan',
      'Generated ' + new Date().toLocaleDateString() + ' from AI Solutions Wiki', '',
      '**' + entries.length + ' articles saved** — ' + done.length + ' done, ' + reading.length + ' reading, ' + saved.length + ' to read', ''];
    if (reading.length) { out.push('## Currently Reading'); reading.forEach(function (e) { out.push(artLine(e[0], e[1])); }); out.push(''); }
    if (saved.length) { out.push('## Up Next'); saved.forEach(function (e) { out.push(artLine(e[0], e[1])); }); out.push(''); }
    if (done.length) { out.push('## Completed'); done.forEach(function (e) { out.push(artLine(e[0], e[1])); }); out.push(''); }
    if (d.playlists.length) {
      out.push('## Playlists');
      d.playlists.forEach(function (pl) {
        out.push('### ' + pl.name);
        if (pl.goal) out.push('*Goal: ' + pl.goal + '*');
        pl.urls.forEach(function (u) {
          var a = d.articles[u];
          out.push('- ' + (a ? '[' + a.title + '](https://ai-solutions.wiki' + u + ')' : u));
        });
        out.push('');
      });
    }
    if (d.customLinks.length) {
      out.push('## External Resources');
      d.customLinks.forEach(function (l) { out.push('- [' + l.title + '](' + l.url + ')'); if (l.note) out.push('  > ' + l.note); });
    }
    var blob = new Blob([out.join('\n')], { type: 'text/markdown' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'learning-plan-' + dateStr() + '.md';
    a.click();
    track('Generate Plan', { article_count: entries.length });
  }

  // ─── Semantic suggestions via Pagefind ─────────────────────────────────────

  async function findRelated(url) {
    try {
      var path = new URL(url).pathname;
      var keywords = path.replace(/[/\-_]/g, ' ').trim().split(/\s+/).filter(function (w) { return w.length > 3; });
      if (!keywords.length) return [];
      var pf = await import('/pagefind/pagefind.js');
      await pf.init();
      var res = await pf.search(keywords.join(' '));
      var top = await Promise.all(res.results.slice(0, 4).map(function (r) { return r.data(); }));
      return top.map(function (r) { return { url: r.url, title: r.meta && r.meta.title ? r.meta.title : r.url }; });
    } catch (e) { return []; }
  }

  // ─── Utilities ─────────────────────────────────────────────────────────────

  function uid() { return Math.random().toString(36).slice(2, 10); }
  function dateStr() { return new Date().toISOString().slice(0, 10); }
  function debounce(fn, ms) {
    var t; return function () { var a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, a); }, ms); };
  }

  // ─── Article save panel ────────────────────────────────────────────────────

  function statusBtn(label, statusVal, activeStatus) {
    var btn = el('button', { className: 'lib-status-btn' + (activeStatus === statusVal ? ' lib-status-btn--active' : ''), 'data-status': statusVal });
    btn.textContent = label;
    return btn;
  }

  function renderPanel(meta, mountId) {
    var mount = document.getElementById(mountId);
    if (!mount || !meta) return;
    var article = getArticle(meta.url);
    var isSaved = !!article;

    var panel = el('div', { className: 'lib-panel' });

    // Header row
    var header = el('div', { className: 'lib-panel-header' });
    var bookmarkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bookmarkSvg.setAttribute('width', '15'); bookmarkSvg.setAttribute('height', '15');
    bookmarkSvg.setAttribute('viewBox', '0 0 24 24');
    bookmarkSvg.setAttribute('fill', isSaved ? 'currentColor' : 'none');
    bookmarkSvg.setAttribute('stroke', 'currentColor'); bookmarkSvg.setAttribute('stroke-width', '2');
    bookmarkSvg.setAttribute('stroke-linecap', 'round'); bookmarkSvg.setAttribute('stroke-linejoin', 'round');
    bookmarkSvg.setAttribute('aria-hidden', 'true');
    var bookmarkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bookmarkPath.setAttribute('d', 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z');
    bookmarkSvg.appendChild(bookmarkPath);
    header.appendChild(bookmarkSvg);

    var titleSpan = el('span', { className: 'lib-panel-title' });
    titleSpan.textContent = isSaved ? 'In your library' : 'Save to your library';
    header.appendChild(titleSpan);

    if (!isSaved) {
      var saveBtn = el('button', { className: 'lib-save-btn', id: 'lib-save-btn' });
      saveBtn.textContent = 'Save';
      saveBtn.addEventListener('click', function () { saveArticle(meta, 'saved'); renderPanel(meta, mountId); });
      header.appendChild(saveBtn);
    }
    panel.appendChild(header);

    if (!isSaved) {
      var hint = el('p', { className: 'lib-panel-hint' });
      hint.textContent = 'Only stored in this browser. Never sent anywhere.';
      panel.appendChild(hint);
    } else {
      // Status buttons
      var statusRow = el('div', { className: 'lib-status-row' });
      Object.keys(STATUS_LABELS).forEach(function (s) {
        var btn = statusBtn(STATUS_LABELS[s], s, article.status);
        btn.addEventListener('click', function () { updateField(meta.url, 'status', s); renderPanel(meta, mountId); });
        statusRow.appendChild(btn);
      });
      panel.appendChild(statusRow);

      // Note field
      var noteLabel = el('label', { className: 'lib-field-label', for: 'lib-note' });
      noteLabel.textContent = 'Notes';
      panel.appendChild(noteLabel);
      var noteArea = el('textarea', { id: 'lib-note', className: 'lib-textarea', rows: '3', placeholder: 'What matters about this article...' });
      noteArea.value = article.note || '';
      noteArea.addEventListener('input', debounce(function (e) { updateField(meta.url, 'note', e.target.value); }, 600));
      panel.appendChild(noteArea);

      // Questions field
      var qLabel = el('label', { className: 'lib-field-label', for: 'lib-questions' });
      qLabel.textContent = 'Questions to look up';
      panel.appendChild(qLabel);
      var qArea = el('textarea', { id: 'lib-questions', className: 'lib-textarea', rows: '2', placeholder: 'What do you still want to understand...' });
      qArea.value = article.questions || '';
      qArea.addEventListener('input', debounce(function (e) { updateField(meta.url, 'questions', e.target.value); }, 600));
      panel.appendChild(qArea);

      // Footer
      var footer = el('div', { className: 'lib-panel-footer' });
      var libLink = el('a', { className: 'lib-link', href: '/my-library/' });
      libLink.textContent = 'View library →';
      footer.appendChild(libLink);
      var unsaveBtn = el('button', { className: 'lib-unsave-btn' });
      unsaveBtn.textContent = 'Remove';
      unsaveBtn.addEventListener('click', function () {
        if (confirm('Remove this article from your library?')) { unsaveArticle(meta.url); renderPanel(meta, mountId); }
      });
      footer.appendChild(unsaveBtn);
      panel.appendChild(footer);
    }

    clearAndAppend(mount, [panel]);
  }

  // ─── Library page ──────────────────────────────────────────────────────────

  function makeArticleCard(url, a, mountId) {
    var card = el('div', { className: 'libpage-article-card', 'data-status': a.status });

    var top = el('div', { className: 'libpage-card-top' });
    var link = el('a', { className: 'libpage-card-title', href: url });
    link.textContent = a.title;
    top.appendChild(link);
    var badge = el('span', { className: 'libpage-status-badge libpage-status-badge--' + a.status });
    badge.textContent = STATUS_LABELS[a.status];
    top.appendChild(badge);
    card.appendChild(top);

    if (a.section) { var sec = el('span', { className: 'libpage-section-tag' }); sec.textContent = a.section; card.appendChild(sec); }
    if (a.note) { var note = el('p', { className: 'libpage-card-note' }); note.textContent = a.note; card.appendChild(note); }
    if (a.questions) {
      var qp = el('p', { className: 'libpage-card-questions' });
      var qb = el('strong'); qb.textContent = 'Q: '; qp.appendChild(qb); qp.appendChild(txt(a.questions));
      card.appendChild(qp);
    }

    var actions = el('div', { className: 'libpage-card-actions' });
    Object.keys(STATUS_LABELS).forEach(function (s) {
      var btn = el('button', { className: 'lib-status-btn' + (a.status === s ? ' lib-status-btn--active' : ''), 'data-url': url, 'data-status': s });
      btn.textContent = STATUS_LABELS[s];
      btn.addEventListener('click', function () { updateField(url, 'status', s); renderLibraryPage(mountId); });
      actions.appendChild(btn);
    });
    var removeBtn = el('button', { className: 'libpage-remove-btn' });
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () {
      if (confirm('Remove from library?')) { unsaveArticle(url); renderLibraryPage(mountId); }
    });
    actions.appendChild(removeBtn);
    card.appendChild(actions);
    return card;
  }

  function makePlaylistCard(pl, d, mountId) {
    var card = el('div', { className: 'libpage-playlist-card' });
    var hdr = el('div', { className: 'libpage-playlist-header' });
    var nameEl = el('strong', { className: 'libpage-playlist-name' }); nameEl.textContent = pl.name; hdr.appendChild(nameEl);
    if (pl.goal) { var goalEl = el('span', { className: 'libpage-playlist-goal' }); goalEl.textContent = pl.goal; hdr.appendChild(goalEl); }
    var delBtn = el('button', { className: 'libpage-remove-btn' }); delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', function () { if (confirm('Delete this playlist?')) { deletePlaylist(pl.id); renderLibraryPage(mountId); } });
    hdr.appendChild(delBtn);
    card.appendChild(hdr);
    var list = el('ul', { className: 'libpage-playlist-urls' });
    if (!pl.urls.length) {
      var empty = el('li', { className: 'libpage-empty-inline' }); empty.textContent = 'No articles yet.'; list.appendChild(empty);
    } else {
      pl.urls.forEach(function (u) {
        var a = d.articles[u];
        var li = el('li'); var link = el('a', { href: u }); link.textContent = a ? a.title : u; li.appendChild(link); list.appendChild(li);
      });
    }
    card.appendChild(list);
    return card;
  }

  function makeLinkCard(l, mountId) {
    var card = el('div', { className: 'libpage-link-card' });
    var top = el('div', { className: 'libpage-link-card-top' });
    var link = el('a', { href: l.url, target: '_blank', rel: 'noopener', className: 'libpage-link-url' }); link.textContent = l.title; top.appendChild(link);
    var removeBtn = el('button', { className: 'libpage-remove-btn' }); removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () { deleteCustomLink(l.id); renderLibraryPage(mountId); });
    top.appendChild(removeBtn); card.appendChild(top);
    if (l.note) { var noteEl = el('p', { className: 'libpage-link-note' }); noteEl.textContent = l.note; card.appendChild(noteEl); }
    return card;
  }

  function renderLibraryPage(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var d = load();
    var articleEntries = Object.entries(d.articles).sort(function (a, b) { return b[1].savedAt - a[1].savedAt; });
    var total = articleEntries.length;
    var doneCount = articleEntries.filter(function (e) { return e[1].status === 'done'; }).length;
    var readingCount = articleEntries.filter(function (e) { return e[1].status === 'reading'; }).length;

    var page = el('div', { className: 'libpage' });

    // ── Header ────────────────────────────────────────────────────────────────
    var hdr = el('header', { className: 'libpage-header' });
    var hdrRow = el('div', { className: 'libpage-heading-row' });
    var h1 = el('h1', { className: 'libpage-title' }); h1.textContent = 'My Library'; hdrRow.appendChild(h1);

    var badge = el('p', { className: 'libpage-private-badge' });
    badge.textContent = '🔒 Only on this device';
    hdrRow.appendChild(badge);
    hdr.appendChild(hdrRow);

    var stats = el('div', { className: 'libpage-stats' });
    function stat(text, mod) { var s = el('span', { className: 'libpage-stat' + (mod ? ' libpage-stat--' + mod : '') }); s.textContent = text; return s; }
    stats.appendChild(stat(total + ' saved'));
    stats.appendChild(stat(readingCount + ' reading', 'reading'));
    stats.appendChild(stat(doneCount + ' done', 'done'));
    hdr.appendChild(stats);

    var acts = el('div', { className: 'libpage-actions' });
    var expBtn = el('button', { className: 'libpage-btn', id: 'lib-export-btn' }); expBtn.textContent = 'Export JSON';
    expBtn.addEventListener('click', exportLibrary);
    acts.appendChild(expBtn);

    var impLabel = el('label', { className: 'libpage-btn libpage-btn--outline', for: 'lib-import-input' });
    impLabel.textContent = 'Import JSON';
    var impInput = el('input', { type: 'file', id: 'lib-import-input', accept: '.json', style: 'display:none' });
    impInput.addEventListener('change', function () { if (this.files[0]) importLibrary(this.files[0], function () { renderLibraryPage(mountId); }); });
    impLabel.appendChild(impInput);
    acts.appendChild(impLabel);

    var planBtn = el('button', { className: 'libpage-btn libpage-btn--accent', id: 'lib-plan-btn' }); planBtn.textContent = 'Download Learning Plan .md';
    planBtn.addEventListener('click', generatePlan);
    acts.appendChild(planBtn);
    hdr.appendChild(acts);
    page.appendChild(hdr);

    // ── Tabs ──────────────────────────────────────────────────────────────────
    var tabs = el('div', { className: 'libpage-tabs' });
    var tabDefs = [['articles', 'Articles (' + total + ')'], ['playlists', 'Playlists (' + d.playlists.length + ')'], ['links', 'External Links (' + d.customLinks.length + ')']];
    var panels = {};
    tabDefs.forEach(function (def, i) {
      var tab = el('button', { className: 'libpage-tab' + (i === 0 ? ' libpage-tab--active' : ''), 'data-tab': def[0] });
      tab.textContent = def[1];
      tabs.appendChild(tab);
    });
    page.appendChild(tabs);

    // ── Articles panel ────────────────────────────────────────────────────────
    var artPanel = el('div', { className: 'libpage-panel libpage-panel--active', id: 'libpanel-articles' });
    if (!total) {
      var emptyDiv = el('div', { className: 'libpage-empty' });
      var emptyP = el('p'); emptyP.textContent = 'No articles saved yet.'; emptyDiv.appendChild(emptyP);
      var emptyP2 = el('p'); emptyP2.textContent = 'Browse the wiki and click "Save to your library" on any article.'; emptyDiv.appendChild(emptyP2);
      var browseLink = el('a', { href: '/', className: 'libpage-btn' }); browseLink.textContent = 'Browse the wiki'; emptyDiv.appendChild(browseLink);
      artPanel.appendChild(emptyDiv);
    } else {
      var filterRow = el('div', { className: 'libpage-filter-row' });
      [['all', 'All'], ['saved', 'Saved'], ['reading', 'Reading'], ['done', 'Done']].forEach(function (f, i) {
        var fb = el('button', { className: 'libpage-filter' + (i === 0 ? ' libpage-filter--active' : ''), 'data-filter': f[0] });
        fb.textContent = f[1];
        fb.addEventListener('click', function () {
          artPanel.querySelectorAll('.libpage-filter').forEach(function (b) { b.classList.remove('libpage-filter--active'); });
          fb.classList.add('libpage-filter--active');
          artPanel.querySelectorAll('.libpage-article-card').forEach(function (card) {
            card.style.display = (f[0] === 'all' || card.dataset.status === f[0]) ? '' : 'none';
          });
        });
        filterRow.appendChild(fb);
      });
      artPanel.appendChild(filterRow);
      var artList = el('div', { className: 'libpage-article-list' });
      articleEntries.forEach(function (e) { artList.appendChild(makeArticleCard(e[0], e[1], mountId)); });
      artPanel.appendChild(artList);
    }
    panels.articles = artPanel;
    page.appendChild(artPanel);

    // ── Playlists panel ───────────────────────────────────────────────────────
    var plPanel = el('div', { className: 'libpage-panel', id: 'libpanel-playlists', style: 'display:none' });
    var plForm = el('div', { className: 'libpage-add-form' });
    var plTitle = el('h3', { className: 'libpage-form-title' }); plTitle.textContent = 'Create a playlist'; plForm.appendChild(plTitle);
    var plNameInput = el('input', { type: 'text', id: 'pl-name', className: 'libpage-input', placeholder: 'Playlist name (e.g. MVP Journey)' });
    plForm.appendChild(plNameInput);
    var plGoalInput = el('input', { type: 'text', id: 'pl-goal', className: 'libpage-input', placeholder: 'Goal (optional)' });
    plForm.appendChild(plGoalInput);
    var plCreateBtn = el('button', { className: 'libpage-btn' }); plCreateBtn.textContent = 'Create playlist';
    plCreateBtn.addEventListener('click', function () {
      var name = plNameInput.value.trim();
      if (!name) { plNameInput.focus(); return; }
      createPlaylist(name, plGoalInput.value.trim());
      renderLibraryPage(mountId);
      showTab('playlists');
    });
    plForm.appendChild(plCreateBtn);
    plPanel.appendChild(plForm);
    if (!d.playlists.length) {
      var plEmpty = el('p', { className: 'libpage-empty-inline' }); plEmpty.textContent = 'No playlists yet.'; plPanel.appendChild(plEmpty);
    } else {
      d.playlists.forEach(function (pl) { plPanel.appendChild(makePlaylistCard(pl, d, mountId)); });
    }
    panels.playlists = plPanel;
    page.appendChild(plPanel);

    // ── Custom links panel ────────────────────────────────────────────────────
    var clPanel = el('div', { className: 'libpage-panel', id: 'libpanel-links', style: 'display:none' });
    var clForm = el('div', { className: 'libpage-add-form' });
    var clTitle = el('h3', { className: 'libpage-form-title' }); clTitle.textContent = 'Add an external resource'; clForm.appendChild(clTitle);
    var clUrlInput = el('input', { type: 'url', id: 'cl-url', className: 'libpage-input', placeholder: 'https://' });
    clForm.appendChild(clUrlInput);
    var clTitleInput = el('input', { type: 'text', id: 'cl-title', className: 'libpage-input', placeholder: 'Title (optional)' });
    clForm.appendChild(clTitleInput);
    var clNoteInput = el('input', { type: 'text', id: 'cl-note', className: 'libpage-input', placeholder: 'Why it matters (optional)' });
    clForm.appendChild(clNoteInput);
    var clAddBtn = el('button', { className: 'libpage-btn' }); clAddBtn.textContent = 'Add link';
    clAddBtn.addEventListener('click', function () {
      var url = clUrlInput.value.trim();
      if (!url) { clUrlInput.focus(); return; }
      addCustomLink(url, clTitleInput.value.trim() || url, clNoteInput.value.trim());
      renderLibraryPage(mountId);
      showTab('links');
    });
    clForm.appendChild(clAddBtn);

    // Semantic suggestions
    var relDiv = el('div', { className: 'libpage-related', style: 'display:none' });
    clUrlInput.addEventListener('input', debounce(async function (e) {
      var val = e.target.value.trim();
      if (!val || !val.startsWith('http')) { relDiv.style.display = 'none'; return; }
      var related = await findRelated(val);
      if (!related.length) { relDiv.style.display = 'none'; return; }
      relDiv.style.display = '';
      clearAndAppend(relDiv, []);
      var relLabel = el('p', { className: 'libpage-related-label' }); relLabel.textContent = 'Related articles on this wiki:';
      relDiv.appendChild(relLabel);
      related.forEach(function (r) {
        var rLink = el('a', { href: r.url, className: 'libpage-related-link' }); rLink.textContent = r.title; relDiv.appendChild(rLink);
      });
    }, 800));
    clForm.appendChild(relDiv);
    clPanel.appendChild(clForm);

    if (!d.customLinks.length) {
      var clEmpty = el('p', { className: 'libpage-empty-inline' }); clEmpty.textContent = 'No external links saved yet.'; clPanel.appendChild(clEmpty);
    } else {
      d.customLinks.forEach(function (l) { clPanel.appendChild(makeLinkCard(l, mountId)); });
    }
    panels.links = clPanel;
    page.appendChild(clPanel);

    // ── Tab switching ─────────────────────────────────────────────────────────
    function showTab(name) {
      tabs.querySelectorAll('.libpage-tab').forEach(function (t) {
        t.classList.toggle('libpage-tab--active', t.dataset.tab === name);
      });
      Object.keys(panels).forEach(function (k) {
        panels[k].style.display = k === name ? '' : 'none';
      });
    }
    tabs.querySelectorAll('.libpage-tab').forEach(function (tab) {
      tab.addEventListener('click', function () { showTab(tab.dataset.tab); });
    });

    clearAndAppend(mount, [page]);
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    // Read article metadata from <meta name="wiki:*"> tags.
    // Using meta attributes avoids Hugo's JS-context double-encoding that occurs
    // with inline <script> tags and jsonify.
    var meta = null;
    var metaUrl = document.querySelector('meta[name="wiki:url"]');
    if (metaUrl) {
      meta = {
        url: metaUrl.getAttribute('content'),
        title: (document.querySelector('meta[name="wiki:title"]') || {}).getAttribute ? document.querySelector('meta[name="wiki:title"]').getAttribute('content') : document.title,
        section: (document.querySelector('meta[name="wiki:section"]') || { getAttribute: function() { return ''; } }).getAttribute('content'),
        tags: ((document.querySelector('meta[name="wiki:tags"]') || { getAttribute: function() { return ''; } }).getAttribute('content') || '').split(',').filter(Boolean)
      };
    }
    if (meta && document.getElementById('wiki-library-panel')) {
      renderPanel(meta, 'wiki-library-panel');
    }
    if (document.getElementById('wiki-library-app')) {
      renderLibraryPage('wiki-library-app');
    }
  });

})();
