/* =============================================================================
 * AI-Solutions Wiki - Knowledge Galaxy
 * Renderer + interactions. Vanilla JS, no dependencies. Drop into static/js/.
 * Reads window.GALAXY_DATA (see galaxy-data.js).
 * ========================================================================== */
(function () {
  "use strict";

  const D = window.GALAXY_DATA;
  if (!D) { console.error("[galaxy] window.GALAXY_DATA not found"); return; }

  const VW = D.meta.virtualW, VH = D.meta.virtualH;
  const DIFF = D.difficulties;
  // Hugo's jsonify sorts object keys alphabetically, so fix an explicit easy-to-hard order.
  const DIFF_ORDER = ["beginner", "easy", "moderate", "hard", "expert"].filter(k => DIFF[k]);
  const CONN = D.connectionTypes;

  /* ---------- small helpers --------------------------------------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const deg = d => d * Math.PI / 180;

  function hexToRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function shade(hex, amt) { // amt -1..1, returns hex
    const [r, g, b] = hexToRgb(hex);
    const f = amt < 0 ? 0 : 255, p = Math.abs(amt);
    const m = c => Math.round((f - c) * p + c);
    const hx = v => v.toString(16).padStart(2, "0");
    return "#" + hx(m(r)) + hx(m(g)) + hx(m(b));
  }
  const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; };
  const diffColor = d => (DIFF[d] || DIFF.moderate).color;

  /* ---------- icons (minimal line set) ---------------------------------- */
  const I = {
    brain: '<path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5a3 3 0 0 0-1 5.8V12a3 3 0 0 0 1 5.7V18a2.5 2.5 0 0 0 5 0V4.5A2.5 2.5 0 0 0 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.5a3 3 0 0 1 1 5.8V12a3 3 0 0 1-1 5.7V18a2.5 2.5 0 0 1-5 0"/>',
    cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6.5 19Z"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    code: '<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>',
    network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M12 12H5v4M12 12h7v4"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
    smartphone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    rocket: '<path d="M5 13c-1.5 1.3-2 5-2 5s3.7-.5 5-2M9 11a5 5 0 0 1 5-5c4-3 7-1 7-1s2 3-1 7a5 5 0 0 1-5 5l-2-2-2-2Z"/><circle cx="15" cy="9" r="1"/>',
    palette: '<circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/><path d="M12 21a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    legend: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    fit: '<path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a3 3 0 0 0 3-3V8"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>'
  };
  const DOMAIN_ICON = {
    ai: "brain", cloud: "cloud", data: "layers", databases: "database",
    networking: "network", security: "shield", emerging: "rocket", design: "palette",
    mobile: "smartphone", web: "globe", programming: "code", theory: "sigma",
    os: "server", hardware: "cpu", devops: "layers"
  };
  function svg(name, cls) {
    const p = I[name] || I.sparkle;
    return `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  }

  /* ---------- build flat node model + positions ------------------------- */
  const nodes = {};        // id -> node
  const order = [];        // render order
  const spokes = [];       // {from, to, tier}

  function bubbleR(hours) { return clamp(20, 17 + Math.sqrt(hours) * 3, 52); }

  D.domains.forEach(dom => {
    const dnode = {
      id: dom.id, name: dom.name, hours: dom.hours, read: dom.read || 0, tier: 0, type: "domain",
      x: dom.x, y: dom.y, r: dom.r, color: dom.color, brand: dom.color,
      blurb: dom.blurb, difficulty: null, status: "published",
      gas: dom.gas, ringed: dom.ringed, url: dom.url || "",
      parent: null, childIds: []
    };
    nodes[dom.id] = dnode; order.push(dnode);

    const subs = dom.subdomains || [];
    const N = subs.length;
    subs.forEach((sub, i) => {
      const ang = sub.a != null ? deg(sub.a) : deg(-90 + i * (360 / Math.max(1, N)));
      const dist = sub.d != null ? sub.d : dom.r + 130;
      const sx = dom.x + Math.cos(ang) * dist;
      const sy = dom.y + Math.sin(ang) * dist;
      const sr = bubbleR(sub.hours);
      const snode = {
        id: sub.id, name: sub.name, hours: sub.hours, read: sub.read || 0, tier: 1, type: sub.type || "subdomain",
        x: sx, y: sy, r: sr, color: diffColor(sub.difficulty), brand: dom.color,
        difficulty: sub.difficulty, status: sub.status || "stub",
        blurb: sub.blurb, prereqs: sub.prereqs, related: sub.related, url: sub.url || "",
        gas: sub.gas,
        parent: dom.id, childIds: [], baseAngle: ang
      };
      nodes[sub.id] = snode; order.push(snode);
      dnode.childIds.push(sub.id);
      spokes.push({ from: dom.id, to: sub.id, tier: 1 });

      const cons = sub.concepts || [];
      const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle -> even sunflower packing
      cons.forEach((c, j) => {
        const rr = 18 + Math.sqrt(j + 0.5) * 12;   // spiral outward into a clean star cloud
        const a2 = ang + j * GA;
        const cnode = {
          id: c.id, name: c.name, hours: c.hours, read: c.read || 0, tier: 2, type: c.type || "concept",
          x: sx + Math.cos(a2) * rr, y: sy + Math.sin(a2) * rr, r: 7,
          color: diffColor(c.difficulty), brand: dom.color,
          difficulty: c.difficulty, status: c.status || "stub",
          blurb: c.blurb, prereqs: c.prereqs, related: c.related, url: c.url || "",
          outline: c.outline || [], learn: c.learn || null,
          parent: sub.id, childIds: []
        };
        nodes[c.id] = cnode; order.push(cnode);
        snode.childIds.push(c.id);
        spokes.push({ from: sub.id, to: c.id, tier: 2 });
      });
    });
  });

  /* ---------- DOM scaffolding ------------------------------------------- */
  const app = $("#galaxy");
  app.innerHTML = `
    <aside class="sidebar">
      <div>
        <div class="s-title">Knowledge Galaxy</div>
        <p class="s-desc">Explore concepts and how they connect across every domain of IT, software, and AI. Planet size shows how much the wiki covers; colour shows how advanced a topic is.</p>
        <label class="search">${svg("search")}
          <input id="search" type="text" placeholder="Search concepts...">
          <span class="kbd">⌘ K</span>
        </label>
      </div>
      <div>
        <div class="s-label">View Layers</div>
        <div class="layers" id="layers"></div>
      </div>
      <div>
        <div class="s-label">Filters</div>
        <div class="field toggle-row">
          <span>Show Prerequisites</span>
          <button class="switch" id="prereqToggle" role="switch" aria-checked="true"></button>
        </div>
        <div class="field"><span>Difficulty</span>
          <div class="gx-chips" id="fDiff"></div></div>
        <div class="field"><span>Type</span>
          <div class="gx-chips" id="fType"></div></div>
        <div class="field"><span>Status</span>
          <div class="gx-chips" id="fStatus"></div></div>
      </div>
      <button class="rl-btn" id="rlBtn" type="button" title="Your reading list">
        <span class="rl-btn-ic">${svg("bookmark")}</span>
        <span class="rl-btn-label">Reading list</span>
        <span class="rl-count" id="rlCount">0</span>
      </button>
      <div class="gx-progress" title="Articles you have opened (saved in your browser)">
        <div class="gx-progress-top"><span>Your progress</span><span id="gxProgressCount">0 read</span></div>
        <div class="gx-progress-bar"><div class="gx-progress-fill" id="gxProgressFill"></div></div>
      </div>
    </aside>

    <div class="stage-wrap">
      <canvas class="starfield" id="stars"></canvas>
      <div class="viewport" id="viewport">
        <div class="scene" id="scene">
          <svg class="links-svg" id="links" width="${VW}" height="${VH}"></svg>
        </div>
      </div>

      <div class="zoom-ctl">
        <div class="zlabel">Zoom</div>
        <div class="btns">
          <button id="zin" title="Zoom in">${svg("plus")}</button>
          <button id="zout" title="Zoom out">${svg("minus")}</button>
          <button id="zfit" title="Fit">${svg("fit")}</button>
        </div>
      </div>

      <div class="overview">
        <h4>Galaxy Overview</h4>
        <div class="minimap" id="minimap"><div class="mm-view" id="mmView"></div></div>
        <button class="recenter" id="recenter">Recenter</button>
      </div>

      <aside class="gx-panel" id="detail">
        <div class="gx-panel-resize" id="gxResize" role="separator" aria-orientation="vertical" aria-label="Drag to resize panel" title="Drag to resize"></div>
        <button class="gx-panel-collapse" id="gxCollapse" type="button" aria-label="Collapse panel" title="Collapse">${svg("arrow")}</button>
        <button class="gx-panel-reopen" id="gxReopen" type="button" aria-label="Open panel" title="Open details">${svg("legend")}</button>
        <div class="gx-panel-inner" id="detailBody"></div>
      </aside>
    </div>
    <div class="tooltip" id="tooltip"></div>
    <div class="gx-rail-resize" id="gxRailResize" role="separator" aria-orientation="vertical" aria-label="Drag to resize the sidebar" title="Drag to resize"></div>
  `;

  const scene = $("#scene"), viewport = $("#viewport"), linksSvg = $("#links");
  const tooltip = $("#tooltip");

  /* ---------- layers + filters ------------------------------------------ */
  const LAYERS = [["Domains", "layers"], ["Subdomains", "globe"], ["Concepts", "sparkle"]];
  $("#layers").innerHTML = LAYERS.map((l, i) =>
    `<button class="layer${i === 0 ? " active" : ""}" data-layer="${i + 1}">
       <span class="lnum">${i + 1}</span>${l[0]}</button>`).join("");

  // Filter chips (click to toggle, multi-select, like the timeline left rail). Nothing selected = all.
  function fillChips(id, opts, store, withDot) {
    const c = $(id); if (!c) return;
    c.innerHTML = opts.map(o => `<button class="gx-chip" type="button" data-k="${o[0]}"${o[3] ? ` title="${o[3]}"` : ""}>${withDot ? `<span class="gx-chip-dot" style="background:${o[2] || "var(--fg-3)"}"></span>` : ""}${o[1]}</button>`).join("");
    c.addEventListener("click", e => {
      const b = e.target.closest(".gx-chip"); if (!b) return;
      const k = b.dataset.k;
      if (store[k]) delete store[k]; else store[k] = 1;
      b.classList.toggle("on", !!store[k]);
      update();
    });
  }

  /* ---------- planet textures (procedural, generated once) -------------- */
  function makeNoise() {
    const s = 512, c = document.createElement("canvas"); c.width = c.height = s;
    const x = c.getContext("2d");
    x.fillStyle = "#808080"; x.fillRect(0, 0, s, s);
    // soft multi-scale blotches -> marbled / cloudy surface (not grainy)
    const blob = (n, minR, maxR, amp, alpha) => {
      for (let i = 0; i < n; i++) {
        const px = Math.random() * s, py = Math.random() * s, rr = Math.random() * (maxR - minR) + minR;
        const v = 128 + (Math.random() * 2 - 1) * amp | 0;
        const g = x.createRadialGradient(px, py, 0, px, py, rr);
        g.addColorStop(0, `rgba(${v},${v},${v},${alpha})`);
        g.addColorStop(1, "rgba(128,128,128,0)");
        x.fillStyle = g; x.beginPath(); x.arc(px, py, rr, 0, 7); x.fill();
      }
    };
    blob(46, 110, 240, 74, .5);   // large regions
    blob(150, 44, 120, 58, .4);   // medium
    blob(360, 12, 46, 46, .3);    // fine detail
    // very gentle grain only
    const img = x.getImageData(0, 0, s, s), dt = img.data;
    for (let i = 0; i < dt.length; i += 4) { const n = (Math.random() - 0.5) * 12; dt[i] += n; dt[i + 1] += n; dt[i + 2] += n; }
    x.putImageData(img, 0, 0);
    return c;
  }
  const NOISE = makeNoise();   // a ready canvas (drawable synchronously)
  // gas-giant style (banded) vs rocky (mottled)
  const GAS = { ai: 1, cloud: 1, data: 1, nlp: 1, "deep-learning": 1, "machine-learning": 1, security: 1, networking: 1 };
  // only a couple of planets are ringed (avoids "everything looks like Saturn")
  const RINGED = { cloud: 1, data: 1 };

  // Render a planet as a crisp canvas bitmap (renders faithfully everywhere).
  function planetCanvas(n, opts) {
    const r = n.r, d = r * 2, col = n.color;
    const dpr = Math.max(1, Math.min(2.2, 760 / d));
    const cv = el("canvas", "planet-canvas");
    cv.width = Math.round(d * dpr); cv.height = Math.round(d * dpr);
    cv.style.width = d + "px"; cv.style.height = d + "px";
    cv.style.boxShadow = `0 0 ${r * 0.2}px ${rgba(col, .2)}`;
    const x = cv.getContext("2d"); x.scale(dpr, dpr);
    const cx = r, cy = r;
    const seed = [...n.id].reduce((a, ch) => a + ch.charCodeAt(0), 0);
    const sx = (seed * 17) % 120, sy = (seed * 31) % 120;

    // base sphere shading (light from upper-left)
    const g = x.createRadialGradient(r * .70, r * .64, r * .05, cx, cy, r * 1.08);
    g.addColorStop(0, shade(col, .38));
    g.addColorStop(.34, shade(col, .0));
    g.addColorStop(.72, shade(col, -.2));
    g.addColorStop(1, shade(col, -.36));
    x.save();
    x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip();
    x.fillStyle = g; x.fillRect(0, 0, d, d);

    // surface texture - cropped differently per planet so no two are alike
    x.globalCompositeOperation = "overlay";
    x.globalAlpha = opts.tier === 0 ? .58 : .5;
    if (opts.gas) {
      const bh = r * .4;
      for (let yy = -bh, k = 0; yy < d; yy += bh, k++)
        x.drawImage(NOISE, sx, (sy + k * 37) % 184, 128, 64, 0, yy, d, bh);
    } else {
      x.drawImage(NOISE, sx, sy, 128, 128, 0, 0, d, d);
    }
    // surface texture - soft-light keeps it smooth/marbled (not grainy)
    const N = NOISE.width, crop = Math.round(N * .42);
    const cxs = (sx / 120) * (N - crop), cys = (sy / 120) * (N - crop);
    x.globalCompositeOperation = "soft-light";
    x.globalAlpha = opts.tier === 0 ? .62 : .54;
    if (opts.gas) {
      const bh = r * .34;
      for (let yy = -bh, k = 0; yy < d; yy += bh, k++)
        x.drawImage(NOISE, cxs, (cys + k * 41) % (N - crop), crop, Math.round(crop * .42), 0, yy, d, bh);
    } else {
      x.drawImage(NOISE, cxs, cys, crop, crop, 0, 0, d, d);
    }
    // a touch of larger-scale variation
    x.globalAlpha = opts.tier === 0 ? .3 : .26;
    x.drawImage(NOISE, (cxs + N * .3) % (N - crop), (cys + N * .2) % (N - crop), crop, crop, 0, 0, d, d);
    x.globalCompositeOperation = "source-over"; x.globalAlpha = 1;

    // terminator (shadow on the far side) - gentle, doesn't crush to black
    const tg = x.createRadialGradient(cx + r * .4, cy + r * .48, r * .12, cx + r * .4, cy + r * .48, r * 1.6);
    tg.addColorStop(0, "rgba(0,0,0,0)"); tg.addColorStop(.7, "rgba(0,0,0,.16)"); tg.addColorStop(1, "rgba(0,0,0,.42)");
    x.fillStyle = tg; x.fillRect(0, 0, d, d);

    // soft sheen on the lit side (broad, not a glossy hotspot)
    const sh = x.createRadialGradient(r * .62, r * .5, 0, r * .62, r * .5, r * .8);
    sh.addColorStop(0, "rgba(255,255,255,.07)"); sh.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = sh; x.fillRect(0, 0, d, d);

    // faint atmospheric rim glow on the lit limb (soft, not a hard outline)
    const rim = x.createRadialGradient(cx, cy, r * .82, cx, cy, r);
    rim.addColorStop(0, "rgba(255,255,255,0)");
    rim.addColorStop(.86, rgba(shade(col, .5), .12));
    rim.addColorStop(1, rgba(shade(col, .55), .28));
    x.fillStyle = rim; x.fillRect(0, 0, d, d);
    x.restore();
    return cv;
  }

  // A planetary ring drawn as a canvas. `isFront` = the near arc that crosses
  // over the planet; the back arc is drawn behind. Tilted, banded, semi-transparent.
  function ringPart(n, isFront) {
    const r = n.r, tilt = deg(-17);
    const rxO = r * 1.95, rxI = r * 1.46, ratio = .30;
    const ryO = rxO * ratio, ryI = rxI * ratio;
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const bw = Math.abs(rxO * ct) + Math.abs(ryO * st);
    const bh = Math.abs(rxO * st) + Math.abs(ryO * ct);
    const pad = 8, W = Math.ceil((bw + pad) * 2), H = Math.ceil((bh + pad) * 2);
    const dpr = Math.max(1, Math.min(2, 1100 / Math.max(W, H)));
    const cv = el("canvas", "pring-c " + (isFront ? "front" : "back"));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    const x = cv.getContext("2d"); x.scale(dpr, dpr);
    x.translate(W / 2, H / 2); x.rotate(tilt);

    const t0 = isFront ? 0 : Math.PI, t1 = isFront ? Math.PI : 2 * Math.PI;
    x.beginPath();
    x.ellipse(0, 0, rxO, ryO, 0, t0, t1);
    x.ellipse(0, 0, rxI, ryI, 0, t1, t0, true);
    x.closePath();
    const tint = shade(n.color, .5);
    const g = x.createLinearGradient(0, -ryO, 0, ryO);
    if (isFront) { g.addColorStop(0, rgba(tint, .18)); g.addColorStop(1, rgba("#eaf0ff", .5)); }
    else { g.addColorStop(0, rgba("#eaf0ff", .34)); g.addColorStop(1, rgba(tint, .14)); }
    x.fillStyle = g; x.fill();
    // bright centre line for crispness
    x.lineWidth = Math.max(.8, r * .012);
    x.strokeStyle = rgba("#ffffff", isFront ? .45 : .28);
    x.beginPath(); x.ellipse(0, 0, (rxO + rxI) / 2, (ryO + ryI) / 2, 0, t0, t1); x.stroke();
    return cv;
  }

  /* ---------- render nodes ---------------------------------------------- */
  const nodeEls = {};
  order.forEach(n => {
    const wrap = el("div", "node");
    wrap.style.left = n.x + "px";
    wrap.style.top = n.y + "px";
    wrap.dataset.id = n.id;

    if (n.tier === 0) {
      var domRinged = (n.ringed != null) ? n.ringed : RINGED[n.id];
      var domGas = (n.gas != null) ? n.gas : (GAS[n.id] != null ? GAS[n.id] : true); // domains default to gas-giant texture
      if (domRinged) wrap.appendChild(ringPart(n, false));
      wrap.appendChild(planetCanvas(n, { tier: 0, gas: !!domGas }));
      if (domRinged) wrap.appendChild(ringPart(n, true));
      wrap.appendChild(el("div", "label",
        `<div class="pname" style="font-size:${Math.round(n.r * .3)}px">${n.name}</div>
         <div class="phours" style="font-size:${Math.round(n.r * .17)}px">${n.hours}</div>`));
    } else {
      // Subdomains and concepts render as small drifting stars so the galaxy stays clean at scale.
      const sz = n.tier === 1 ? 13 : 6;
      const star = el("div", "starnode" + (n.tier === 1 ? " sub" : ""));
      star.style.setProperty("--sc", n.color);
      star.style.width = star.style.height = sz + "px";
      star.style.setProperty("--dly", (-((Math.abs(Math.round(n.x + n.y)) % 80) / 10)) + "s");
      const lbl = el("div", "clabel", `<span class="cname">${n.name}</span>`);
      star.appendChild(lbl);
      wrap.appendChild(star);
    }

    wrap.addEventListener("click", e => { e.stopPropagation(); select(n.id); });
    wrap.addEventListener("mouseenter", e => { showTip(e, n); hovered = n.id; setActive(n.id); });
    wrap.addEventListener("mousemove", moveTip);
    wrap.addEventListener("mouseleave", () => { hideTip(); hovered = null; setActive(selected); });
    scene.appendChild(wrap);
    nodeEls[n.id] = wrap;
  });

  /* ---------- render links ---------------------------------------------- */
  function curve(a, b) {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const off = Math.hypot(dx, dy) * 0.12;
    const cx = mx - dy / Math.hypot(dx, dy) * off;
    const cy = my + dx / Math.hypot(dx, dy) * off;
    return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
  }
  // Adjacency only - we do NOT create thousands of SVG paths up front (that made pan/zoom lag).
  // A node's connection lines are drawn on demand in setActive() when it is hovered/selected.
  const adjE = {};   // id -> [{to, kind}]   (edges with their type, for drawing)
  const adjSet = {}; // id -> {neighbourId: 1} (fast membership, for dimming)
  function addAdj(a, b, kind) {
    if (!nodes[a] || !nodes[b]) return;
    (adjE[a] = adjE[a] || []).push({ to: b, kind: kind }); (adjE[b] = adjE[b] || []).push({ to: a, kind: kind });
    (adjSet[a] = adjSet[a] || {})[b] = 1; (adjSet[b] = adjSet[b] || {})[a] = 1;
  }
  spokes.forEach(s => addAdj(s.from, s.to, "structure"));
  (D.links || []).forEach(l => addAdj(l.from, l.to, l.type));

  /* ---------- state + transform ----------------------------------------- */
  let layer = 1;
  let tx = 0, ty = 0, scale = 1;
  let selected = null;
  let hovered = null;
  const filters = { diff: {}, type: {}, status: {}, prereq: true };
  fillChips("#fDiff", DIFF_ORDER.map(k => [k, DIFF[k].label, DIFF[k].color, DIFF[k].range]), filters.diff, true);
  fillChips("#fType", [["domain", "Domain"], ["subdomain", "Subdomain"], ["concept", "Concept"], ["tool", "Tool"], ["pattern", "Pattern"], ["core", "Core"]], filters.type, false);
  fillChips("#fStatus", [["stub", "Stub"], ["draft", "Draft"], ["review", "Review"], ["published", "Published"]], filters.status, false);
  let query = "";

  const MIN = 0.28, MAX = 2.6;

  function applyTransform() {
    scene.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
    updateMinimapView();
  }
  function vpSize() { const r = viewport.getBoundingClientRect(); return [r.width, r.height]; }

  // Horizontal space the right-hand detail panel currently occupies (0 if hidden/collapsed/bottom-docked).
  function panelInset() {
    const p = $("#detail");
    if (!p || p.classList.contains("gx-empty") || p.classList.contains("gx-collapsed")) return 0;
    const [w] = vpSize(), r = p.getBoundingClientRect();
    if (r.width > w * 0.6) return 0;   // bottom-docked on mobile -> no horizontal shift
    return r.width + 32;
  }
  function fitAll() {
    const [w, h] = vpSize();
    scale = clamp(Math.min(w / VW, h / VH) * 0.92, MIN, MAX);
    tx = (w - VW * scale) / 2;
    ty = (h - VH * scale) / 2;
    applyTransform();
  }
  function focusNode(n, s) {
    const [w, h] = vpSize();
    scale = clamp(s || scale, MIN, MAX);
    tx = (w - panelInset()) / 2 - n.x * scale;
    ty = h / 2 - n.y * scale;
    applyTransform();
  }
  function zoomAt(cx, cy, factor) {
    const ns = clamp(scale * factor, MIN, MAX);
    tx = cx - (cx - tx) * (ns / scale);
    ty = cy - (cy - ty) * (ns / scale);
    scale = ns; applyTransform();
  }

  /* ---------- visibility / filtering ------------------------------------ */
  function matchesFilters(n) {
    if (Object.keys(filters.diff).length && !filters.diff[n.difficulty]) return false;
    if (Object.keys(filters.type).length && !filters.type[n.type]) return false;
    if (Object.keys(filters.status).length && !filters.status[n.status || "stub"]) return false;
    return true;
  }
  // Draw a node's connections on demand (a few paths), fade non-connected nodes.
  // Used by BOTH hover and click. With no active node, the canvas is clean (no edges).
  const NS = "http://www.w3.org/2000/svg";
  function setActive(id) {
    while (linksSvg.firstChild) linksSvg.removeChild(linksSvg.firstChild);  // clear previous edges
    const conn = id ? (adjSet[id] || {}) : null;
    order.forEach(n => {
      nodeEls[n.id].classList.toggle("deemph", !!conn && n.id !== id && !conn[n.id]);
    });
    if (!id) return;
    const a = nodes[id]; if (!a) return;
    (adjE[id] || []).forEach(e => {
      const b = nodes[e.to]; if (!b) return;
      if (!filters.prereq && (e.kind === "prereq" || e.kind === "related")) return; // honour the toggle
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", curve(a, b));
      path.setAttribute("fill", "none");
      const strong = e.kind === "strong";
      path.setAttribute("stroke", e.kind === "structure" ? "var(--link)" : (strong ? "var(--link-strong)" : "var(--accent-line)"));
      path.setAttribute("stroke-width", strong ? 2.2 : (e.kind === "structure" ? 1 : 1.6));
      path.setAttribute("opacity", e.kind === "structure" ? "0.5" : "0.95");
      if (CONN[e.kind] && CONN[e.kind].dash !== "none") path.setAttribute("stroke-dasharray", CONN[e.kind].dash);
      linksSvg.appendChild(path);
    });
  }
  function update() {
    const q = query.trim().toLowerCase();
    order.forEach(n => {
      const elx = nodeEls[n.id];
      const visTier = n.tier === 0 ? true : n.tier === 1 ? layer >= 2 : layer >= 3;
      elx.classList.toggle("hidden", !visTier);
      if (!visTier) return;
      const filtered = (n.tier === 0) ? true : matchesFilters(n);
      const qHit = q ? n.name.toLowerCase().includes(q) : true;
      elx.classList.toggle("dim", !(filtered && qHit));
      elx.classList.toggle("selected", n.id === selected);
      const lbl = elx.querySelector(".clabel");
      if (lbl) lbl.style.opacity = (q && qHit) || n.id === selected ? "1" : "";
    });
    setActive(hovered || selected);
  }

  /* ---------- selection + detail panel ---------------------------------- */
  const TIER_LABEL = ["Domain", "Subdomain", "Concept"];
  function resolve(ids) { return (ids || []).map(id => nodes[id]).filter(Boolean); }

  // Which domain a node ultimately belongs to (tier0 = itself, tier1 = parent, tier2 = grandparent).
  function domainIdOf(n) {
    if (n.tier === 0) return n.id;
    if (n.tier === 1) return n.parent;
    const sub = nodes[n.parent];
    return sub ? sub.parent : null;
  }
  const degreeOf = id => (adjE[id] || []).length;

  // All concept (tier 2) nodes that live inside a domain or subdomain container.
  function descendantConcepts(container) {
    const out = [];
    order.forEach(n => {
      if (n.tier !== 2) return;
      if (container.tier === 0 && domainIdOf(n) === container.id) out.push(n);
      else if (container.tier === 1 && n.parent === container.id) out.push(n);
    });
    return out;
  }

  // REAL related concepts for a container: actual concepts most-connected to its members,
  // preferring ones OUTSIDE the container (true cross-links), then its own busiest hubs.
  // This replaces the old "always show the subdomains (Glossary, etc.)" fallback.
  function containerRelated(container) {
    const inside = descendantConcepts(container);
    const insideIds = new Set(inside.map(c => c.id));
    const freq = {};
    inside.forEach(c => (adjE[c.id] || []).forEach(e => {
      if (e.kind === "structure") return;                 // skip parent/child spokes
      const t = nodes[e.to];
      if (!t || t.tier !== 2 || insideIds.has(e.to)) return;
      freq[e.to] = (freq[e.to] || 0) + 1;
    }));
    let ranked = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).map(id => nodes[id]);
    if (ranked.length < 8) {                               // top up with the container's own hub concepts
      const seen = new Set(ranked.map(r => r.id));
      inside.sort((a, b) => degreeOf(b.id) - degreeOf(a.id)).forEach(c => {
        if (!seen.has(c.id)) { seen.add(c.id); ranked.push(c); }
      });
    }
    return ranked;
  }

  // REAL related concepts for a single concept: its own related field plus graph neighbours
  // (any non-structure, non-prereq edge), deduped.
  function conceptRelated(n) {
    const out = [], seen = new Set([n.id]);
    resolve(n.related).forEach(r => { if (!seen.has(r.id)) { seen.add(r.id); out.push(r); } });
    (adjE[n.id] || []).forEach(e => {
      if (e.kind === "structure" || e.kind === "prereq") return;
      const t = nodes[e.to];
      if (!t || seen.has(t.id)) return;
      seen.add(t.id); out.push(t);
    });
    return out.sort((a, b) => degreeOf(b.id) - degreeOf(a.id));
  }

  // Specific prerequisites (real, directed). Subdomains lean on their parent domain.
  function specificPrereqs(n) {
    let pre = resolve(n.prereqs);
    if (!pre.length && n.tier === 1 && n.parent && nodes[n.parent]) pre = [nodes[n.parent]];
    return pre;
  }

  // Baseline prerequisites that apply to EVERYTHING: there is no such thing as "no prerequisites".
  // You always need the will to learn, the time shown here, and a grasp of what software is.
  const FOUNDATION_LINKS = [
    { id: "basics/what-is-coding", url: "/basics/what-is-coding/", name: "What software actually is" },
    { id: "basics/what-is-a-computer", url: "/basics/what-is-a-computer/", name: "How a computer works" }
  ];
  function baselinePrereqs(n) {
    const lbl = n.tier === 2 && n.difficulty && DIFF[n.difficulty] ? DIFF[n.difficulty].label.toLowerCase() : "";
    const article = /^[aeiou]/.test(lbl) ? "an" : "a";
    const time = lbl ? "Be ready for " + article + " " + lbl + " topic" : "The will to learn and time to practise";
    const items = [{ mindset: true, name: time }];
    FOUNDATION_LINKS.forEach(f => { if (f.id !== n.id) items.push(f); });   // don't make an article its own prereq
    return items;
  }

  function detailFor(n) {
    const prereqs = specificPrereqs(n);
    const preIds = new Set(prereqs.map(p => p.id));
    const related = (n.tier === 2 ? conceptRelated(n) : containerRelated(n)).filter(r => !preIds.has(r.id));
    return { prereqs, related, baseline: baselinePrereqs(n) };
  }

  // A clickable node row inside the panel: click opens it in the panel, hover previews it,
  // and per-row actions add it to the reading list or open the article in a new tab.
  function dItem(node) {
    const inRl = inReadlist(node.id);
    return `<div class="d-item" data-go="${node.id}" tabindex="0" role="button">
      <span class="dot" style="background:${node.color || node.brand};color:${node.color || node.brand}"></span>
      <span class="iname">${node.name}</span>
      <span class="ihours">${metaLabel(node)}</span>
      <span class="d-acts">
        <button class="d-act${inRl ? " on" : ""}" type="button" data-add="${node.id}" title="${inRl ? "In reading list" : "Add to reading list"}" aria-label="Add to reading list">${svg(inRl ? "check" : "plus")}</button>
        ${node.url ? `<a class="d-act" href="${node.url}" target="_blank" rel="noopener" data-ext="1" title="Open in new tab" aria-label="Open in new tab">${svg("ext")}</a>` : ""}
      </span>
    </div>`;
  }
  // A baseline prerequisite row: either a mindset note or a link to a foundational article.
  function baseItem(b) {
    if (b.mindset) return `<div class="d-item base"><span class="dot base"></span><span class="iname">${b.name}</span><span class="ihours">always</span></div>`;
    return `<a class="d-item base" href="${b.url}" target="_blank" rel="noopener"><span class="dot base"></span><span class="iname">${b.name}</span><span class="ihours">foundation ${svg("ext")}</span></a>`;
  }

  /* ---------- hover preview card (mirrors the wiki .gl-hover card) ------------- */
  const hoverCard = el("div", "gx-hover");
  hoverCard.setAttribute("hidden", "");
  app.appendChild(hoverCard);
  let hoverTimer, overHover = false;
  function relPreview(n) {
    if (n.tier === 2) return resolve(n.related).slice(0, 4);
    return (n.childIds || []).map(id => nodes[id]).filter(Boolean).slice(0, 4);
  }
  function nodePreviewHTML(n) {
    const diff = n.difficulty && DIFF[n.difficulty];
    const rel = relPreview(n);
    const relHtml = rel.length
      ? `<div class="gx-hv-rel"><span class="gx-hv-rel-l">${n.tier === 2 ? "Related" : "Inside"}</span>${rel.map(r => `<span>${esc(r.name)}</span>`).join("")}</div>`
      : "";
    return `<div class="gx-hv-term">${esc(n.name)}</div>
      <div class="gx-hv-tags"><span class="tag">${TIER_LABEL[n.tier]}</span>${diff ? `<span class="tag"><span class="dot" style="background:${diffColor(n.difficulty)}"></span>${diff.label}</span>` : ""}${n.read ? `<span class="tag">${fmtRead(n.read)}</span>` : ""}</div>
      <div class="gx-hv-sum">${esc(n.blurb || "Summary coming soon.")}</div>
      ${relHtml}
      <div class="gx-hv-hint">Click to open in the panel</div>`;
  }
  function esc(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function showHover(target, n) {
    clearTimeout(hoverTimer);
    hoverCard.innerHTML = nodePreviewHTML(n);
    hoverCard.removeAttribute("hidden");
    const r = target.getBoundingClientRect();
    const cw = Math.min(hoverCard.offsetWidth || 300, 320);
    let left = r.left - cw - 12;                       // prefer left of the row (panel is on the right)
    if (left < 12) left = Math.min(r.right + 12, window.innerWidth - cw - 12);
    let top = r.top;
    if (top + hoverCard.offsetHeight > window.innerHeight - 12) top = Math.max(12, window.innerHeight - hoverCard.offsetHeight - 12);
    hoverCard.style.left = left + "px"; hoverCard.style.top = top + "px";
  }
  function hideHover() { hoverTimer = setTimeout(() => { if (!overHover) hoverCard.setAttribute("hidden", ""); }, 130); }
  hoverCard.addEventListener("mouseenter", () => { overHover = true; clearTimeout(hoverTimer); });
  hoverCard.addEventListener("mouseleave", () => { overHover = false; hideHover(); });

  /* ---------- reading list (drawer + sidebar button) -------------------------- */
  const rlDrawer = el("div", "gx-readlist");
  rlDrawer.setAttribute("hidden", "");
  app.appendChild(rlDrawer);
  function refreshReadlistUI() {
    const btn = $("#rlBtn"), count = $("#rlCount");
    if (count) count.textContent = readlist.length;
    if (btn) btn.classList.toggle("has", readlist.length > 0);
    // keep the open drawer + any visible add buttons in sync
    if (!rlDrawer.hasAttribute("hidden")) renderReadlist();
    document.querySelectorAll(".d-act[data-add]").forEach(b => {
      const on = inReadlist(b.dataset.add);
      b.classList.toggle("on", on);
      b.innerHTML = svg(on ? "check" : "plus");
      b.title = on ? "In reading list" : "Add to reading list";
    });
  }
  function renderReadlist() {
    const total = readlistTotal();
    const items = readlist.length
      ? readlist.map(x => `<div class="rl-row">
          <span class="dot" style="background:${diffColor(x.difficulty)}"></span>
          <button class="rl-name" type="button" data-go="${x.id}">${esc(x.name)}</button>
          <span class="rl-time">${x.read ? fmtRead(x.read) : ""}</span>
          ${x.url ? `<a class="d-act" href="${x.url}" target="_blank" rel="noopener" title="Open in new tab">${svg("ext")}</a>` : ""}
          <button class="d-act" type="button" data-remove="${x.id}" title="Remove">${svg("close")}</button>
        </div>`).join("")
      : `<p class="rl-empty">Nothing saved yet. Add topics with the + on any concept to build a reading path.</p>`;
    rlDrawer.innerHTML = `
      <div class="rl-head">
        <div><b>Reading list</b><span class="rl-sub">${readlist.length} ${readlist.length === 1 ? "topic" : "topics"}${total ? " · " + fmtRead(total) : ""}</span></div>
        <button class="d-act" type="button" id="rlClose" title="Close">${svg("close")}</button>
      </div>
      <div class="rl-body">${items}</div>`;
  }
  function openReadlist() { renderReadlist(); rlDrawer.removeAttribute("hidden"); }
  function closeReadlist() { rlDrawer.setAttribute("hidden", ""); }
  rlDrawer.addEventListener("click", e => {
    const go = e.target.closest("[data-go]"), rm = e.target.closest("[data-remove]"), cl = e.target.closest("#rlClose");
    if (cl) { closeReadlist(); return; }
    if (rm) { toggleReadlist(rm.dataset.remove); return; }
    if (go) { closeReadlist(); const id = go.dataset.go; if (nodes[id]) { layer = Math.max(layer, nodes[id].tier + 1); setLayer(layer); select(id); focusNode(nodes[id], Math.max(scale, 0.75)); } }
  });

  // Articles open in a new tab (the in-page overlay was removed: heavy pages loaded slowly
  // and the modal fought the site navbar). Esc just closes the reading list + hover card.
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeReadlist(); hoverCard.setAttribute("hidden", ""); } });

  // Honest meta label: domains/subdomains show how many articles + total reading time,
  // concepts show difficulty + real reading time.
  function metaLabel(node) {
    if (node.tier === 0) return node.hours + (node.read ? " · " + fmtRead(node.read) : "");
    if (node.tier === 1) return ((node.childIds || []).length) + " articles" + (node.read ? " · " + fmtRead(node.read) : "");
    const d = node.difficulty && DIFF[node.difficulty] ? DIFF[node.difficulty].label : "";
    return [d, node.read ? fmtRead(node.read) : ""].filter(Boolean).join(" · ");
  }
  function fmtRead(min) {
    if (!min) return "";
    if (min < 60) return min + " min read";
    const h = Math.floor(min / 60), m = min % 60;
    return m ? h + "h " + m + "m read" : h + "h read";
  }

  /* ---------- reading list (per-user, localStorage, real reading time) -------- */
  const RL_KEY = "aiwiki.readlist";
  let readlist = [];
  try { readlist = JSON.parse(localStorage.getItem(RL_KEY)) || []; } catch (e) { readlist = []; }
  function saveReadlist() { try { localStorage.setItem(RL_KEY, JSON.stringify(readlist)); } catch (e) {} }

  /* ---------- read / progress tracking (shared with the rest of the wiki) ----------
     aiwiki.visited.v1 is { "/path/": timestamp } written whenever a content page is opened. */
  let visited = {};
  function loadVisited() { try { visited = JSON.parse(localStorage.getItem("aiwiki.visited.v1")) || {}; } catch (e) { visited = {}; } }
  loadVisited();
  function isRead(n) { return !!(n && n.url && Object.prototype.hasOwnProperty.call(visited, n.url)); }
  function readableConcepts() { return order.filter(n => n.tier === 2 && n.url); }
  function applyReadState() {
    order.forEach(n => { const el = nodeEls[n.id]; if (el) el.classList.toggle("read", isRead(n)); });
    const all = readableConcepts(), done = all.filter(isRead).length;
    const pc = $("#gxProgressCount"), pf = $("#gxProgressFill");
    if (pc) pc.textContent = done + " / " + all.length + " read";
    if (pf) pf.style.width = (all.length ? Math.round(done / all.length * 100) : 0) + "%";
  }
  function inReadlist(id) { return readlist.some(x => x.id === id); }
  function readlistTotal() { return readlist.reduce((s, x) => s + (x.read || 0), 0); }
  function toggleReadlist(id) {
    const n = nodes[id]; if (!n) return;
    const i = readlist.findIndex(x => x.id === id);
    if (i >= 0) readlist.splice(i, 1);
    else readlist.push({ id: id, name: n.name, url: n.url || "", read: n.read || 0, difficulty: n.difficulty || "" });
    saveReadlist(); refreshReadlistUI();
  }
  // Add a whole domain/subdomain's concepts to the reading list at once.
  function addSection(container) {
    descendantConcepts(container).forEach(c => {
      if (c.url && !inReadlist(c.id)) readlist.push({ id: c.id, name: c.name, url: c.url, read: c.read || 0, difficulty: c.difficulty || "" });
    });
    saveReadlist(); refreshReadlistUI(); openReadlist();
  }

  let detailExpanded = { prereq: false, related: false };

  function listSection(label, items, renderRow, key) {
    const expanded = detailExpanded[key];
    const CAP = 5;
    const shown = expanded ? items : items.slice(0, CAP);
    const rows = shown.length ? shown.map(renderRow).join("") : '<span class="d-empty">None mapped yet.</span>';
    const more = items.length > CAP
      ? `<button class="view-all" type="button" data-expand="${key}">${expanded ? "Show fewer" : "View all (" + items.length + ")"}</button>`
      : "";
    return `<div class="gx-sec"><h5>${label}</h5><div class="d-list">${rows}</div>${more}</div>`;
  }

  function renderDetail(n) {
    const body = $("#detailBody");
    if (!body) return;
    if (!n) {
      $("#detail").classList.add("gx-empty");
      body.innerHTML = `<div class="detail-empty">
        <span class="pulse">${svg("sparkle")}</span>
        <div><b>Select a node to explore</b><p>Click any planet, subdomain, or concept to see how advanced it is, what to learn first, and what it connects to.</p></div>
      </div>`;
      return;
    }
    $("#detail").classList.remove("gx-empty");
    const { prereqs, related, baseline } = detailFor(n);
    const icon = DOMAIN_ICON[n.id] || DOMAIN_ICON[n.parent] || (n.parent && DOMAIN_ICON[nodes[n.parent] && nodes[n.parent].parent]) || "book";
    const accent = n.brand || n.color;
    const dlabel = TIER_LABEL[n.tier];
    const diff = n.difficulty;
    const isConcept = n.tier === 2;
    const relLabel = isConcept ? "Related concepts" : "Key concepts here";
    const domId = domainIdOf(n);
    const domName = domId && nodes[domId] && domId !== n.id ? nodes[domId].name : "";
    const countTag = n.tier === 0 ? n.hours : (n.tier === 1 ? (n.childIds || []).length + " articles" : "");

    const prereqRows = baseline.map(baseItem).join("") + prereqs.map(dItem).join("");

    // Rich teaching content pulled from the knowledge graph + the article itself.
    const learn = n.learn || {}, outline = n.outline || [];
    const modelHtml = learn.model ? `<div class="gx-sec"><h5>Mental model</h5><p class="gx-note">${esc(learn.model)}</p></div>` : "";
    const outlineHtml = outline.length ? `<div class="gx-sec"><h5>In this article</h5><ul class="gx-outline">${outline.map(o => `<li>${esc(o)}</li>`).join("")}</ul></div>` : "";
    const checkHtml = (learn.doneWhen || learn.recall) ? `<div class="gx-sec"><h5>Check yourself</h5>${learn.doneWhen ? `<p class="gx-note"><b>You have got it when:</b> ${esc(learn.doneWhen)}</p>` : ""}${learn.recall ? `<p class="gx-note"><b>From memory:</b> ${esc(learn.recall)}</p>` : ""}</div>` : "";
    const buildHtml = learn.buildTask ? `<div class="gx-sec gx-try"><h5>Try it yourself</h5><p class="gx-note">${esc(learn.buildTask)}</p>${(learn.buildSteps && learn.buildSteps.length) ? `<ol class="gx-steps">${learn.buildSteps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}</div>` : "";

    body.innerHTML = `
      <div class="gx-head">
        <span class="d-icon" style="background:${rgba(accent, .18)};border-color:${rgba(accent, .5)}">${svg(icon)}</span>
        <div class="gx-head-txt">
          <div class="d-title">${n.url ? `<a href="${n.url}" target="_blank" rel="noopener">${esc(n.name)}</a>` : esc(n.name)}</div>
          <div class="d-tags">
            <span class="tag">${dlabel}</span>
            ${isRead(n) ? `<span class="tag tag-read">${svg("check")} Read</span>` : ""}
            ${diff && DIFF[diff] ? `<span class="tag"><span class="dot" style="background:${diffColor(diff)}"></span>${DIFF[diff].label}</span>` : ""}
            ${n.read ? `<span class="tag">${svg("clock")}${fmtRead(n.read)}</span>` : ""}
            ${countTag ? `<span class="tag">${countTag}</span>` : ""}
            ${domName ? `<span class="tag tag-area">in ${esc(domName)}</span>` : ""}
          </div>
        </div>
      </div>
      <p class="d-blurb">${esc(n.blurb || "")}</p>
      <div class="gx-actions">
        ${n.url ? `<a class="gx-btn primary" href="${n.url}" target="_blank" rel="noopener">Open article ${svg("ext")}</a>` : ""}
        ${isConcept
          ? `<button class="gx-btn${inReadlist(n.id) ? " on" : ""}" type="button" data-addone="${n.id}">${svg(inReadlist(n.id) ? "check" : "bookmark")} ${inReadlist(n.id) ? "Saved" : "Reading list"}</button>`
          : `<button class="gx-btn" type="button" data-addsection="${n.id}">${svg("bookmark")} Add section to list</button>`}
      </div>
      ${modelHtml}
      ${outlineHtml}

      <div class="gx-sec"><h5>Prerequisites</h5><div class="d-list">${prereqRows}</div>${prereqs.length + baseline.length > 6 && !detailExpanded.prereq ? `<button class="view-all" type="button" data-expand="prereq">View all</button>` : ""}</div>
      ${listSection(relLabel, related, dItem, "related")}
      ${checkHtml}
      ${buildHtml}

      <div class="gx-sec gx-legend">
        <h5>Connection types</h5>
        <div class="conn-row"><span class="swatch"><svg viewBox="0 0 42 8"><line x1="1" y1="4" x2="41" y2="4" stroke="#cdd6f5" stroke-width="1.6" stroke-dasharray="8 6"/></svg></span><span>Prerequisite (learn first)</span></div>
        <div class="conn-row"><span class="swatch"><svg viewBox="0 0 42 8"><line x1="1" y1="4" x2="41" y2="4" stroke="#cdd6f5" stroke-width="1.6" stroke-dasharray="2 7"/></svg></span><span>Related (works with)</span></div>
      </div>`;

    // rows: hover previews + click to open + per-row actions
    body.querySelectorAll(".d-item[data-go]").forEach(row => {
      const id = row.dataset.go;
      row.addEventListener("mouseenter", () => { if (nodes[id]) showHover(row, nodes[id]); });
      row.addEventListener("mouseleave", hideHover);
      row.addEventListener("click", e => {
        if (e.target.closest("[data-ext]")) return;                       // let the new-tab link open
        if (e.target.closest("[data-add]")) { e.stopPropagation(); toggleReadlist(id); return; }
        hoverCard.setAttribute("hidden", "");
        if (nodes[id]) { layer = Math.max(layer, nodes[id].tier + 1); setLayer(layer); select(id); focusNode(nodes[id], Math.max(scale, 0.75)); }
      });
      row.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); row.click(); } });
    });
    body.querySelectorAll("[data-expand]").forEach(it =>
      it.addEventListener("click", e => { e.stopPropagation(); const k = it.dataset.expand; detailExpanded[k] = !detailExpanded[k]; renderDetail(n); }));
    body.querySelectorAll("[data-addone]").forEach(b => b.addEventListener("click", () => { toggleReadlist(b.dataset.addone); renderDetail(n); }));
    body.querySelectorAll("[data-addsection]").forEach(b => b.addEventListener("click", () => addSection(n)));
  }

  function select(id) {
    selected = id;
    detailExpanded = { prereq: false, related: false };   // fresh node -> collapse long lists
    const panel = $("#detail");
    if (panel) panel.classList.remove("gx-collapsed");      // reopen if the user had collapsed it
    renderDetail(nodes[id]);
    update();
  }

  /* ---------- tooltip --------------------------------------------------- */
  function showTip(e, n) {
    // The node label already shows the name; the tooltip shows only the meta (difficulty + read
    // time) so it does not overlap and repeat the label.
    const m = metaLabel(n);
    if (!m) { hideTip(); return; }
    tooltip.textContent = m;
    tooltip.classList.add("show"); moveTip(e);
  }
  function moveTip(e) {
    tooltip.style.left = (e.clientX + 14) + "px";
    tooltip.style.top = (e.clientY + 14) + "px";
  }
  function hideTip() { tooltip.classList.remove("show"); }

  /* ---------- pan / zoom ------------------------------------------------ */
  let dragging = false, moved = 0, sx = 0, sy = 0, stx = 0, sty = 0;
  viewport.addEventListener("mousedown", e => {
    dragging = true; moved = 0; sx = e.clientX; sy = e.clientY; stx = tx; sty = ty;
    viewport.classList.add("panning");
  });
  window.addEventListener("mousemove", e => {
    if (!dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
    tx = stx + dx; ty = sty + dy; applyTransform();
  });
  window.addEventListener("mouseup", e => {
    if (dragging && moved < 4 && e.target === viewport) { selected = null; renderDetail(null); update(); }
    dragging = false; viewport.classList.remove("panning");
  });
  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive: false });

  $("#zin").onclick = () => { const [w, h] = vpSize(); zoomAt(w / 2, h / 2, 1.2); };
  $("#zout").onclick = () => { const [w, h] = vpSize(); zoomAt(w / 2, h / 2, 1 / 1.2); };
  $("#zfit").onclick = fitAll;
  $("#recenter").onclick = fitAll;
  $("#rlBtn").onclick = openReadlist;
  refreshReadlistUI();

  /* ---------- detail panel + sidebar: resize + collapse ----------------------
     Widths persist in SHARED localStorage keys (aiwiki.panelW / aiwiki.railW) and use the SAME
     defaults as the timeline, so switching between tabs does not make the layout jump. */
  (function () {
    const panel = $("#detail"), handle = $("#gxResize");
    const PKEY = "aiwiki.panelW", PMIN = 300, PDEF = 380;
    const pMax = () => Math.min(620, Math.max(PMIN, vpSize()[0] - 80));
    try { const saved = parseInt(localStorage.getItem(PKEY), 10); if (saved >= PMIN) panel.style.setProperty("--gx-panel-w", Math.min(saved, pMax()) + "px"); } catch (e) {}
    let rz = false, sx = 0, sw = 0;
    if (handle) {
      handle.addEventListener("pointerdown", e => { rz = true; sx = e.clientX; sw = panel.getBoundingClientRect().width; panel.classList.add("gx-resizing"); handle.setPointerCapture(e.pointerId); e.preventDefault(); });
      handle.addEventListener("pointermove", e => { if (!rz) return; const w = Math.max(PMIN, Math.min(pMax(), sw + (sx - e.clientX))); panel.style.setProperty("--gx-panel-w", w + "px"); });
      const end = () => { if (!rz) return; rz = false; panel.classList.remove("gx-resizing"); try { localStorage.setItem(PKEY, Math.round(panel.getBoundingClientRect().width)); } catch (e) {} };
      handle.addEventListener("pointerup", end); handle.addEventListener("pointercancel", end);
      handle.addEventListener("dblclick", () => { panel.style.setProperty("--gx-panel-w", PDEF + "px"); try { localStorage.setItem(PKEY, PDEF); } catch (e) {} });
    }
    const cBtn = $("#gxCollapse"), rBtn = $("#gxReopen");
    if (cBtn) cBtn.addEventListener("click", e => { e.stopPropagation(); panel.classList.add("gx-collapsed"); });
    if (rBtn) rBtn.addEventListener("click", e => { e.stopPropagation(); panel.classList.remove("gx-collapsed"); });

    // Left sidebar resize (shared rail width with the timeline).
    const rail = $("#gxRailResize");
    const RKEY = "aiwiki.railW", RMIN = 240, RMAX = 460, RDEF = 300;
    const setRail = w => app.style.setProperty("--sidebar-w", w + "px");
    try { const sr = parseInt(localStorage.getItem(RKEY), 10); if (sr >= RMIN) setRail(Math.min(sr, RMAX)); } catch (e) {}
    if (rail) {
      let rrz = false, rsx = 0, rsw = 0;
      const railW = () => parseInt(getComputedStyle(app).getPropertyValue("--sidebar-w"), 10) || RDEF;
      rail.addEventListener("pointerdown", e => { rrz = true; rsx = e.clientX; rsw = railW(); app.classList.add("gx-rail-resizing"); rail.setPointerCapture(e.pointerId); e.preventDefault(); });
      rail.addEventListener("pointermove", e => { if (!rrz) return; const w = Math.max(RMIN, Math.min(RMAX, rsw + (e.clientX - rsx))); setRail(w); });
      const rend = () => { if (!rrz) return; rrz = false; app.classList.remove("gx-rail-resizing"); try { localStorage.setItem(RKEY, railW()); } catch (e) {} };
      rail.addEventListener("pointerup", rend); rail.addEventListener("pointercancel", rend);
      rail.addEventListener("dblclick", () => { setRail(RDEF); try { localStorage.setItem(RKEY, RDEF); } catch (e) {} });
    }
  })();

  /* ---------- controls -------------------------------------------------- */
  $("#layers").addEventListener("click", e => {
    const b = e.target.closest(".layer"); if (!b) return;
    setLayer(+b.dataset.layer);
  });
  $("#prereqToggle").addEventListener("click", () => {
    filters.prereq = !filters.prereq;
    $("#prereqToggle").setAttribute("aria-checked", filters.prereq);
    update();
  });
  $("#search").addEventListener("input", e => { query = e.target.value; update(); });
  $("#search").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const q = query.trim().toLowerCase();
      const hit = order.find(n => n.name.toLowerCase().includes(q));
      if (hit) { layer = Math.max(layer, hit.tier + 1); select(hit.id); focusNode(hit, Math.max(scale, 0.8)); }
    }
  });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#search").focus(); }
  });

  /* ---------- minimap --------------------------------------------------- */
  const minimap = $("#minimap"), mmView = $("#mmView");
  D.domains.forEach(d => {
    const dot = el("div", "mm-dot");
    dot.style.left = (d.x / VW * 100) + "%";
    dot.style.top = (d.y / VH * 100) + "%";
    const s = clamp(4, d.r / 14, 11);
    dot.style.width = dot.style.height = s + "px";
    dot.style.background = d.color;
    dot.style.boxShadow = `0 0 6px ${d.color}`;
    minimap.appendChild(dot);
  });
  function updateMinimapView() {
    const [w, h] = vpSize();
    const mw = minimap.clientWidth, mh = minimap.clientHeight;
    const left = (-tx / scale) / VW, top = (-ty / scale) / VH;
    mmView.style.left = clamp(0, left, 1) * mw + "px";
    mmView.style.top = clamp(0, top, 1) * mh + "px";
    mmView.style.width = clamp(0.04, (w / scale) / VW, 1) * mw + "px";
    mmView.style.height = clamp(0.04, (h / scale) / VH, 1) * mh + "px";
  }
  minimap.addEventListener("click", e => {
    const r = minimap.getBoundingClientRect();
    const wx = (e.clientX - r.left) / r.width * VW;
    const wy = (e.clientY - r.top) / r.height * VH;
    focusNode({ x: wx, y: wy }, scale);
  });

  /* ---------- starfield ------------------------------------------------- */
  function drawStars() {
    const c = $("#stars"), r = viewport.getBoundingClientRect();
    const W = c.width = r.width, H = c.height = r.height, ctx = c.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    const maxd = Math.hypot(W, H), ang = -0.42;

    // --- nebula fog (soft colored clouds) ---
    ctx.globalCompositeOperation = "lighter";
    // Muted, near-neutral haze (cohesive with the dark site theme, not a colourful nebula)
    const fog = [
      [.30, .28, .50, [44, 46, 60]],
      [.72, .34, .42, [54, 46, 56]],
      [.18, .74, .46, [40, 50, 68]],
      [.84, .76, .40, [40, 54, 58]],
      [.52, .50, .62, [48, 48, 64]]
    ];
    fog.forEach(([fx, fy, fr, col]) => {
      const g = ctx.createRadialGradient(fx * W, fy * H, 0, fx * W, fy * H, fr * maxd);
      g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},.10)`);
      g.addColorStop(.5, `rgba(${col[0]},${col[1]},${col[2]},.03)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    });

    // --- Milky-Way band: a faint diagonal swath of light ---
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(ang);
    const bandH = H * 0.34, bg = ctx.createLinearGradient(0, -bandH / 2, 0, bandH / 2);
    bg.addColorStop(0, "rgba(150,153,170,0)");
    bg.addColorStop(.5, "rgba(150,153,170,.055)");
    bg.addColorStop(1, "rgba(150,153,170,0)");
    ctx.fillStyle = bg; ctx.fillRect(-maxd / 2, -bandH / 2, maxd, bandH);
    ctx.restore();
    ctx.globalCompositeOperation = "source-over";

    // dense stars concentrated along the band (Milky-Way core)
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const ca = Math.cos(ang), sa = Math.sin(ang);
    for (let i = 0, n = Math.round(W * H / 2400); i < n; i++) {
      const t = (Math.random() - 0.5) * maxd, off = gauss() * bandH * 0.5;
      const x = W / 2 + t * ca - off * sa, y = H / 2 + t * sa + off * ca;
      if (x < 0 || x > W || y < 0 || y > H) continue;
      const a = Math.random() * 0.5 + 0.12, rad = Math.random() * 0.85 + 0.2;
      ctx.fillStyle = `rgba(${205 + Math.random() * 50 | 0},${208 + Math.random() * 47 | 0},255,${a})`;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    }
    // sparse field stars everywhere (a few bright ones glow)
    for (let i = 0, n = Math.round(W * H / 8500); i < n; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const rad = Math.random() * 1.4 + 0.3, a = Math.random() * 0.5 + 0.1;
      ctx.fillStyle = `rgba(${190 + Math.random() * 65 | 0},${200 + Math.random() * 55 | 0},255,${a})`;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
      if (rad > 1.35) {
        const gg = ctx.createRadialGradient(x, y, 0, x, y, rad * 4);
        gg.addColorStop(0, `rgba(200,212,255,${a * .35})`); gg.addColorStop(1, "rgba(200,212,255,0)");
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, rad * 4, 0, 7); ctx.fill();
      }
    }
  }

  /* ---------- init ------------------------------------------------------ */
  function setLayer(L) {
    layer = L;
    $("#layers").querySelectorAll(".layer").forEach(x => x.classList.toggle("active", +x.dataset.layer === L));
    update();
  }
  window.addEventListener("resize", () => { drawStars(); applyTransform(); });

  // Open on the full galaxy at concept depth, nothing selected, so everything is bright.
  // Clicking a node then highlights its connections and dims the rest.
  setLayer(3);
  renderDetail(null);
  update();
  applyReadState();
  // Re-check read progress when returning to the tab (an article opened in a new tab updates it).
  window.addEventListener("focus", () => { loadVisited(); applyReadState(); if (selected) renderDetail(nodes[selected]); });

  // Defer the backdrop + initial fit until the viewport has real dimensions
  // (avoids a 0×0 measurement race on first paint).
  function bootView(tries) {
    const [w, h] = vpSize();
    if (w < 2 || h < 2) {
      if (tries > 0) return requestAnimationFrame(() => bootView(tries - 1));
    }
    drawStars();
    fitAll();
  }
  bootView(60);
  if (window.ResizeObserver) {
    let first = true;
    new ResizeObserver(() => {
      const [w, h] = vpSize();
      if (w < 2 || h < 2) return;
      if (first) { first = false; drawStars(); fitAll(); }
      else { drawStars(); applyTransform(); }
    }).observe(viewport);
  }
})();
