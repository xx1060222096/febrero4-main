const panel = document.getElementById('panel');
const titleBtn = document.getElementById('titleBtn');
const timeEl = document.getElementById('time');
const menuButtons = Array.from(document.querySelectorAll('.menu-btn'));

async function fetchContent(view) {
  const url = `/api/content?view=${encodeURIComponent(view)}`;
  const res = await fetch(url, { headers: { 'Accept': 'text/html' } });
  if (!res.ok) throw new Error(res.status);
  return await res.text();
}

async function show(view) {
  try {
    const html = await fetchContent(view);
    panel.innerHTML = html;
    menuButtons.forEach(b => b.classList.toggle('active', b.dataset.view === view));
  } catch (err) {
    panel.innerHTML = '';
    menuButtons.forEach(b => b.classList.remove('active'));
    console.warn('fetch failed (mock ok):', err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  panel.innerHTML = '';
  menuButtons.forEach(b => b.classList.toggle('active', b.dataset.view === 'homepage'));
});

menuButtons.forEach(b => b.addEventListener('click', () => show(b.dataset.view)));
titleBtn.addEventListener('click', () => {
  panel.innerHTML = '';
  menuButtons.forEach(b => b.classList.toggle('active', b.dataset.view === 'homepage'));
});

function updateTime() {
  const now = new Date();
  timeEl.textContent = now.toLocaleString('es-ES', {
    hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit',
    year:'numeric', month:'2-digit', day:'2-digit'
  });
}
setInterval(updateTime, 1000);
updateTime();
