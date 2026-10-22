// Arrow animation
let arrows = document.querySelector(".arrows");
let arrowDirections = [
	'arrow-n.gif',
	'arrow-ne.gif',
	'arrow-e.gif',
	'arrow-se.gif',
	'arrow-s.gif',
	'arrow-sw.gif',
	'arrow-nw.gif',
]
let arrowTemp = '';
for (let i=0; i<20; i++) {
	arrowTemp += `
		<img src='assets/ui/${arrowDirections[Math.floor(Math.random()*arrowDirections.length)]}'>
	`
}
arrows.innerHTML += arrowTemp;
for (let arrow of arrows.querySelectorAll("img")) {
	arrowLoop(arrow);
}
function arrowLoop(arrow) {
	randomizeArrow(arrow);
	setTimeout(() => {
		arrowLoop(arrow);
	}, Math.floor(Math.random()*1000+500))
}
function randomizeArrow(arrow) {
	arrow.style.opacity = (Math.random()).toFixed(1);
	arrow.style.transform = `
		scale(${Math.random()*.5+.5})
		rotate(${Math.floor(Math.random()*360)}deg)
		translate(${Math.floor(Math.random()*100-50)}vw, ${Math.floor(Math.random()*100-50)}dvh)
	`
	arrow.style.filter = `blur(${Math.floor(Math.random()*2)}px)`;
}

// Title animation
for (let line of document.querySelectorAll('.title-line')) {
	randomizeTitle(line);
}
function randomizeTitle(line) {
	line.style.transform = `translateX(${Math.floor(Math.random()*15-7.5)}vw) rotate(${Math.floor(Math.random()*20-10)}deg) scale(${(Math.random()*3+1).toFixed(2)})`;
	line.style.filter = `blur(${(Math.random()*.5).toFixed(1)}px)`;
	line.style.opacity = (Math.random()*.1+.9).toFixed(1);
	setTimeout(() => {
		randomizeTitle(line)
	}, Math.floor(Math.random()*1000+500))
}

// Rotate links
for (let link of document.querySelectorAll('.catalog-link')) {
	link.style.transform = `rotate(${Math.floor(Math.random()*10-5)}deg)`;
}

// Randomized, draggable image gallery
const imageGallery = document.querySelector('.image-gallery');
const galleryDialog = document.querySelector('.gallery-dialog');
const galleryDialogImage = document.querySelector('.gallery-dialog-image');
const galleryDialogCaption = document.querySelector('.gallery-dialog-caption');

if (imageGallery && galleryDialog instanceof HTMLDialogElement &&
	galleryDialogImage instanceof HTMLImageElement &&
	galleryDialogCaption instanceof HTMLElement) {
const galleryTapeImages = [
	'assets/tape/ginghamtape.png',
	'assets/tape/musictape.png',
	'assets/tape/polkadottape.png',
	'assets/tape/startape.png',
];
const galleryImages = [
		{ src: 'assets/who i am today/julia_and_eddie.jpg', alt: 'my sister\'s wedding', caption: 'photographed my wonderful sister\'s wedding this summer! <3 <br> <a href="https://sophiastrange.pixieset.com/juliaandeddie/" target="_blank" rel="noopener noreferrer">view the full gallery here</a>.', aspectRatio: 3600 / 2399, sizeMultiplier: 1.2, popupSize: 'landscape-large' },
		{ src: 'assets/who i am today/felix.jpg', alt: 'HOLLOW', caption: 'HOLLOW <br> a Stray Kids fanart piece.', aspectRatio: 2474 / 3299, popupSize: 'portrait-large' },
		{ src: 'assets/who i am today/matt_maltese.jpg', alt: 'Matt Maltese', caption: 'Matt Maltese at Warsaw for NYS Music. <br> <a href="https://nysmusic.com/2025/10/02/matt-maltese-enchants-brooklyn/" target="_blank" rel="noopener noreferrer">view the full gallery here</a>.', aspectRatio: 3382 / 5074, popupSize: 'portrait-large' },
		{ src: 'assets/who i am today/superstar cropped.png', alt: 'SUPERSTAR', caption: 'SUPERSTAR: a hypothetical comeback <br> album treatment for the group Stray Kids. <br> <a href="https://sjhstrange.studio/gallery_SUPERSTAR.html" target="_blank" rel="noopener noreferrer">view the project here</a>.', aspectRatio: 1 },
		{ src: 'assets/who i am today/xikers.jpg', alt: 'Xikers', caption: 'XIKERS at King\'s Theater  for NYS Music. <br> <a href="https://nysmusic.com/2025/05/16/xikers-electrifies-kings-theatre/" target="_blank" rel="noopener noreferrer">view the full gallery here</a>.', aspectRatio: 5184 / 3456, sizeMultiplier: 1.2, popupSize: 'landscape-large' },
		{ src: 'assets/who i am today/bees_03.png', alt: 'the reign of the bee', caption: 'the reign of the bee: a series of illustrations <br> for a class on honeybee colonies! <br> <a href="https://sjhstrange.studio/gallery_the_reign_of_bees.html" target="_blank" rel="noopener noreferrer">view the project here</a>.', aspectRatio: 2480 / 3508, popupSize: 'portrait-large' },
		{ src: 'assets/who i am today/will_i_ever.gif', alt: 'will i ever see you again?', caption: 'will i ever see you again? <br> a Red Velvet fanart piece.', aspectRatio: 612 / 792 },
		{ src: 'assets/who i am today/se_so_neon.jpg', alt: 'SE SO NEON at the brooklyn steel', caption: 'SE SO NEON at the Brooklyn Steel for NYS Music. <br> <a href="https://nysmusic.com/2025/09/14/se-so-neon-rocks-brooklyn-steel/" target="_blank" rel="noopener noreferrer">view the full gallery here</a>.', aspectRatio: 5088 / 3392, sizeMultiplier: 1.2, popupSize: 'landscape-large' },
		{ src: 'assets/who i am today/home cropped.png', alt: 'home', caption: 'home: a book designed around the concept of home amidst a lifetime of moving. <br> <a href="https://sjhstrange.studio/gallery_home.html" target="_blank" rel="noopener noreferrer">view the project here</a>.', aspectRatio: 1 },
	];
	const galleryCards = [];
	let galleryZIndex = 1;

	function randomBetween(min, max) {
		return Math.random() * (max - min) + min;
	}

	function positionGalleryCard(card) {
		const containerWidth = imageGallery.clientWidth;
		const containerHeight = imageGallery.clientHeight;
		const width = Number(card.dataset.width);
		const height = Number(card.dataset.height);
		const maxLeft = Math.max(0, containerWidth - width);
		const maxTop = Math.max(0, containerHeight - height);
		const copyRect = document.querySelector('#paths .item-copy-centered').getBoundingClientRect();
		const galleryRect = imageGallery.getBoundingClientRect();
		const gap = 30;
		const clearZone = {
			left: copyRect.left - galleryRect.left - gap,
			top: copyRect.top - galleryRect.top - gap,
			right: copyRect.right - galleryRect.left + gap,
			bottom: copyRect.bottom - galleryRect.top + gap,
		};
		const availableZones = [
			{ left: 0, top: 0, right: maxLeft, bottom: Math.min(maxTop, clearZone.top - height) },
			{ left: 0, top: Math.max(0, clearZone.bottom), right: maxLeft, bottom: maxTop },
			{ left: 0, top: Math.max(0, clearZone.top), right: Math.min(maxLeft, clearZone.left - width), bottom: Math.min(maxTop, clearZone.bottom) },
			{ left: Math.max(0, clearZone.right), top: Math.max(0, clearZone.top), right: maxLeft, bottom: Math.min(maxTop, clearZone.bottom) },
		].filter((zone) => zone.right >= zone.left && zone.bottom >= zone.top);
		let position = { left: 0, top: 0 };
		let foundPosition = false;

		for (let attempt = 0; attempt < 160; attempt++) {
			const candidate = {
				left: Math.floor(Math.random() * (maxLeft + 1)),
				top: Math.floor(Math.random() * (maxTop + 1)),
			};
			const overlapsText = candidate.left < clearZone.right &&
				candidate.left + width > clearZone.left &&
				candidate.top < clearZone.bottom &&
				candidate.top + height > clearZone.top;
			const overlapsCard = galleryCards.some((other) => {
				if (other === card) return false;
				const otherLeft = other.offsetLeft;
				const otherTop = other.offsetTop;
				const otherRight = otherLeft + other.offsetWidth;
				const otherBottom = otherTop + other.offsetHeight;
				return candidate.left < otherRight + 12 &&
					candidate.left + width + 12 > otherLeft &&
					candidate.top < otherBottom + 12 &&
					candidate.top + height + 12 > otherTop;
			});

			if (!overlapsText && !overlapsCard) {
				position = candidate;
				foundPosition = true;
				break;
			}
		}

		if (!foundPosition) {
			const zone = availableZones[Math.floor(Math.random() * availableZones.length)];
			if (zone) {
				position = {
					left: Math.floor(randomBetween(zone.left, zone.right + 1)),
					top: Math.floor(randomBetween(zone.top, zone.bottom + 1)),
				};
			} else {
				position = {
					left: Math.min(maxLeft, Math.max(0, clearZone.left - width)),
					top: maxTop,
				};
			}
		}

		card.style.left = `${position.left}px`;
		card.style.top = `${position.top}px`;
		card.style.transform = `rotate(${Math.floor(randomBetween(-12, 13))}deg)`;
	}

	function createGalleryCard(index) {
		const card = document.createElement('button');
		const image = document.createElement('img');
		const tape = document.createElement('img');
		const galleryImage = galleryImages[index];

		card.className = 'gallery-card';
		card.type = 'button';
		card.setAttribute('aria-label', `Open image: ${galleryImage.alt}`);
		card.style.zIndex = String(++galleryZIndex);
		image.className = 'gallery-thumbnail';
		image.src = galleryImage.src;
		image.alt = galleryImage.alt;
		image.draggable = false;
		tape.className = 'gallery-tape';
		tape.src = galleryTapeImages[index % galleryTapeImages.length];
		tape.dataset.placement = index % 2 === 0 ? 'center' : 'corner';
		if (index % galleryTapeImages.length === 1 || index % galleryTapeImages.length === 3) {
			tape.dataset.size = 'large';
		}
		tape.alt = '';
		tape.setAttribute('aria-hidden', 'true');
		tape.draggable = false;
		card.append(image, tape);

		card.addEventListener('pointerdown', (event) => {
			if (event.button !== 0) return;
			card.dataset.dragging = 'true';
			card.dataset.moved = 'false';
			card.style.zIndex = String(++galleryZIndex);
			card.setPointerCapture(event.pointerId);
			card.dataset.pointerX = String(event.clientX);
			card.dataset.pointerY = String(event.clientY);
			card.dataset.left = String(card.offsetLeft);
			card.dataset.top = String(card.offsetTop);
			event.preventDefault();
		});

		card.addEventListener('pointermove', (event) => {
			if (card.dataset.dragging !== 'true') return;
			const deltaX = event.clientX - Number(card.dataset.pointerX);
			const deltaY = event.clientY - Number(card.dataset.pointerY);
			if (Math.abs(deltaX) + Math.abs(deltaY) > 5) {
				card.dataset.moved = 'true';
			}
			const maxLeft = Math.max(0, imageGallery.clientWidth - card.offsetWidth);
			const maxTop = Math.max(0, imageGallery.clientHeight - card.offsetHeight);
			const left = Math.min(maxLeft, Math.max(0, Number(card.dataset.left) + deltaX));
			const top = Math.min(maxTop, Math.max(0, Number(card.dataset.top) + deltaY));
			card.style.left = `${left}px`;
			card.style.top = `${top}px`;
		});

		function stopDragging() {
			delete card.dataset.dragging;
		}

		card.addEventListener('pointerup', stopDragging);
		card.addEventListener('pointercancel', stopDragging);
		card.addEventListener('lostpointercapture', stopDragging);
		card.addEventListener('click', () => {
			if (card.dataset.moved === 'true') {
				delete card.dataset.moved;
				return;
			}
			galleryDialogImage.src = image.src;
			galleryDialogImage.alt = image.alt;
			galleryDialogCaption.innerHTML = galleryImage.caption;
			galleryDialog.dataset.orientation = galleryImage.aspectRatio > 1 ? 'landscape' : 'portrait';
			galleryDialog.dataset.size = galleryImage.popupSize || 'default';
			galleryDialog.showModal();
			galleryDialog.focus({ preventScroll: true });
		});
		return card;
	}
	function initializeGallery() {
		for (const [index, card] of galleryCards.entries()) {
			const galleryImage = galleryImages[index];
			const maxWidth = Math.min(185, Math.max(105, window.innerWidth * 0.17));
			const width = Math.floor(randomBetween(maxWidth * 0.72, maxWidth) * 1.2 * (galleryImage.sizeMultiplier || 1));
			const height = Math.floor((width - 16) / galleryImage.aspectRatio);
			card.dataset.width = String(width);
			card.dataset.height = String(height + 16);
			card.style.width = `${width}px`;
			card.style.height = `${height + 16}px`;
			positionGalleryCard(card);
			card.style.zIndex = String(++galleryZIndex);
		}
	}

	function repositionGallery() {
		for (const card of galleryCards) {
			positionGalleryCard(card);
		}
	}

	galleryDialog.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			galleryDialog.close();
		}
	});
	galleryDialog.addEventListener('click', (event) => {
		if (event.target === galleryDialog) galleryDialog.close();
	});

	for (let index = 0; index < galleryImages.length; index++) {
		const card = createGalleryCard(index);
		imageGallery.appendChild(card);
		galleryCards.push(card);
	}

	initializeGallery();
	window.addEventListener('resize', repositionGallery);
}

	const resumeLink = document.querySelector('.resume-link');
	const resumeDialog = document.querySelector('.resume-dialog');
	if (resumeLink instanceof HTMLAnchorElement && resumeDialog instanceof HTMLDialogElement) {
		resumeLink.addEventListener('click', (event) => {
			event.preventDefault();
			resumeDialog.showModal();
			resumeDialog.focus({ preventScroll: true });
		});
		resumeDialog.addEventListener('click', (event) => {
			if (event.target === resumeDialog) resumeDialog.close();
		});
	}

	const folderGallery = document.querySelector('.folder-gallery');
const folderDialog = document.querySelector('.folder-dialog');
const folderDialogTitle = document.querySelector('.folder-dialog-title');
const folderDialogWorkImage = document.querySelector('.folder-dialog-work-image');
const folderDialogCopy = document.querySelector('.folder-dialog-copy');
const folderStoreRanking = document.querySelector('.store-ranking');
const folderPhotoGallery = document.querySelector('.folder-photo-gallery');
if (folderGallery && folderDialog instanceof HTMLDialogElement &&
	folderDialogTitle instanceof HTMLElement && folderDialogWorkImage instanceof HTMLImageElement &&
	folderDialogCopy instanceof HTMLElement && folderStoreRanking instanceof HTMLElement &&
	folderPhotoGallery instanceof HTMLElement) {
	let activeFolderImage = null;
	let activeFolderImageSource = '';

	const rankingBody = folderStoreRanking.querySelector('tbody');
	const rankingAnnouncement = folderStoreRanking.querySelector('.store-ranking-announcement');
	const rankingTable = folderStoreRanking.querySelector('.store-ranking-table');
	if (rankingTable instanceof HTMLTableElement) {
		const syncRankingWidth = () => {
			if (window.matchMedia('(max-width: 600px)').matches) {
				folderStoreRanking.style.width = '100%';
				return;
			}
			const tableWidth = rankingTable.getBoundingClientRect().width;
			if (tableWidth > 0) folderStoreRanking.style.width = `${tableWidth}px`;
		};
		new ResizeObserver(syncRankingWidth).observe(rankingTable);
		window.addEventListener('resize', syncRankingWidth);
	}
	if (rankingBody && rankingAnnouncement instanceof HTMLElement) {
		const updateStoreRanking = () => {
			const rows = [...rankingBody.querySelectorAll('tr')];
			rows.forEach((row, index) => {
				const storeName = row.dataset.storeName || 'Record store';
				const rankingCell = row.querySelector('.store-ranking-controls');
				if (!rankingCell) return;

				rankingCell.replaceChildren();
				const rank = document.createElement('span');
				rank.className = 'store-rank';
				rank.textContent = `#${index + 1}`;
				rankingCell.appendChild(rank);

				const controls = document.createElement('span');
				controls.className = 'store-rank-buttons';
				for (const direction of ['up', 'down']) {
					const button = document.createElement('button');
					button.type = 'button';
					button.className = `store-rank-button store-rank-${direction}`;
					button.textContent = direction === 'up' ? '↑' : '↓';
					button.setAttribute('aria-label', `Move ${storeName} ${direction}`);
					button.disabled = direction === 'up' ? index === 0 : index === rows.length - 1;
					controls.appendChild(button);
				}
				rankingCell.appendChild(controls);
			});
		};

		updateStoreRanking();
		rankingBody.addEventListener('click', (event) => {
			if (!(event.target instanceof Element)) return;
			const button = event.target.closest('.store-rank-button');
			const row = button?.closest('tr');
			if (!(button instanceof HTMLButtonElement) || !(row instanceof HTMLTableRowElement)) return;

			const neighbor = button.classList.contains('store-rank-up')
				? row.previousElementSibling
				: row.nextElementSibling;
			if (!(neighbor instanceof HTMLTableRowElement)) return;

			const storeName = row.dataset.storeName || 'Record store';
			if (button.classList.contains('store-rank-up')) {
				rankingBody.insertBefore(row, neighbor);
			} else {
				rankingBody.insertBefore(neighbor, row);
			}
			updateStoreRanking();
			const newRank = [...rankingBody.querySelectorAll('tr')].indexOf(row) + 1;
			rankingAnnouncement.textContent = `${storeName} is now ranked #${newRank}.`;
		});
	}

	for (const folderButton of folderGallery.querySelectorAll('.folder-button')) {
		folderButton.addEventListener('click', () => {
			const folderImage = folderButton.querySelector('img');
			if (!(folderImage instanceof HTMLImageElement)) return;

			activeFolderImage = folderImage;
			activeFolderImageSource = folderImage.getAttribute('src') || '';
			folderImage.src = 'assets/manila folders/open.png';
			const showGallery = folderButton.dataset.folderGallery === 'boy-harsher';
			const showSpreadsheet = folderButton.dataset.folderContent === 'store-ranking';
			const showWorkPreview = !showGallery && !showSpreadsheet;
			const folderTitle = showSpreadsheet
				? 'WORKING WITH GRIDS'
				: folderButton.dataset.folderTitle || 'Work folder';
			const breakBefore = folderButton.dataset.folderTitleBreakBefore;
			const breakAfter = folderButton.dataset.folderTitleBreakAfter;
			const breakIndices = [
				breakBefore ? folderTitle.indexOf(breakBefore) : -1,
				breakAfter ? folderTitle.indexOf(breakAfter) + breakAfter.length : -1,
				folderButton.dataset.folderTitleAdditionalBreakBefore
					? folderTitle.indexOf(folderButton.dataset.folderTitleAdditionalBreakBefore)
					: -1,
			].filter((index) => index >= 0).sort((a, b) => a - b);
			let titleStart = 0;
			folderDialogTitle.replaceChildren();
			for (const breakIndex of breakIndices) {
				folderDialogTitle.append(
					document.createTextNode(folderTitle.slice(titleStart, breakIndex).trimEnd()),
					document.createElement('br'),
				);
				titleStart = breakIndex;
			}
			folderDialogTitle.append(document.createTextNode(folderTitle.slice(titleStart)));
			folderDialogCopy.hidden = showSpreadsheet;
			folderStoreRanking.hidden = !showSpreadsheet;
			folderPhotoGallery.hidden = !showGallery;
			folderDialogWorkImage.hidden = !showWorkPreview;
			if (showWorkPreview) {
				folderDialogWorkImage.src = folderButton.dataset.folderPreview || '';
				folderDialogWorkImage.alt = `${folderButton.dataset.folderTitle || 'Work folder'} preview`;
				folderDialog.dataset.layout = 'work';
			} else if (showSpreadsheet) {
				folderDialogWorkImage.removeAttribute('src');
				folderDialogWorkImage.alt = '';
				folderDialog.dataset.layout = 'ranking';
			} else {
				folderDialogWorkImage.removeAttribute('src');
				folderDialogWorkImage.alt = '';
				delete folderDialog.dataset.layout;
			}
			if (showGallery) {
				folderDialog.dataset.gallery = 'boy-harsher';
			} else {
				delete folderDialog.dataset.gallery;
			}
			folderDialog.showModal();
			folderDialog.focus({ preventScroll: true });
		});
	}

	folderDialog.addEventListener('close', () => {
		if (activeFolderImage instanceof HTMLImageElement) {
			activeFolderImage.src = activeFolderImageSource;
			activeFolderImage = null;
			activeFolderImageSource = '';
		}
		delete folderDialog.dataset.gallery;
		delete folderDialog.dataset.layout;
		folderDialogWorkImage.hidden = true;
		folderDialogWorkImage.removeAttribute('src');
		folderDialogWorkImage.alt = '';
		folderDialogCopy.hidden = false;
		folderStoreRanking.hidden = true;
		folderPhotoGallery.hidden = true;
	});
	folderDialog.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			folderDialog.close();
		}
	});
	folderDialog.addEventListener('click', (event) => {
		if (event.target === folderDialog) folderDialog.close();
	});
}

// Step-by-step scroll navigation
const sections = [...document.querySelectorAll('.panel')];
const arrowButtons = [...document.querySelectorAll('.continue-arrow')];
const heroIntroPage = document.querySelector('.hero-intro-page');
const heroLogoNext = document.querySelector('.hero-logo-next');
let isAnimating = false;

function getNavigationTargets() {
	if (window.matchMedia('(max-width: 600px)').matches &&
		heroIntroPage instanceof HTMLElement &&
		heroLogoNext instanceof HTMLElement) {
		const heroLogoPage = heroLogoNext.parentElement;
		const heroSection = document.querySelector('.hero-panel');
		if (heroLogoPage instanceof HTMLElement && heroSection instanceof HTMLElement) {
			return [
				heroLogoPage,
				heroIntroPage,
				...sections.filter((section) => section !== heroSection),
			];
		}
	}
	return sections;
}

function getCurrentSectionIndex() {
	const targets = getNavigationTargets();
	let currentIndex = 0;
	let smallestDistance = Number.POSITIVE_INFINITY;

	targets.forEach((target, index) => {
		const rect = target.getBoundingClientRect();
		const sectionMid = rect.top + rect.height / 2;
		const viewportMid = window.innerHeight / 2;
		const distance = Math.abs(sectionMid - viewportMid);

		if (distance < smallestDistance) {
			smallestDistance = distance;
			currentIndex = index;
		}
	});

	return currentIndex;
}

function updateArrowState() {
	const targets = getNavigationTargets();
	const currentIndex = getCurrentSectionIndex();
	const isFinalSection = currentIndex === targets.length - 1;
	const isMobile = window.matchMedia('(max-width: 600px)').matches;

	arrowButtons.forEach((button) => {
		const section = button.closest('.panel');
		const heroTarget = isMobile && section === document.querySelector('.hero-panel')
			? heroIntroPage
			: section;
		const targetIndex = heroTarget instanceof HTMLElement ? targets.indexOf(heroTarget) : -1;
		const isActive = targetIndex === currentIndex;
		const direction = isFinalSection ? '↑' : '↓';

		button.textContent = direction;
		button.setAttribute(
			'aria-label',
			isFinalSection ? 'Return to previous section' : 'Continue to next section'
		);
		button.style.visibility = isActive ? 'visible' : 'hidden';
		button.style.opacity = isActive ? '1' : '0';
		button.style.pointerEvents = isActive ? 'auto' : 'none';
	});
	if (heroLogoNext instanceof HTMLElement) {
		const heroLogoPage = heroLogoNext.parentElement;
		const isLogoPageActive = isMobile && heroLogoPage instanceof HTMLElement &&
			targets[currentIndex] === heroLogoPage;
		heroLogoNext.style.visibility = isLogoPageActive ? 'visible' : 'hidden';
		heroLogoNext.style.opacity = isLogoPageActive ? '1' : '0';
		heroLogoNext.style.pointerEvents = isLogoPageActive ? 'auto' : 'none';
	}
}

function goToSection(targetIndex) {
	const targets = getNavigationTargets();
	const safeIndex = Math.min(Math.max(targetIndex, 0), targets.length - 1);
	const target = targets[safeIndex];
	if (!target || isAnimating) return;

	isAnimating = true;
	target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	setTimeout(() => {
		isAnimating = false;
		updateArrowState();
	}, 650);
}

arrowButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const targets = getNavigationTargets();
		const currentIndex = getCurrentSectionIndex();
		const isFinalSection = currentIndex === targets.length - 1;
		const nextIndex = isFinalSection ? 0 : currentIndex + 1;
		goToSection(nextIndex);
	});
});

heroLogoNext?.addEventListener('click', () => {
	heroIntroPage?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('wheel', (event) => {
	const openDialog = document.querySelector('dialog[open]');
	if (openDialog) {
		const photoGallery = openDialog.querySelector('.folder-photo-gallery');
		const isOverPhotoGallery = photoGallery instanceof HTMLElement &&
			event.target instanceof Node && photoGallery.contains(event.target);
		if (!isOverPhotoGallery || Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
			event.preventDefault();
		}
		return;
	}
	const noteContent = event.target instanceof Element
		? event.target.closest('.paper-note-content')
		: null;
	if (noteContent instanceof HTMLElement) {
		const maxScroll = noteContent.scrollHeight - noteContent.clientHeight;
		const canScrollWithWheel = event.deltaY < 0
			? noteContent.scrollTop > 0
			: noteContent.scrollTop < maxScroll;
		if (canScrollWithWheel) return;
		event.preventDefault();
		return;
	}
	if (Math.abs(event.deltaY) < 10 || isAnimating) return;
	event.preventDefault();
	const currentIndex = getCurrentSectionIndex();
	const direction = event.deltaY > 0 ? 1 : -1;
	goToSection(currentIndex + direction);
}, { passive: false });

window.addEventListener('keydown', (event) => {
	if (document.querySelector('dialog[open]')) return;
	if (event.key === 'ArrowDown' || event.key === 'PageDown') {
		event.preventDefault();
		goToSection(getCurrentSectionIndex() + 1);
	}
	if (event.key === 'ArrowUp' || event.key === 'PageUp') {
		event.preventDefault();
		goToSection(getCurrentSectionIndex() - 1);
	}
});

window.addEventListener('scroll', updateArrowState, { passive: true });
window.addEventListener('resize', updateArrowState);

setTimeout(() => {
	updateArrowState();
}, 3000);