
// Theme toggle and persistence
const themeToggle = () => {
  const isDark = document.documentElement.classList.toggle('light');
  localStorage.setItem('site-theme', isDark ? 'light' : 'dark');
  // change icon
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = isDark ? '🌞' : '🌙';
};

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('site-theme');
  if(saved === 'light') document.documentElement.classList.add('light');
  const btn = document.getElementById('themeToggle');
  if(btn) btn.addEventListener('click', themeToggle);
});

// Leaderboard helper (global)
window.Leaderboard = {
  key: 'solar_adventure_leaderboard_v1',
  saveScore(gameId, name, score){
    const list = JSON.parse(localStorage.getItem(this.key) || '[]');
    list.push({gameId, name:name||'Player', score: Number(score), t: Date.now()});
    // keep top 50 sorted desc
    list.sort((a,b)=>b.score-a.score);
    localStorage.setItem(this.key, JSON.stringify(list.slice(0,50)));
  },
  getAll(){ return JSON.parse(localStorage.getItem(this.key) || '[]'); },
  getForGame(id){ return this.getAll().filter(x=>x.gameId===id); },
  clear(){ localStorage.removeItem(this.key); }
};
