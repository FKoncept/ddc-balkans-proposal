// Step-by-step walkthrough: one screen at a time, each with its own #link,
// so it works both for someone reading alone and for someone presenting it.
(() => {
  const CHAPTERS = ['How it works today', 'The idea', 'Five changes', 'Your choice', 'Next step'];
  const BASE_TITLE = 'Proposal for The DDC Group Balkans';

  const screens = [...document.querySelectorAll('.screen')];
  const ids = screens.map((s) => s.id);
  const chapterList = document.getElementById('chapters');
  const back = document.getElementById('back');
  const fwd = document.getElementById('fwd');
  const nextLabel = document.getElementById('next-label');
  const where = document.getElementById('where');
  const progress = document.getElementById('progress');
  let current = -1;

  // Chapter buttons jump to the first screen of each chapter
  const chapterButtons = CHAPTERS.map((name, ch) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = name;
    b.addEventListener('click', () => go(screens.find((s) => +s.dataset.ch === ch).id));
    li.append(b);
    chapterList.append(li);
    return b;
  });

  const shortTitle = (s) => s.dataset.title.split(':')[0];

  const render = (index, moveFocus) => {
    if (index === current) return;
    current = index;
    const screen = screens[index];
    const ch = +screen.dataset.ch;
    screens.forEach((s, i) => { s.hidden = i !== index; });
    document.body.classList.toggle('is-welcome', ch < 0);

    chapterButtons.forEach((b, i) => {
      b.classList.toggle('done', i < ch);
      if (i === ch) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    progress.style.width = `${(index / (screens.length - 1)) * 100}%`;
    if (ch >= 0) chapterButtons[ch].scrollIntoView({ block: 'nearest', inline: 'center' });
    where.textContent = index > 0 ? `Step ${index} of ${screens.length - 1}` : '';
    back.disabled = index === 0;
    const last = index === screens.length - 1;
    fwd.firstChild.textContent = last ? 'Back to the start' : 'Next';
    nextLabel.textContent = last ? '' : `: ${shortTitle(screens[index + 1])}`;
    document.title = index === 0 ? `One Candidate, One Record | ${BASE_TITLE}` : `${screen.dataset.title} | ${BASE_TITLE}`;

    window.scrollTo(0, 0);
    if (moveFocus) screen.focus({ preventScroll: true });
  };

  const go = (id) => {
    if (!ids.includes(id)) return;
    if (location.hash.slice(1) !== id) history.pushState(null, '', `#${id}`);
    render(ids.indexOf(id), true);
  };
  const step = (delta) => {
    const i = current + delta;
    if (i >= screens.length) go(ids[0]);
    else if (i >= 0) go(ids[i]);
  };

  back.addEventListener('click', () => step(-1));
  fwd.addEventListener('click', () => step(1));
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => go(b.dataset.go)));
  window.addEventListener('popstate', () => {
    const id = location.hash.slice(1);
    render(ids.includes(id) ? ids.indexOf(id) : 0, true);
  });

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target instanceof Element && e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
  });

  // "Today" / "With this change" switches
  document.querySelectorAll('[data-scene]').forEach((scene) => {
    const buttons = scene.querySelectorAll('.scene-switch button');
    buttons.forEach((b) => b.addEventListener('click', () => {
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      scene.querySelectorAll('.pane').forEach((p) => { p.hidden = p.dataset.pane !== b.dataset.pane; });
    }));
  });

  // "Your choice": a rough total, only to help thinking. Nothing is saved or sent.
  const picks = document.getElementById('picks');
  const total = document.getElementById('total');
  const updateTotal = () => {
    const on = [...picks.querySelectorAll('input:checked')];
    const min = on.reduce((a, x) => a + +x.dataset.min, 0);
    const max = on.reduce((a, x) => a + +x.dataset.max, 0);
    total.replaceChildren();
    if (!on.length) { total.textContent = 'Tick one or more to see a rough total.'; return; }
    const b1 = document.createElement('b'); b1.textContent = `${on.length} of 5`;
    const b2 = document.createElement('b'); b2.textContent = `${min} to ${max} weeks`;
    total.append('You picked ', b1, '. Done one after another, that is roughly ', b2, '. Some could run side by side, and the real dates come after our hour together.');
  };
  picks.addEventListener('change', updateTotal);
  updateTotal();

  // The browser jumps to #anchors on load; keep the header in view instead.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const start = location.hash.slice(1);
  render(ids.includes(start) ? ids.indexOf(start) : 0, false);
  window.addEventListener('load', () => window.scrollTo(0, 0));
})();
