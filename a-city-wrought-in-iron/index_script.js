const images = [
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

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    'title cards/title card 1.jpg',
    // ...
  ];

  let index = 0;
  const img = document.getElementById('swapper');

  setInterval(() => {
    img.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
      img.style.opacity = 1;
    }, 500); // match CSS transition duration (0.5s = 500ms)
  }, 1250);
});
