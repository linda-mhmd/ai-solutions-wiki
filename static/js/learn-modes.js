/* "Learn this your way" panel: jump to the matching learning mode on the page, and a
   deeplearning.ai-style "Mark as learned" toggle stored in localStorage (never sent). */
(function () {
  'use strict';
  var panel = document.querySelector('.learn-modes');
  if (!panel) return;
  var KEY = 'aiwiki.learned.v1';
  var path = location.pathname.replace(/\/+$/, '/');
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function scrollTo(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('lm-flash');
    setTimeout(function () { el.classList.remove('lm-flash'); }, 1200);
  }

  panel.querySelectorAll('.lm-chip[data-mode]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var mode = chip.getAttribute('data-mode');
      if (mode === 'watch') scrollTo(document.querySelector('.wiki-video, .lesson-video'));
      else if (mode === 'stack') scrollTo(document.querySelector('.layer-map'));
    });
  });

  // Mark as learned (explicit, course-style).
  var btn = panel.querySelector('.lm-learned');
  var txt = btn.querySelector('.lm-learned-txt');
  var learned = load();
  function render() {
    var on = !!learned[path];
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
    txt.textContent = on ? 'Learned' : 'Mark as learned';
  }
  render();
  btn.addEventListener('click', function () {
    if (learned[path]) delete learned[path]; else learned[path] = Date.now();
    save(learned); render();
  });
})();
