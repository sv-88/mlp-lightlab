/* MLP Light Lab — presentation behaviour
   Reveals each slide's elements as it arrives, keeps a progress line,
   and adds keyboard navigation. No dependencies. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var bar = document.querySelector('.progress span');
  var next = document.querySelector('.next');
  var current = 0;

  // Page load: lift the veil once fonts and the first image are ready
  function ready() {
    if (root.classList.contains('loaded')) return;
    root.classList.add('loaded');
    slides.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3) reveal(s);
    });
  }
  var first = slides[0] && slides[0].querySelector('img');
  var fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  var imgReady = new Promise(function (res) {
    if (!first || first.complete) return res();
    first.addEventListener('load', res); first.addEventListener('error', res);
  });
  Promise.all([fontsReady, imgReady]).then(function () { setTimeout(ready, 250); });
  setTimeout(ready, 3000); // never hold the page longer than this

  // Count-up for numbers marked data-count
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    var target = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    setTimeout(function () { requestAnimationFrame(step); }, 300);
  }

  function reveal(slide) {
    if (!root.classList.contains('loaded')) return;
    slide.classList.add('in');
    slide.querySelectorAll('[data-count]').forEach(countUp);
  }

  function setCurrent(i) {
    current = i;
    if (bar) bar.style.transform = 'scaleY(' + ((i + 1) / slides.length) + ')';
    if (next) next.classList.toggle('is-hidden', i >= slides.length - 1);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          reveal(e.target);
          if (e.intersectionRatio >= 0.5) setCurrent(slides.indexOf(e.target));
        }
      });
    }, { threshold: [0.3, 0.5] });
    slides.forEach(function (s) { io.observe(s); });
  } else {
    slides.forEach(function (s) { s.classList.add('in'); });
  }

  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea, select')) return;
    var k = e.key;
    if (k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey) || k === 'ArrowRight') { e.preventDefault(); go(current + 1); }
    else if (k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey) || k === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(slides.length - 1); }
  });

  if (next) next.addEventListener('click', function () { go(current + 1); });
  setCurrent(0);
})();
