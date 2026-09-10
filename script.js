'use strict';
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const video = document.querySelector('#laser-pup');
const videoToggle = document.querySelector('#video-toggle');
let videoWanted = !motion.matches;
function updateVideoControl() {
  videoToggle.textContent = video.paused ? '▶' : 'Ⅱ';
  videoToggle.setAttribute('aria-label', video.paused ? 'Play animation' : 'Pause animation');
  videoToggle.setAttribute('aria-pressed', String(!video.paused));
}
async function playVideo() { try { await video.play(); } catch { updateVideoControl(); } }
video.addEventListener('play', updateVideoControl);
video.addEventListener('pause', updateVideoControl);
videoToggle.addEventListener('click', () => {
  videoWanted = video.paused;
  if (videoWanted) playVideo(); else video.pause();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && videoWanted && !document.hidden) playVideo();
    else video.pause();
  }, {threshold: 0.1}).observe(video);
} else if (videoWanted) playVideo();
document.addEventListener('visibilitychange', () => { if (document.hidden) { video.pause(); audio.pause(); } });
motion.addEventListener('change', () => { if (motion.matches) { videoWanted = false; video.pause(); } });


const prompts = [
  'Write a melody using only three notes. Make the silence do the rest.',
  'Take a familiar chord progression. Change just one note in every chord.',
  'Play a bright melody as slowly as you can. Find the melancholy hiding inside it.',
  'Write a call and response between your lowest note and your highest.',
  'Start with a rhythm you can tap on a table. Let the pitches arrive later.',
  'Make a four-bar phrase. Repeat it three times, changing only the ending.',
  'Turn a sentence from the nearest book into a rhythm. Build a melody around it.',
  'Play something gentle in an unusual meter. Keep it human.',
  'Write a tune that ends where you expected it to begin.',
  'Choose one open string as a drone. Find a small melody above it.'
];
let promptIndex = 0;
document.querySelector('#new-prompt').addEventListener('click', () => {
  promptIndex = (promptIndex + 1 + Math.floor(Math.random() * (prompts.length - 1))) % prompts.length;
  document.querySelector('#prompt').textContent = prompts[promptIndex];
});

const audio = document.querySelector('#preview-audio');
const status = document.querySelector('#audio-status');
const music = document.querySelector('#music');
const playButtons = [...document.querySelectorAll('.play-preview')];
let tracks, activeTrack = -1, requestId = 0;
const tracksReady = fetch('assets/music.json').then(response => {
  if (!response.ok) throw new Error('Music metadata unavailable');
  return response.json();
}).then(data => { tracks = data; }).catch(() => {
  status.textContent = 'Previews are unavailable. You can still listen through the Apple Music links.';
  playButtons.forEach(button => { button.disabled = true; });
});
function syncAudio() {
  playButtons.forEach((button,index) => {
    const playing = index === activeTrack && !audio.paused;
    button.setAttribute('aria-pressed',String(playing));
    button.querySelector('span').textContent = playing ? 'Ⅱ' : '▶';
    if (tracks) button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${tracks[index].track} preview`);
  });
}
playButtons.forEach((button,index) => button.addEventListener('click', async () => {
  const thisRequest = ++requestId;
  await tracksReady;
  if (!tracks || thisRequest !== requestId) return;
  if (activeTrack === index && !audio.paused) { audio.pause(); return; }
  if (activeTrack !== index) {
    audio.pause();
    activeTrack = index;
    audio.src = tracks[index].preview;
  }
  status.textContent = `Loading ${tracks[index].track}…`;
  music.dataset.playing = tracks[index].slug;
  try {
    await audio.play();
    if (thisRequest === requestId) status.textContent = `Playing “${tracks[index].track}” · ${tracks[index].artist} · Apple Music preview`;
  } catch {
    if (thisRequest === requestId) status.textContent = 'This preview could not play. Use the Apple Music link to listen.';
  }
  syncAudio();
}));
audio.addEventListener('play', syncAudio);
audio.addEventListener('pause', () => {
  syncAudio();
  if (tracks && activeTrack >= 0) status.textContent = `Paused · ${tracks[activeTrack].track}`;
});
audio.addEventListener('ended', () => { syncAudio(); status.textContent = 'Preview finished. Hear the full track on Apple Music.'; });
audio.addEventListener('error', () => { syncAudio(); status.textContent = 'This preview is unavailable. Use the Apple Music link to listen.'; });

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.video-stage,.record-art').forEach(surface => {
    surface.addEventListener('pointermove', event => {
      if (motion.matches) return;
      const rect = surface.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      surface.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
    });
    surface.addEventListener('pointerleave', () => { surface.style.transform = ''; });
  });
}
