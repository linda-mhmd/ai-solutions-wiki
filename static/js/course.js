/* Course engine: localStorage progress + scoring, quiz grading, and the course
   map progress graph. No dependencies. Progress is per-lesson, keyed by URL.
   Storage shape: { lessons: { "<url>": { done, score, total, ts } } } */
(function () {
  "use strict";
  var KEY = "aiwiki.progress.v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { lessons: {} }; }
    catch (e) { return { lessons: {} }; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function lessonState(id) { return load().lessons[id] || null; }
  function setLesson(id, score, total) {
    var s = load();
    var prev = s.lessons[id];
    if (!prev || score >= prev.score) s.lessons[id] = { done: true, score: score, total: total, ts: Date.now() };
    else prev.done = true;
    save(s);
  }
  function pct(score, total) { return total ? Math.round((100 * score) / total) : 0; }
  function esc(s) {
    return (s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------------- LESSON PAGE ---------------- */
  function initLesson() {
    var root = document.getElementById("lesson-root");
    if (!root) return;
    var id = root.getAttribute("data-lesson-id");
    var mount = document.getElementById("quiz-mount");
    var quiz = [];
    var dataEl = document.getElementById("lesson-quiz-data");
    if (dataEl) {
      try {
        var raw = JSON.parse(dataEl.textContent);
        if (typeof raw === "string") raw = JSON.parse(raw); // tolerate double-encoded JSON
        quiz = raw || [];
      } catch (e) { quiz = []; }
    }
    var prior = lessonState(id);

    if (quiz.length && mount) {
      renderQuiz(mount, root, id, quiz);
      if (prior) {
        var note = document.createElement("div");
        note.className = "cq-prior";
        note.textContent = "Your best so far: " + prior.score + " / " + prior.total + " (" + pct(prior.score, prior.total) + "%). Try again to improve it.";
        mount.insertBefore(note, mount.firstChild);
      }
    } else {
      // No quiz: offer a simple mark-complete.
      var mc = document.getElementById("mark-complete");
      if (mc) {
        if (prior && prior.done) mc.textContent = "Completed. Mark again";
        mc.addEventListener("click", function () {
          setLesson(id, 1, 1);
          mc.textContent = "Completed";
          mc.classList.add("cq-btn-done");
        });
      }
    }
  }

  function renderQuiz(mount, root, id, quiz) {
    var html = "";
    quiz.forEach(function (q, i) {
      html += '<div class="cq" data-qi="' + i + '">';
      html += '<div class="cq-q">' + (i + 1) + ". " + esc(q.q) + "</div>";
      html += '<div class="cq-opts">';
      (q.options || []).forEach(function (opt, oi) {
        html += '<label class="cq-opt"><input type="radio" name="q' + i + '" value="' + oi + '"><span>' + esc(opt) + "</span></label>";
      });
      html += "</div>";
      html += '<div class="cq-explain" hidden>' + esc(q.explain || "") + "</div>";
      html += "</div>";
    });
    html += '<div class="cq-actions"><button type="button" class="cq-btn cq-btn-primary cq-submit">Check answers</button><span class="cq-score" hidden></span></div>';
    html += '<div class="cq-next" hidden></div>';
    mount.innerHTML = html;
    mount.querySelector(".cq-submit").addEventListener("click", function () { grade(mount, root, id, quiz); });
  }

  function grade(mount, root, id, quiz) {
    var score = 0;
    quiz.forEach(function (q, i) {
      var block = mount.querySelector('.cq[data-qi="' + i + '"]');
      block.classList.remove("cq-correct", "cq-wrong");
      var sel = mount.querySelector('input[name="q' + i + '"]:checked');
      var val = sel ? parseInt(sel.value, 10) : -1;
      if (val === q.answer) { score++; block.classList.add("cq-correct"); }
      else block.classList.add("cq-wrong");
      block.querySelector(".cq-explain").hidden = false;
      block.querySelectorAll(".cq-opt").forEach(function (o, oi) {
        o.classList.toggle("cq-opt-correct", oi === q.answer);
      });
    });
    setLesson(id, score, quiz.length);
    var scoreEl = mount.querySelector(".cq-score");
    scoreEl.hidden = false;
    scoreEl.textContent = "Score: " + score + " / " + quiz.length + " (" + pct(score, quiz.length) + "%)";
    var nextEl = mount.querySelector(".cq-next");
    nextEl.hidden = false;
    var next = root.getAttribute("data-next");
    var nextTitle = root.getAttribute("data-next-title");
    var courseUrl = root.getAttribute("data-course-url");
    var h = "";
    if (next) h += '<a class="cq-btn cq-btn-primary" href="' + next + '">Next: ' + esc(nextTitle || "Continue") + "</a>";
    h += '<button type="button" class="cq-btn cq-repeat">Repeat this lesson</button>';
    if (courseUrl) h += '<a class="cq-btn" href="' + courseUrl + '">Back to course map</a>';
    nextEl.innerHTML = h;
    var rep = nextEl.querySelector(".cq-repeat");
    if (rep) rep.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); location.reload(); });
    nextEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------------- COURSE MAP ---------------- */
  function initCourse() {
    var map = document.getElementById("course-map");
    if (!map) return;
    var lessons = Array.prototype.slice.call(map.querySelectorAll("[data-lesson-id]"));
    if (!lessons.length) return;
    var done = 0, weak = [], firstUndone = null;
    lessons.forEach(function (el) {
      var st = lessonState(el.getAttribute("data-lesson-id"));
      var badge = el.querySelector(".lesson-badge");
      if (st && st.done) {
        var p = pct(st.score, st.total);
        el.classList.add("lesson-done", p >= 80 ? "lesson-mastered" : "lesson-weak");
        if (badge) badge.textContent = p + "%";
        done++;
        if (p < 80) weak.push(el);
      } else {
        el.classList.add("lesson-todo");
        if (badge) badge.textContent = "";
        if (!firstUndone) firstUndone = el;
      }
    });
    var prog = Math.round((100 * done) / lessons.length);
    var fill = map.querySelector(".cm-bar-fill"); if (fill) fill.style.width = prog + "%";
    var lbl = map.querySelector(".cm-progress-label"); if (lbl) lbl.textContent = done + " / " + lessons.length + " lessons complete (" + prog + "%)";
    var cont = map.querySelector(".cm-continue");
    if (cont) {
      var target = firstUndone || weak[0] || lessons[0];
      var a = target ? target.querySelector("a") : null;
      if (a) { cont.setAttribute("href", a.getAttribute("href")); cont.textContent = firstUndone ? "Continue where you left off" : "Review and improve"; }
    }
    var focus = map.querySelector(".cm-focus-list");
    if (focus) {
      var items = weak.slice(0, 4);
      focus.innerHTML = items.length
        ? items.map(function (el) { var a = el.querySelector("a"); return '<li><a href="' + a.getAttribute("href") + '">' + esc(a.textContent.trim()) + "</a> <span class=\"cm-focus-score\">" + (el.querySelector(".lesson-badge") ? el.querySelector(".lesson-badge").textContent : "") + "</span></li>"; }).join("")
        : "<li>Nothing flagged yet. Complete a few lessons and any below 80% will appear here.</li>";
    }
  }

  document.addEventListener("DOMContentLoaded", function () { initLesson(); initCourse(); });
})();
