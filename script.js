import './styles.css';
import effectCSS from './effects.css?raw';
import './effects.css';

const effects = [
  ['pulse', 'Pulse', 'A quiet signal that keeps things alive.', 'LOOP', '<span class="pulse-dot"></span>'],
  ['bounce', 'Bounce', 'A little energy. A soft landing.', 'LOOP', '<span class="bounce-ball"></span><span class="bounce-shadow"></span>'],
  ['spin', 'Spin', 'For the moments in between.', 'LOOP', '<span class="spin-ring"></span>'],
  ['shimmer', 'Shimmer skeleton', 'Give waiting a little polish.', 'LOOP', '<div class="skeleton"><div class="skeleton-avatar shimmer-surface"></div><div class="skeleton-lines"><i class="shimmer-surface"></i><i class="shimmer-surface"></i></div><div class="skeleton-wide shimmer-surface"></div></div>'],
  ['float', 'Floating card', 'Light on its feet. Easy on the eyes.', 'LOOP', '<div class="float-card"><span>✳</span><b>A little levity</b><small>Less weight. More wonder.</small></div>'],
  ['gradient', 'Gradient shift', 'A spectrum that never sits still.', 'LOOP', '<div class="gradient-tile"><span>Stay<br />in flow.</span><span>↗</span></div>'],
  ['typewriter', 'Typewriter', 'One character at a time.', 'LOOP', '<div class="typewriter-text">Hello, world.</div>'],
  ['reveal', 'Reveal on scroll', 'Make an entrance, naturally.', 'SCROLL', '<div class="reveal-content"><span>↗</span><b>Worth the scroll.</b><small>A fresh perspective.</small></div>'],
  ['stagger', 'Staggered cards', 'Great things arrive in sequence.', 'LOOP', '<div class="stagger-group"><span>01</span><span>02</span><span>03</span></div>'],
  ['lift', 'Hover lift', 'A small response to a little curiosity.', 'HOVER', '<button class="lift-card">Come a little closer <span>↗</span></button>'],
  ['orbit', 'Orbiting dots', 'Everything finds its own rhythm.', 'LOOP', '<div class="orbit-track"><span class="orbit-center">✳</span><div class="orbit-arm"><i></i><i></i></div></div>'],
  ['underline', 'Animated underline', 'A line with a little personality.', 'HOVER', '<button class="underline-link">Follow your curiosity <span>↗</span></button>'],
];

const gallery = document.querySelector('#gallery');
gallery.innerHTML = effects.map(([id, name, description, kind, markup], index) => `
  <article class="demo" data-effect="${id}" aria-labelledby="title-${id}">
    <div class="preview preview-${id}"><span class="demo-number">${String(index + 1).padStart(2, '0')}</span><span class="kind">${kind}</span><div class="stage">${markup}</div>${kind === 'HOVER' ? '<span class="hover-hint">HOVER OR FOCUS TO EXPLORE</span>' : ''}</div>
    <div class="card-body"><h2 id="title-${id}">${name}</h2><p>${description}</p><div class="card-actions">${kind === 'HOVER' ? '<span class="interaction-label">↗ Interactive</span>' : `<button class="play-toggle" aria-label="Pause ${name}" aria-pressed="false">Ⅱ <span>Pause</span></button>`}<button class="copy-button" aria-label="Copy CSS for ${name}"><span aria-hidden="true">▣</span> Copy CSS</button></div></div>
  </article>`).join('');

const readSetting = key => { try { return localStorage.getItem(key); } catch { return null; } };
const saveSetting = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences still work without storage. */ } };
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const motionSwitch = document.querySelector('#reduced-motion');
let motionPreference = readSetting('motion-reduced');
function applyMotion() {
  const reduced = motionPreference === null ? systemMotion.matches : motionPreference === 'true';
  document.documentElement.dataset.reduced = String(reduced);
  motionSwitch.checked = reduced;
  document.querySelector('#motion-note').textContent = reduced ? 'Reduced motion is on. Every effect is shown in a still, readable state.' : 'Motion is on. Pause any loop to take a closer look.';
  document.querySelectorAll('.play-toggle').forEach(button => { button.disabled = reduced; });
}
motionSwitch.addEventListener('change', () => { motionPreference = String(motionSwitch.checked); saveSetting('motion-reduced', motionPreference); applyMotion(); });
systemMotion.addEventListener('change', applyMotion);
applyMotion();

let themePreference = readSetting('motion-theme');
function applyTheme() {
  const dark = themePreference ? themePreference === 'dark' : systemTheme.matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const button = document.querySelector('#theme-toggle');
  button.innerHTML = `◐ <span>${dark ? 'Light' : 'Dark'} mode</span>`;
  button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
}
document.querySelector('#theme-toggle').addEventListener('click', () => { themePreference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; saveSetting('motion-theme', themePreference); applyTheme(); });
systemTheme.addEventListener('change', applyTheme);
applyTheme();

// The copied source is the exact stylesheet block used by the live effect.
function getSnippet(id) {
  const start = `/* demo:${id} */`;
  const block = effectCSS.split(start)[1].split('/* end-demo */')[0].trim();
  return `${block}\n\n/* Honor the visitor's motion preference. */\n@media (prefers-reduced-motion: reduce) {\n  .preview-${id}, .preview-${id} *, .preview-${id} *::before, .preview-${id} *::after {\n    animation: none !important; transition: none !important;\n  }\n}`;
}
gallery.addEventListener('click', async event => {
  const card = event.target.closest('.demo');
  if (!card) return;
  const toggle = event.target.closest('.play-toggle');
  if (toggle) {
    const paused = card.classList.toggle('is-paused');
    toggle.innerHTML = `${paused ? '▷' : 'Ⅱ'} <span>${paused ? 'Play' : 'Pause'}</span>`;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${card.querySelector('h2').textContent}`);
  }
  const copy = event.target.closest('.copy-button');
  if (copy) {
    const css = getSnippet(card.dataset.effect);
    try {
      await navigator.clipboard.writeText(css);
      copy.textContent = '✓ Copied!';
      document.querySelector('#status').textContent = `${card.querySelector('h2').textContent} CSS copied.`;
      setTimeout(() => { copy.innerHTML = '<span aria-hidden="true">▣</span> Copy CSS'; }, 1800);
    } catch {
      const dialog = document.querySelector('#copy-dialog');
      dialog.querySelector('textarea').value = css;
      dialog.showModal();
      dialog.querySelector('textarea').select();
    }
  }
});
document.querySelector('#close-dialog').addEventListener('click', () => document.querySelector('#copy-dialog').close());
// Re-entering the viewport replays the reveal; CSS owns the animation itself.
const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: 0.35 });
observer.observe(document.querySelector('.preview-reveal'));
