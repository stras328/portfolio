document.addEventListener("DOMContentLoaded", () => {
  const images = [
    'Title Cards/title card 1.JPG', // include the starting image!
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

  let index = 1; // start at 1, since the first image is already shown
  const img = document.getElementById('swapper');

  setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = images[index];
      img.style.opacity = 1;
      index = (index + 1) % images.length;
    }, 500); // match CSS fade duration
  }, 1250);
});
