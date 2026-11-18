// The presentation site: style and theme controls (the Jay website's, css/theme.css tokens), the
// icons, and the mesh × SFU calculator. Portuguese only.

const svg = (body) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

/** The Jay website's icons, plus the ones this page needs. */
export const ICONS = {
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'),
  moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
  download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
  github: svg('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'),
  document: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
  waveform: svg('<path d="M2 12h2M6 8v8M10 4v16M14 7v10M18 10v4M22 12h-2"/>'),
  code: svg('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'),
  shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
  layers: svg('<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'),
  server: svg('<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>'),
  laptop: svg('<rect x="4" y="4" width="16" height="11" rx="2"/><path d="M2 19h20"/>'),
  monitor: svg('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  chip: svg('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
  send: svg('<path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>'),
  users: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
  mic: svg('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>'),
  lock: svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  key: svg('<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M14 9l2 2"/>'),
  chat: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
  phone: svg('<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/>'),
  image: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),
};

/**
 * Upload per stream, in Mbps, for `people` in a room where one of them sends `mbps` and the others
 * watch: mesh (the sender uploads a copy per viewer), SFU (once), and the SFU server's upload.
 */
export function uploads(people, mbps) {
  const viewers = Math.max(0, people - 1);
  return { mesh: viewers * mbps, sfu: mbps, server: viewers * mbps };
}

/** 7.5 → "7,5 Mbps" (Brazilian decimal comma). */
export const mbpsLabel = (n) => `${Number.isInteger(n) ? n : n.toFixed(1).replace('.', ',')} Mbps`;

// ---------- The page (skipped when the tests import this file in Node) ----------

if (globalThis.document?.getElementById('theme-toggle')) {
  const KEY = 'jayc.apresentacao';
  const root = document.documentElement;
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {}
  const save = (patch) => {
    saved = { ...saved, ...patch };
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {} // private mode: the choice lasts until the page closes
  };

  for (const el of document.querySelectorAll('[data-icon]')) el.innerHTML = ICONS[el.dataset.icon] ?? '';

  function renderTheme() {
    const dark = root.dataset.theme === 'dark';
    const button = document.getElementById('theme-toggle');
    button.innerHTML = dark ? ICONS.sun : ICONS.moon;
    button.setAttribute('aria-label', dark ? 'Mudar para o modo claro' : 'Mudar para o modo escuro');
    button.title = button.getAttribute('aria-label');
  }

  function renderStyle() {
    for (const b of document.querySelectorAll('[data-style-value]')) {
      const on = b.dataset.styleValue === root.dataset.style;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    }
  }

  document.getElementById('theme-toggle').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    save({ theme: root.dataset.theme });
    renderTheme();
  });
  const styleGroup = document.querySelector('.style-switch');
  styleGroup.addEventListener('click', (e) => {
    const button = e.target.closest('[data-style-value]');
    if (!button) return;
    root.dataset.style = button.dataset.styleValue;
    save({ style: root.dataset.style });
    renderStyle();
  });
  styleGroup.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const buttons = [...styleGroup.querySelectorAll('[data-style-value]')];
    const next = buttons[(buttons.indexOf(document.activeElement) + step + buttons.length) % buttons.length];
    next.focus();
    next.click();
  });

  // The mesh × SFU calculator: bars scaled to the worst case (16 people at 6 Mbps = 90 Mbps).
  const people = document.getElementById('calc-people');
  const source = document.getElementById('calc-source');
  const MAX = uploads(16, 6).mesh;
  function renderCalc() {
    const n = Number(people.value);
    const u = uploads(n, Number(source.value));
    document.getElementById('calc-people-out').textContent = n;
    for (const key of ['mesh', 'sfu', 'server']) {
      document.getElementById(`bar-${key}`).style.width = `${Math.max(1.5, (u[key] / MAX) * 100)}%`;
      document.getElementById(`val-${key}`).textContent = mbpsLabel(u[key]);
    }
  }
  people.addEventListener('input', renderCalc);
  source.addEventListener('change', renderCalc);

  renderTheme();
  renderStyle();
  renderCalc();
}
