document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#828282',
    lineColor: '#6b6b6b',
    density: 15000,
    minSpeedX: 0.05,
    minSpeedY: 0.05,
    maxSpeedX: 0.3,
    maxSpeedY: 0.3,
    parallaxMultiplier: -10,
    proximity: 125,
    particleRadius: 5,
    lineWidth: 0.8
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);
