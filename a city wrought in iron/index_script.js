const images = [
  'title cards/title card 1.jpg',
  'title cards/title card 2.jpg',
  'title cards/title card 3.jpg',
  'title cards/title card 5.jpg',
  'title cards/title card 6.jpg',
  'title cards/title card 7.jpg',
  'title cards/title card 8.jpg',
  'title cards/title card 9.jpg',
  'title cards/title card 11.jpg',
  'title cards/title card 12.jpg',
  'title cards/title card 13.jpg',
  'title cards/title card 14.jpg',
  'title cards/title card 15.jpg',
  'title cards/title card 16.jpg',
];

let index = 0;
const img = document.getElementById('swapper');

setInterval(() => {
  img.style.opacity = 0;

  // Wait for fade out (500ms), then swap and fade in
  setTimeout(() => {
    index = (index + 1) % images.length;
    img.src = images[index];
    img.style.opacity = 1;
  }, 0); // match your CSS transition time
}, 1250); // change image every 1.25 seconds (adjust as needed)
