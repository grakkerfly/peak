// Elementos principais
const hero = document.querySelector(".hero");
const title = document.querySelector(".title");

// Efeito de movimento suave com mouse
let mouseX = 0;
let mouseY = 0;
let heroX = 0;
let heroY = 0;
let titleX = 0;
let titleY = 0;


// Animação suave
function animate() {
  // Suavização do movimento
  heroX += (mouseX - heroX) * 0.1;
  heroY += (mouseY - heroY) * 0.1;
  titleX += (-mouseX/3 - titleX) * 0.1;
  titleY += (-mouseY/3 - titleY) * 0.1;
  
  // Aplica transformações
  if (hero) {
    hero.style.transform = `translate(${heroX}px, ${heroY}px)`;
  }
  
  if (title) {
    title.style.transform = `translate(${titleX}px, ${titleY}px)`;
  }
  
  requestAnimationFrame(animate);
}

// Inicia animação
animate();

// Função para copiar contrato
function copyCA() {
  const contractText = document.getElementById("ca").innerText;
  const copyBtn = document.querySelector('.copy-btn');
  
  navigator.clipboard.writeText(contractText)
    .then(() => {
      // Feedback visual
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <img src="images/icon-ca.png" alt="Copy" class="btn-icon">
        COPIED!
      `;
      copyBtn.style.background = 'rgba(76, 175, 80, 0.2)';
      copyBtn.style.borderColor = '#4CAF50';
      
      // Efeito de partículas simples
      createParticles(copyBtn);
      
      // Restaura após 1.5 segundos
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

// Função de partículas simples
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
    
    // Animação
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

// Efeito hover nos links
const links = document.querySelectorAll('.link');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0) scale(1)';
  });
});

// Efeito de entrada na página
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);
});

// Otimização de performance - reduzir movimento em scroll
let isScrolling;
window.addEventListener('scroll', () => {
  // Limpa timeout anterior
  clearTimeout(isScrolling);
  
  // Pausa movimento durante scroll
  const originalMouseX = mouseX;
  const originalMouseY = mouseY;
  mouseX = mouseX * 0.3;
  mouseY = mouseY * 0.3;
  
  // Restaura após scroll parar
  isScrolling = setTimeout(() => {
    mouseX = originalMouseX;
    mouseY = originalMouseY;
  }, 100);
});