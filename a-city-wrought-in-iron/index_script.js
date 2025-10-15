document.addEventListener("DOMContentLoaded", () => {
  const images = [
    'Title Cards/title card 2.JPG',
    'Title Cards/title card 3.JPG',
    'Title Cards/title card 5.JPG',
    'Title Cards/title card 6.JPG',
    'Title Cards/title card 7.JPG',
    'Title Cards/title card 8.JPG',
    'Title Cards/title card 9.JPG',
    'Title Cards/title card 11.JPG',
    'Title Cards/title card 12.JPG',
    'Title Cards/title card 13.JPG',
    'Title Cards/title card 14.JPG',
    'Title Cards/title card 15.JPG',
    'Title Cards/title card 16.JPG',
  ];

  let index = 0;
  const img = document.getElementById('swapper');

  setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
      img.style.opacity = 1;
    }, 500); // match CSS fade duration
  }, 1250);
});
