/* Browse gallery: client-side filtering by section chip + name/tag search. */
(function () {
  'use strict';
  var grid = document.querySelector('.xp-grid');
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.sl-card'));
  var chips = document.querySelectorAll('.xp-chip');
  var search = document.querySelector('.xp-search');
  var empty = document.querySelector('.xp-empty');
  var curSection = 'all', curText = '';

  function apply() {
    var n = 0;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var okS = curSection === 'all' || c.getAttribute('data-section') === curSection;
      var okT = !curText
        || (c.getAttribute('data-title') || '').indexOf(curText) > -1
        || (c.getAttribute('data-tags') || '').indexOf(curText) > -1;
      var show = okS && okT;
      c.style.display = show ? '' : 'none';
      if (show) n++;
    }
    if (empty) empty.hidden = n > 0;
  }

  for (var j = 0; j < chips.length; j++) {
    chips[j].addEventListener('click', function () {
      for (var k = 0; k < chips.length; k++) chips[k].classList.remove('is-active');
      this.classList.add('is-active');
      curSection = this.getAttribute('data-filter');
      apply();
    });
  }
  if (search) {
    search.addEventListener('input', function () {
      curText = search.value.trim().toLowerCase();
      apply();
    });
  }
})();
