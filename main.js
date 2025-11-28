// Countdown to 10 January at 15:00 local time
const target = new Date(new Date().getFullYear(), 0, 10, 15, 0, 0);
// If that date already passed this year, assume next year
if (target.getTime() < Date.now()) target.setFullYear(target.getFullYear() + 1);

const $ = id => document.getElementById(id);
function pad(n){return String(n).padStart(2,'0')}

function updateCountdown(){
  const now = new Date();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60)); diff -= hours*(1000*60*60);
  const minutes = Math.floor(diff / (1000*60)); diff -= minutes*(1000*60);
  const seconds = Math.floor(diff/1000);
  $('days').textContent = days;
  $('hours').textContent = pad(hours);
  $('minutes').textContent = pad(minutes);
  $('seconds').textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Simple carousel
const slides = document.getElementById('slides');
const imgs = slides.querySelectorAll('img');
const dots = document.getElementById('dots');
let idx = 0;

function renderDots(){
  dots.innerHTML = '';
  imgs.forEach((_, i)=>{
    const b = document.createElement('button');
    if(i===idx) b.classList.add('active');
    b.addEventListener('click', ()=> { go(i) });
    dots.appendChild(b);
  });
}

function go(i){
  idx = (i + imgs.length) % imgs.length;
  slides.style.transform = `translateX(-${idx * 100}%)`;
  renderDots();
}
document.getElementById('prev').addEventListener('click', ()=> go(idx-1));
document.getElementById('next').addEventListener('click', ()=> go(idx+1));
renderDots();

// Auto-advance every 5s, pause on hover
let auto = setInterval(()=> go(idx+1), 5000);
const carousel = document.getElementById('carousel');
carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
carousel.addEventListener('mouseleave', ()=> { clearInterval(auto); auto = setInterval(()=> go(idx+1),5000); });

