// Interactive mockup for proposal 1. All people are made up; nothing is saved.
(() => {
  const STATUSES = {
    'New':            { group: 'new',      toContact: true },
    'No answer':      { group: 'progress', toContact: true },
    'Contacted':      { group: 'progress' },
    'Interview':      { group: 'progress' },
    'Offer':          { group: 'progress' },
    'Working':        { group: 'working',  blocked: 'works here' },
    'Left':           { group: 'closed' },
    'Not suitable':   { group: 'closed' },
    'Do not contact': { group: 'closed',   blocked: 'asked not to be contacted' },
  };
  const COLORS = { new: '#827493', progress: '#1f8093', working: '#20a47a', closed: '#c02a7e' };
  const TODAY = '23 Sep 2026';

  const seed = () => [
    { id: 1, name: 'Tarik Hadžić', email: 'tarik.h@example.com', langs: ['German C1'], city: 'Sarajevo', role: 'German, Customer Support Agent', status: 'New',
      history: [['21 Sep 2026', 'Applied from the website', 'New']] },
    { id: 2, name: 'Jelena Marković', email: 'jelena.m@example.com', langs: ['German B2', 'English C1'], city: 'Belgrade', role: 'German and English, B2B Sales Agent', status: 'Interview',
      history: [['19 Sep 2026', 'Applied from the website', 'New'], ['20 Sep 2026', 'Called, interview booked (Recruiter)', 'Interview']] },
    { id: 3, name: 'Selma Mujić', email: 'selma.m@example.com', langs: ['German B2'], city: 'Sarajevo', role: 'German, Customer Support Agent', status: 'No answer',
      history: [['12 Sep 2026', 'Applied from the website', 'New'], ['16 Sep 2026', 'Called twice, no answer (Recruiter)', 'No answer']] },
    { id: 4, name: 'Amina Hodžić', email: 'amina.h@example.com', langs: ['German C1', 'English B2'], city: 'Sarajevo', role: 'German, Customer Support Agent', status: 'Working', apps: 1,
      history: [['11 Feb 2026', 'Applied from the website', 'New'], ['18 Feb 2026', 'Interview (Recruiter)', 'Interview'], ['12 Mar 2026', 'Started work', 'Working']] },
    { id: 5, name: 'Nikola Ilić', email: 'nikola.i@example.com', langs: ['German B2'], city: 'Belgrade', role: 'German, Customer Service Advisor', status: 'Left',
      history: [['3 Jan 2026', 'Started work', 'Working'], ['30 Jun 2026', 'Left: moved abroad. Would rehire (Recruiter)', 'Left']] },
    { id: 6, name: 'Marko Petrović', email: 'marko.p@example.com', langs: ['Dutch B2'], city: 'Sarajevo', role: 'Dutch, Customer Support Agent', status: 'Not suitable',
      history: [['2 Apr 2026', 'Applied from the website', 'New'], ['9 Apr 2026', 'Dutch level below B2 after test (Recruiter)', 'Not suitable']] },
    { id: 7, name: 'Lejla Begić', email: 'lejla.b@example.com', langs: ['Italian C1'], city: 'Sarajevo', role: 'Italian, Customer Service Advisor', status: 'Contacted',
      history: [['17 Sep 2026', 'Applied from the website', 'New'], ['18 Sep 2026', 'Sent test task by email (Recruiter)', 'Contacted']] },
    { id: 8, name: 'Emina Kovačević', email: 'emina.k@example.com', langs: ['Swedish B2', 'English C1'], city: 'Sarajevo', role: 'Swedish, Customer Support Agent', status: 'Do not contact',
      history: [['15 Mar 2026', 'Applied from the website', 'New'], ['20 Mar 2026', 'Asked not to be contacted again (Recruiter)', 'Do not contact']] },
    { id: 9, name: 'Stefan Jovanović', email: 'stefan.j@example.com', langs: ['Dutch C1'], city: 'Belgrade', role: 'Dutch, Customer Support Agent', status: 'Offer',
      history: [['8 Sep 2026', 'Applied from the website', 'New'], ['15 Sep 2026', 'Interview passed (Recruiter)', 'Interview'], ['22 Sep 2026', 'Offer sent (Recruiter)', 'Offer']] },
  ];

  let people = seed();
  let filterStatus = 'all';
  let filterLang = 'all';
  let selected = null;
  let simStep = 0;

  const $ = (id) => document.getElementById(id);
  const h = (tag, attrs = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'style') el.style.cssText = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    kids.flat().forEach((c) => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  };
  const chip = (status) => h('span', { class: 'chip ' + STATUSES[status].group }, status);
  const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);

  const matches = (p) => {
    const s = STATUSES[p.status];
    if (filterStatus === 'contact' && !(s.toContact && !s.blocked)) return false;
    if (filterStatus !== 'all' && filterStatus !== 'contact' && s.group !== filterStatus) return false;
    if (filterLang !== 'all' && !p.langs.some((l) => l.startsWith(filterLang))) return false;
    return true;
  };

  const renderRows = () => {
    const tbody = $('rows');
    tbody.replaceChildren();
    const list = people.filter(matches);
    list.forEach((p) => {
      const last = p.history[p.history.length - 1][0];
      const sub = p.apps > 1 ? `${p.apps} applications` : `Updated ${last.replace(/ 2026$/, '')}`;
      const tr = h('tr', {
        tabindex: '0',
        'aria-selected': String(p.id === selected),
        onclick: () => select(p.id),
        onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(p.id); } },
      },
        h('td', { class: 'who' }, p.name, h('span', { class: 'sub' }, sub)),
        h('td', {}, p.langs.join(', ')),
        h('td', {}, p.city),
        h('td', {}, chip(p.status)),
      );
      tbody.append(tr);
    });
    if (!list.length) tbody.append(h('tr', {}, h('td', { colspan: '4', style: 'color:#5b6b82;white-space:normal' }, 'Nobody matches these filters. Choose "Everyone" or "All languages" to widen the list.')));
    $('count').textContent = `${list.length} of ${people.length} people shown`;
  };

  const message = (kind, bold, text) => {
    const box = $('demo-msg');
    box.replaceChildren(h('div', { class: 'alert ' + kind }, h('span', {}, h('b', {}, bold + ' '), text)));
  };

  const setStatus = (p, status, note) => {
    const target = STATUSES[status];
    const current = STATUSES[p.status];
    if (current.blocked && (status === 'Contacted' || status === 'Interview')) {
      message('warn', 'Not changed.', `${p.name} ${current.blocked} (status "${p.status}"). Change that status first if it is no longer true.`);
      return;
    }
    p.status = status;
    p.history.push([TODAY, note || `Marked as ${status.toLowerCase()} (You)`, status]);
    message(target.blocked ? 'ok' : 'info', 'Saved.', `${p.name} is now "${status}".` + (target.blocked ? ' They no longer appear in call lists.' : ''));
    render();
  };

  const renderProfile = () => {
    const box = $('profile');
    const p = people.find((x) => x.id === selected);
    if (!p) { box.replaceChildren(h('p', { class: 'empty' }, 'Open a candidate to see their record.')); return; }
    const s = STATUSES[p.status];
    const color = COLORS[s.group];
    const actions = [
      ['Contacted', 'Mark contacted'],
      ['Interview', 'Interview'],
      ['Working', 'Started work'],
      ['Left', 'Left'],
      ['Do not contact', 'Do not contact'],
    ].filter(([st]) => st !== p.status);

    box.replaceChildren(
      h('div', { class: 'p-head' },
        h('div', { class: 'avatar', style: `background:${color}` }, initials(p.name)),
        h('div', {}, h('h4', {}, p.name), h('div', { class: 'sub' }, p.email)),
      ),
      s.blocked ? h('div', { class: 'alert ok' }, h('span', {}, h('b', {}, 'Hidden from call lists. '), `${p.name.split(' ')[0]} ${s.blocked}.`)) : null,
      h('dl', {},
        h('div', {}, h('dt', {}, 'Status'), h('dd', {}, chip(p.status))),
        h('div', {}, h('dt', {}, 'City'), h('dd', {}, p.city)),
        h('div', {}, h('dt', {}, 'Languages'), h('dd', {}, p.langs.join(', '))),
        h('div', {}, h('dt', {}, 'Applied for'), h('dd', {}, p.role)),
      ),
      h('div', { class: 'p-actions' }, actions.map(([st, label], i) =>
        h('button', { type: 'button', class: i === 0 ? 'primary' : '', onclick: () => setStatus(p, st) }, label))),
      h('ol', { class: 'timeline', 'aria-label': 'History' },
        [...p.history].reverse().map(([date, text, st]) =>
          h('li', { style: `--dot:${COLORS[STATUSES[st].group]}` }, h('time', {}, date), text))),
    );
  };

  const select = (id) => { selected = id; render(); };
  const render = () => { renderRows(); renderProfile(); };

  const wireFilters = (groupId, set) => {
    $(groupId).addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $(groupId).querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      set(b.dataset.v);
      renderRows();
    });
  };
  wireFilters('f-status', (v) => { filterStatus = v; });
  wireFilters('f-lang', (v) => { filterLang = v; });

  const simulate = () => {
    if (simStep === 3) {
      people = seed(); simStep = 0; selected = null;
      $('simulate').textContent = 'Simulate a new application';
      $('demo-msg').replaceChildren();
      render();
      return;
    }
    if (simStep === 0) {
      const p = { id: 10, name: 'Luka Đorđević', email: 'luka.d@example.com', langs: ['Dutch B2', 'English C1'], city: 'Belgrade', role: 'Dutch, Customer Support Agent', status: 'New',
        history: [[TODAY, 'Applied from the website', 'New']] };
      people.unshift(p);
      selected = p.id;
      message('info', 'New application.', 'Luka Đorđević applied for Dutch, Customer Support Agent. He is new, so he was added to "To contact".');
    } else if (simStep === 1) {
      const p = people.find((x) => x.id === 4);
      p.apps = (p.apps || 1) + 1;
      p.history.push([TODAY, 'Applied again from the website: German and English, B2B Sales Agent', 'Working']);
      selected = p.id;
      message('warn', 'Already in your list.', 'Amina Hodžić applied again with the same email. She has worked here since 12 Mar 2026, so the application was added to her record and she was not put in "To contact".');
    } else {
      const p = people.find((x) => x.id === 5);
      p.apps = (p.apps || 1) + 1;
      p.status = 'New';
      p.history.push([TODAY, 'Applied again from the website. Worked here until 30 Jun 2026', 'New']);
      selected = p.id;
      message('info', 'Former colleague.', 'Nikola Ilić left on 30 Jun 2026 and has applied again. His record keeps the note "moved abroad, would rehire", so you can decide with the full story.');
    }
    simStep += 1;
    if (simStep === 3) $('simulate').textContent = 'Reset the demo';
    render();
  };
  $('simulate').addEventListener('click', simulate);

  render();
})();
