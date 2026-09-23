(() => {
  const deck = document.getElementById('deck');
  const slides = [...deck.querySelectorAll('.slide')];
  const rail = document.getElementById('rail');
  const cur = document.getElementById('cur');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  document.getElementById('tot').textContent = slides.length;

  // Side rail with slide names
  const links = slides.map((s) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.innerHTML = '<span></span><i></i>';
    a.querySelector('span').textContent = s.dataset.title;
    li.appendChild(a);
    rail.appendChild(li);
    return a;
  });

  let index = 0;
  const setCurrent = (i) => {
    index = i;
    cur.textContent = i + 1;
    links.forEach((a, j) => a.setAttribute('aria-current', j === i ? 'true' : 'false'));
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setCurrent(slides.indexOf(e.target));
    });
  }, { root: deck.scrollHeight > deck.clientHeight ? deck : null, threshold: 0.55 });
  slides.forEach((s) => io.observe(s));
  setCurrent(0);

  const go = (i) => {
    const t = slides[Math.max(0, Math.min(slides.length - 1, i))];
    t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) {
      e.preventDefault(); go(index + 1);
    } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
      e.preventDefault(); go(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault(); go(0);
    } else if (e.key === 'End') {
      e.preventDefault(); go(slides.length - 1);
    }
  });

  // Opening: two contradicting rows resolve into one record
  const merge = document.getElementById('merge');
  const play = () => {
    merge.classList.remove('play', 'done');
    void merge.offsetWidth;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      merge.classList.add('done');
      return;
    }
    merge.classList.add('play');
  };
  document.getElementById('replay').addEventListener('click', play);
  // Start once the table is actually on screen (on phones it sits below the headline)
  const seen = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { seen.disconnect(); play(); }
  }, { threshold: 0.5 });
  seen.observe(merge);
})();
