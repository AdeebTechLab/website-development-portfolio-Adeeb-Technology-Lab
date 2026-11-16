// ==========================================
// 1. THREE.JS 3D INTERACTIVE ANIMATED BACKGROUND
// ==========================================
(function initThreeBackground() {
  const container = document.getElementById('three-bg-canvas');
  if (!container) return;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const particleCount = 130;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 65;
    positions[i + 1] = (Math.random() - 0.5) * 65;
    positions[i + 2] = (Math.random() - 0.5) * 35;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMaterial = new THREE.PointsMaterial({
    color: 0x2563eb,
    size: 0.35,
    transparent: true,
    opacity: 0.45
  });
  const particleSystem = new THREE.Points(geometry, pMaterial);
  scene.add(particleSystem);

  // 3D Geometric Accents (Shifted to sides so text in the center remains 100% crisp and readable)
  // 1. Right Side Torus Knot (Wireframe Tube)
  const knotGeo = new THREE.TorusKnotGeometry(5.4, 0.85, 80, 14);
  const knotMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.16
  });
  const torusKnot = new THREE.Mesh(knotGeo, knotMat);
  // Shifted to the right side (x: 17, y: 5) away from centered text
  torusKnot.position.set(17, 5, -5);
  scene.add(torusKnot);

  // 2. Left Side Icosahedron Wireframe Sphere
  const icoGeo = new THREE.IcosahedronGeometry(6.5, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x4f46e5,
    wireframe: true,
    transparent: true,
    opacity: 0.13
  });
  const icoSphere = new THREE.Mesh(icoGeo, icoMat);
  // Positioned on the lower-left side to balance the composition
  icoSphere.position.set(-18, -6, -5);
  scene.add(icoSphere);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  });

  function updateMeshPositions() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      torusKnot.position.set(0, 16, -10);
      icoSphere.position.set(0, -18, -10);
    } else {
      torusKnot.position.set(16, 4, -4);
      icoSphere.position.set(-17, -6, -5);
    }
  }

  updateMeshPositions();

  function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.0035;
    torusKnot.rotation.y += 0.0055;

    icoSphere.rotation.x -= 0.003;
    icoSphere.rotation.y += 0.005;

    particleSystem.rotation.y += 0.0008;
    particleSystem.rotation.x += 0.0004;

    camera.position.x += (mouseX * 14 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 14 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateMeshPositions();
  });
})();

// ==========================================
// 2. KINETIC TYPING TEXT
// ==========================================
(function initTypingEffect() {
  const phrases = [
    'Modern Colleges & Universities.',
    'Fast & Responsive Businesses.',
    'Interactive Student Learning.',
    'High-Security Web Portals.'
  ];
  const target = document.getElementById('typed-text');
  if (!target) return;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 30 : 65);
  }

  typeLoop();
})();

// ==========================================
// 3. ABOUT US TEXT MORPHING ANIMATION
// ==========================================
(function initAboutTextMorph() {
  const words = ['Smart Portals', 'Interactive Books', 'Fast Web Apps', 'Secure Systems'];
  let wordIdx = 0;
  const el = document.getElementById('about-anim-text');
  if (!el) return;
  setInterval(() => {
    wordIdx = (wordIdx + 1) % words.length;
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.textContent = words[wordIdx];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0px)';
    }, 250);
  }, 2600);
})();

// ==========================================
// 4. "LET'S TALK" MENU TOGGLE
// ==========================================
function toggleLetsTalkMenu() {
  const menu = document.getElementById('lets-talk-menu');
  if (menu) menu.classList.toggle('hidden');
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('lets-talk-menu');
  if (!menu) return;
  const isBtn = e.target.closest('button[onclick="toggleLetsTalkMenu()"]');
  if (!menu.contains(e.target) && !isBtn && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
});

// ==========================================
// 5. AI CHATBOT FUNCTIONALITY
// ==========================================
function toggleAIChat() {
  const windowEl = document.getElementById('ai-chat-window');
  if (!windowEl) return;
  windowEl.classList.toggle('hidden');
  if (!windowEl.classList.contains('hidden')) {
    const input = document.getElementById('ai-input');
    if (input) input.focus();
  }
}

function appendMessage(sender, text) {
  const container = document.getElementById('ai-chat-messages');
  if (!container) return;
  const isBot = sender === 'bot';
  const msgDiv = document.createElement('div');
  msgDiv.className = `flex items-start gap-2 ${isBot ? '' : 'justify-end'}`;

  if (isBot) {
    msgDiv.innerHTML = `
      <div class="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="p-2.5 rounded-xl bg-slate-100 text-slate-800 max-w-[82%] leading-relaxed">
        ${text}
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="p-2.5 rounded-xl bg-blue-600 text-white max-w-[82%] leading-relaxed font-medium">
        ${text}
      </div>
    `;
  }
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function generateAIResponse(userInput) {
  const q = userInput.toLowerCase();
  
  if (q.includes('work') || q.includes('project') || q.includes('portfolio') || q.includes('recent')) {
    return `<strong>Our Flagship Delivered Work:</strong><br><br>
    • <strong>Adeeb Tech Lab:</strong> Our flagship digital innovation studio, web engineering hub, and custom software platform.<br>
    • <strong>IUB Portals:</strong> Streamlined academic and student management web ecosystem built for The Islamia University of Bahawalpur.<br>
    • <strong>DAE CIT Digital Book:</strong> Interactive digital curriculum learning &amp; resource portal for DAE Computer Information Technology students.<br>
    • <strong>DPT Information Security:</strong> Dedicated cybersecurity &amp; departmental resources portal.<br>
    • <strong>GCT Women Bahawalpur:</strong> Modern institutional web portal empowering Government College of Technology for Women, Bahawalpur.<br><br>
    💡 <em>All built, maintained, and delivered by our in-house engineering team at Adeeb Technology.</em>`;
  }
  else if (q.includes('service') || q.includes('website') || q.includes('build') || q.includes('kind') || q.includes('type') || q.includes('custom') || q.includes('web app') || q.includes('commerce') || q.includes('portal')) {
    return `<strong>Complete Full-Spectrum Web Development Services:</strong><br><br>
    At <strong>Adeeb Technology</strong>, we provide end-to-end development services for <strong>every type of website &amp; digital platform</strong>:<br><br>
    ✅ <strong>Custom Web Applications</strong> (Full-stack, SaaS, CRM, internal dashboards &amp; dynamic APIs)<br>
    ✅ <strong>Academic &amp; Student Portals</strong> (University ecosystems, college hubs &amp; digital books)<br>
    ✅ <strong>E-Commerce &amp; Online Stores</strong> (Product catalogs, cart systems &amp; secure payment gateways)<br>
    ✅ <strong>Business &amp; Corporate Websites</strong> (High-converting, responsive landing pages &amp; company portfolios)<br>
    ✅ <strong>UI/UX &amp; 3D Interactive Design</strong> (Clean modern design systems, motion graphics &amp; wireframes)<br>
    ✅ <strong>Cybersecurity, InfoSec &amp; Maintenance</strong> (Audits, SSL hardening, speed tuning &amp; 24/7 care)<br><br>
    💬 Tell us your project idea or requirement, and we'll bring it to life! WhatsApp: <strong>+92 3092333121</strong>.`;
  }
  else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach')) {
    return `<strong>Direct Contact Channels:</strong><br>
    • 🟢 <strong>WhatsApp / Call:</strong> <a href="https://wa.me/923092333121" target="_blank" class="text-blue-600 underline font-semibold">+92 3092333121</a><br>
    • ✉️ <strong>Official Email:</strong> <a href="mailto:info.AdeebTechLab@gmail.com" class="text-blue-600 underline font-semibold">info.AdeebTechLab@gmail.com</a><br>
    • 🌐 <strong>Official Portal:</strong> <a href="https://www.AdeebTechLab.com" target="_blank" class="text-blue-600 underline font-semibold">www.AdeebTechLab.com</a><br>
    • 📍 <strong>Location:</strong> Bahawalpur, Punjab, Pakistan`;
  } 
  else if (q.includes('price') || q.includes('cost') || q.includes('quote')) {
    return "We develop all types of websites at transparent and flexible pricing based on your exact requirements. Please send a message on WhatsApp to <strong>+92 3092333121</strong> or fill out our Contact Us form for a fast, free quotation!";
  } 
  else {
    return `Thank you for reaching out to <strong>Adeeb Technology</strong>!<br><br>
    We provide <strong>complete development services for every kind of website</strong> (Web Apps, Academic Portals, E-Commerce, Corporate Sites, & Custom Tools).<br><br>
    • Tap <strong>🚀 Our Work</strong> to explore our verified live projects.<br>
    • Tap <strong>📞 Contact</strong> or message us on WhatsApp (<strong>+92 3092333121</strong>) to start your project!`;
  }
}

function handleAIChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('ai-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  appendMessage('user', val);
  input.value = '';

  setTimeout(() => {
    const reply = generateAIResponse(val);
    appendMessage('bot', reply);
  }, 500);
}

function sendQuickPrompt(prompt) {
  appendMessage('user', prompt);
  setTimeout(() => {
    const reply = generateAIResponse(prompt);
    appendMessage('bot', reply);
  }, 500);
}

// ==========================================
// 6. PROJECT MODAL & FILTERING
// ==========================================
const projectsData = [
  {
    badge: 'Flagship Innovation Hub',
    title: 'Adeeb Tech Lab',
    desc: 'Our flagship digital innovation hub, web engineering studio, and custom software solutions platform built to empower businesses, educators, and learners.',
    features: [
      'Custom web apps & modern full-stack software solutions',
      'Helpful digital utilities, resources & interactive platforms',
      'Clean, responsive user experience built for every device'
    ],
    tags: ['Web Studio', 'Innovation Hub', 'AdeebTechLab.com']
  },
  {
    badge: 'University Ecosystem',
    title: 'IUB Portals',
    desc: 'Streamlined academic and student management web portals built for The Islamia University of Bahawalpur ecosystem.',
    features: [
      'Quick, organized access to student & departmental utilities',
      'Lightweight, mobile-friendly interface for busy campus days',
      'Clear announcements and academic workflow tools'
    ],
    tags: ['Academic Portal', 'Student Ecosystem', 'IUB']
  },
  {
    badge: 'Interactive Digital Learning',
    title: 'DAE CIT Book',
    desc: 'Interactive digital learning & curriculum resource portal tailored for Diploma of Associate Engineering in Computer Information Technology students.',
    features: [
      'Well-structured CIT chapters, study guides & quick references',
      'Instant mobile access without bulky PDF downloads',
      'Clean, distraction-free reading layout for exam preparation'
    ],
    tags: ['DAE CIT', 'Digital Book', 'EdTech']
  },
  {
    badge: 'Cybersecurity & Academic Hub',
    title: 'DPT Information Security',
    desc: 'Dedicated cybersecurity & information security awareness, academic resources, and departmental portal.',
    features: [
      'Centralized hub for Information Security courses & updates',
      'Built with security-first web architecture best practices',
      'Promotes practical cyber hygiene for students and faculty'
    ],
    tags: ['Information Security', 'Cyber Awareness', 'Portal']
  },
  {
    badge: 'Institutional Web Portal',
    title: 'GCT Women Bahawalpur',
    desc: 'Modern institutional web portal empowering Government College of Technology for Women, Bahawalpur with accessible student and faculty resources.',
    features: [
      'Clear overview of technical diploma programs & admissions',
      'Accessible, welcoming interface for students and parents',
      'Modernized digital presence for technical education in Bahawalpur'
    ],
    tags: ['GCT Women', 'College Portal', 'Bahawalpur']
  }
];

function openProjectModal(index) {
  const data = projectsData[index];
  if (!data) return;
  document.getElementById('modal-badge').textContent = data.badge;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;

  const featuresList = document.getElementById('modal-features');
  featuresList.innerHTML = data.features
    .map(f => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-blue-600 mt-1 text-xs"></i><span>${f}</span></li>`)
    .join('');

  const tagsContainer = document.getElementById('modal-tags');
  tagsContainer.innerHTML = data.tags
    .map(t => `<span class="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">${t}</span>`)
    .join('');

  const modal = document.getElementById('project-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

const modalEl = document.getElementById('project-modal');
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeProjectModal();
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('bg-blue-600', 'text-white', 'font-semibold', 'shadow-sm');
      b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
    });
    btn.classList.add('bg-blue-600', 'text-white', 'font-semibold', 'shadow-sm');
    btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');

    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==========================================
// 7. UTILITIES (Mobile Menu, Scroll Reveal, Toast, Copy)
// ==========================================
const mobBtn = document.getElementById('mobile-menu-btn');
if (mobBtn) {
  mobBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
}

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function showToast(msg) {
  const toast = document.getElementById('toast-box');
  if (!toast) return;
  document.getElementById('toast-message').textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3200);
}

function copyEmail() {
  const email = 'info.AdeebTechLab@gmail.com';
  const tempInput = document.createElement('input');
  tempInput.value = email;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast('Email copied: info.AdeebTechLab@gmail.com');
  } catch (err) {
    showToast('Email: info.AdeebTechLab@gmail.com');
  }
  document.body.removeChild(tempInput);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Thank you! Our digital experts will reply shortly.');
    this.reset();
  });
}
