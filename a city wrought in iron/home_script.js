// Opens the modal
function openModal(imageSrc, text) {
  const modal = document.getElementById("imageModal");
  const mainImage = document.getElementById("modalImageMain");
  const fadeImage = document.getElementById("modalImageFade");
  const modalText = document.getElementById("modalText");

  mainImage.src = imageSrc;
  fadeImage.src = ""; // Reset fade image
  fadeImage.style.opacity = 0;
  // Split text into paragraphs by period followed by space (or end of string)
  const paragraphs = text.split(/\.\s+/).filter(Boolean);
  modalText.innerHTML = paragraphs.map(p => `<p>${p.trim()}.</p>`).join('');

  // Remove previous event listeners if any
  mainImage.onmouseover = null;
  mainImage.onmouseout = null;

  // Get hover image from arguments
  const args = arguments;
  const hoverImage = args.length > 2 ? args[2] : null;
  if (hoverImage) {
    mainImage.onmouseover = function() { crossFadeModalImage(hoverImage); };
    mainImage.onmouseout = restoreCrossFadeModalImage;
  }

  modal.style.display = "flex";
}

// Closes the modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// Cross-fade on hover
function crossFadeModalImage(fadeToSrc) {
  const fadeImage = document.getElementById("modalImageFade");
  fadeImage.src = fadeToSrc;
  fadeImage.style.opacity = 1;
}

function restoreCrossFadeModalImage() {
  const fadeImage = document.getElementById("modalImageFade");
  fadeImage.style.opacity = 0;
}

// closes when clicked outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('imageModal');
  const content = document.getElementById('modalContent');

  if (event.target === modal) {
    closeModal();
  }
});

function showSection(sectionId) {
  const sections = ['home', 'about', 'sources'];
  sections.forEach(id => {
    document.getElementById(id).style.display = (id === sectionId) ? 'block' : 'none';
    const menuLink = document.getElementById('menu-' + id);
    if (menuLink) {
      if (id === sectionId) {
        menuLink.classList.add('selected');
      } else {
        menuLink.classList.remove('selected');
      }
    }
  });
}
