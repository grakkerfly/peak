// Main elements
const hero = document.querySelector(".hero");
const title = document.querySelector(".title");

// Smooth mouse movement effect
let mouseX = 0;
let mouseY = 0;
let heroX = 0;
let heroY = 0;
let titleX = 0;
let titleY = 0;

// Meme Gallery variables
const memeModal = document.getElementById('memeModal');
const memeViewerModal = document.getElementById('memeViewerModal');
const memeGalleryBtn = document.getElementById('memeGalleryBtn');
const closeModalBtn = document.querySelector('.close-modal');
const closeViewerBtn = document.querySelector('.close-viewer');
const memeGrid = document.getElementById('memeGrid');
const fullMemeImage = document.getElementById('fullMemeImage');

// Meme navigation variables
let currentMemeIndex = 1;
const totalMemes = 22;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  // Calculate relative position from center (-1 to 1)
  mouseX = (e.clientX - centerX) / 100;
  mouseY = (e.clientY - centerY) / 100;
});

// Smooth animation
function animate() {
  // Smooth movement
  heroX += (mouseX - heroX) * 0.1;
  heroY += (mouseY - heroY) * 0.1;
  titleX += (-mouseX/3 - titleX) * 0.1;
  titleY += (-mouseY/3 - titleY) * 0.1;
  
  // Apply transformations
  if (hero) {
    hero.style.transform = `translate(${heroX}px, ${heroY}px)`;
  }
  
  if (title) {
    title.style.transform = `translate(${titleX}px, ${titleY}px)`;
  }
  
  requestAnimationFrame(animate);
}

// Start animation
animate();

// Function to copy contract
function copyCA() {
  const contractText = document.getElementById("ca").innerText;
  const copyBtn = document.querySelector('.copy-btn');
  
  navigator.clipboard.writeText(contractText)
    .then(() => {
      // Visual feedback
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <img src="images/icon-ca.png" alt="Copy" class="btn-icon">
        COPIED!
      `;
      copyBtn.style.background = 'rgba(76, 175, 80, 0.2)';
      copyBtn.style.borderColor = '#4CAF50';
      
      // Simple particle effect
      createParticles(copyBtn);
      
      // Restore after 1.5 seconds
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
      }, 1500);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      copyBtn.innerHTML = `
        <img src="images/icon-ca.png" alt="Copy" class="btn-icon">
        ERROR
      `;
      copyBtn.style.background = 'rgba(244, 67, 54, 0.2)';
      copyBtn.style.borderColor = '#F44336';
      
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
      }, 1500);
    });
}

// Simple particle function
function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#fff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.boxShadow = '0 0 10px #fff';
    
    document.body.appendChild(particle);
    
    // Animation
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    let opacity = 1;
    let life = 30; // frames
    
    function updateParticle() {
      particle.style.left = `${parseFloat(particle.style.left) + vx}px`;
      particle.style.top = `${parseFloat(particle.style.top) + vy}px`;
      opacity -= 0.03;
      particle.style.opacity = opacity;
      
      life--;
      if (life > 0 && opacity > 0) {
        requestAnimationFrame(updateParticle);
      } else {
        particle.remove();
      }
    }
    
    requestAnimationFrame(updateParticle);
  }
}

// Meme Gallery Functions
function loadMemeGallery() {
  // Clear grid
  memeGrid.innerHTML = '';
  
  // Create meme items
  for (let i = 1; i <= totalMemes; i++) {
    const memeItem = document.createElement('div');
    memeItem.className = 'meme-item';
    memeItem.dataset.index = i;
    
    const img = document.createElement('img');
    img.src = `images/memes/${i}.png`;
    img.alt = `Meme ${i}`;
    img.loading = 'lazy';
    
    // Add error handling for missing images
    img.onerror = function() {
      this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23222"/><text x="100" y="100" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dy=".3em">Meme ${i}</text></svg>';
    };
    
    memeItem.appendChild(img);
    memeGrid.appendChild(memeItem);
    
    // Click to view full meme
    memeItem.addEventListener('click', () => {
      viewFullMeme(i);
    });
  }
}

function viewFullMeme(index) {
  currentMemeIndex = index;
  fullMemeImage.src = `images/memes/${index}.png`;
  fullMemeImage.alt = `Meme ${index}`;
  
  // Add error handling
  fullMemeImage.onerror = function() {
    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23222"/><text x="300" y="300" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Meme ${index} not found</text></svg>';
  };
  
  openMemeViewer();
}

// Navigation functions
function navigateToPreviousMeme() {
  if (currentMemeIndex > 1) {
    viewFullMeme(currentMemeIndex - 1);
    updateNavigationButtons();
  }
}

function navigateToNextMeme() {
  if (currentMemeIndex < totalMemes) {
    viewFullMeme(currentMemeIndex + 1);
    updateNavigationButtons();
  }
}

function openMemeGallery() {
  memeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Load gallery if not already loaded
  if (memeGrid.children.length === 0) {
    loadMemeGallery();
  }
}

function closeMemeGallery() {
  memeModal.classList.remove('active');
  document.body.style.overflow = '';
}

function openMemeViewer() {
  memeViewerModal.classList.add('active');
  addNavigationButtons();
  updateNavigationButtons();
}

function closeMemeViewer() {
  memeViewerModal.classList.remove('active');
}

// Add navigation buttons to meme viewer
function addNavigationButtons() {
  const viewerContent = document.querySelector('.meme-viewer-content');
  
  // Remove existing buttons if they exist
  const existingButtons = viewerContent.querySelectorAll('.nav-button');
  existingButtons.forEach(button => button.remove());
  
  // Create previous button
  const prevButton = document.createElement('button');
  prevButton.className = 'nav-button prev';
  prevButton.innerHTML = '←';
  prevButton.title = 'Previous meme (Left Arrow)';
  prevButton.addEventListener('click', navigateToPreviousMeme);
  
  // Create next button
  const nextButton = document.createElement('button');
  nextButton.className = 'nav-button next';
  nextButton.innerHTML = '→';
  nextButton.title = 'Next meme (Right Arrow)';
  nextButton.addEventListener('click', navigateToNextMeme);
  
  // Add buttons to viewer
  viewerContent.appendChild(prevButton);
  viewerContent.appendChild(nextButton);
}

// Update navigation buttons state
function updateNavigationButtons() {
  const prevButton = document.querySelector('.nav-button.prev');
  const nextButton = document.querySelector('.nav-button.next');
  
  if (prevButton) {
    prevButton.disabled = currentMemeIndex <= 1;
  }
  
  if (nextButton) {
    nextButton.disabled = currentMemeIndex >= totalMemes;
  }
}

// Hover effect on links
const links = document.querySelectorAll('.link');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0) scale(1)';
  });
});

// Page entry effect
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);
  
  // Initialize meme gallery
  loadMemeGallery();
});

// Performance optimization - reduce movement during scroll
let isScrolling;
window.addEventListener('scroll', () => {
  // Clear previous timeout
  clearTimeout(isScrolling);
  
  // Pause movement during scroll
  const originalMouseX = mouseX;
  const originalMouseY = mouseY;
  mouseX = mouseX * 0.3;
  mouseY = mouseY * 0.3;
  
  // Restore after scrolling stops
  isScrolling = setTimeout(() => {
    mouseX = originalMouseX;
    mouseY = originalMouseY;
  }, 100);
});

// Event Listeners for Meme Gallery
memeGalleryBtn.addEventListener('click', openMemeGallery);

closeModalBtn.addEventListener('click', closeMemeGallery);

closeViewerBtn.addEventListener('click', closeMemeViewer);

// Close modals when clicking outside
memeModal.addEventListener('click', (e) => {
  if (e.target === memeModal) {
    closeMemeGallery();
  }
});

memeViewerModal.addEventListener('click', (e) => {
  if (e.target === memeViewerModal) {
    closeMemeViewer();
  }
});

// Keyboard navigation for meme viewer
document.addEventListener('keydown', (e) => {
  // Check if meme viewer modal is active
  if (memeViewerModal.classList.contains('active')) {
    switch(e.key) {
      case 'ArrowLeft':
        navigateToPreviousMeme();
        e.preventDefault();
        break;
        
      case 'ArrowRight':
        navigateToNextMeme();
        e.preventDefault();
        break;
        
      case 'Escape':
        closeMemeViewer();
        e.preventDefault();
        break;
    }
  }
  // Check if meme gallery modal is active
  else if (memeModal.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeMemeGallery();
      e.preventDefault();
    }
  }
});