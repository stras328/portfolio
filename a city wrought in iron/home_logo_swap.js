// Swaps logo image on hover through icon hover PNGs
const logo = document.querySelector('img[alt="Site Logo"]');
const hoverImages = [
  'icon hover/icon_hover_1.PNG',
  'icon hover/icon_hover_2.JPG',
  'icon hover/icon_hover_3.PNG',
  'icon hover/icon_hover_4.PNG',
  'icon hover/icon_hover_5.PNG',
  'icon hover/icon_hover_6.PNG',
  'icon hover/icon_hover_7.PNG',
];
let hoverIndex = 0;
let swapInterval;
const originalSrc = logo.src;

function startLogoSwap() {
  swapInterval = setInterval(() => {
    hoverIndex = (hoverIndex + 1) % hoverImages.length;
    logo.src = hoverImages[hoverIndex];
  }, 500);
}

function stopLogoSwap() {
  clearInterval(swapInterval);
  logo.src = originalSrc;
  hoverIndex = 0;
}

logo.addEventListener('mouseenter', startLogoSwap);
logo.addEventListener('mouseleave', stopLogoSwap);
