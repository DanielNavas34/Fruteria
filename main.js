/**
 * Catálogo de Productos (Solo datos informativos, sin precios ni comercio)
 */
const products = [
  {
    id: 1,
    name: "Fresas de Huelva",
    category: "temporada",
    origin: "Huelva, Andalucía",
    rating: "★★★★★ (48)",
    badge: "Superdulces",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Naranjas de Zumo",
    category: "citricos",
    origin: "Valencia",
    rating: "★★★★★ (62)",
    badge: "100% Zumo",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Aguacates Hass Madurados",
    category: "tropical",
    origin: "La Axarquía, Málaga",
    rating: "★★★★☆ (34)",
    badge: "Listos para comer",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Plátano Canario Extra",
    category: "bio",
    origin: "La Palma, Canarias",
    rating: "★★★★★ (95)",
    badge: "Sello Bio",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Arándanos Silvestres",
    category: "bio",
    origin: "Asturias",
    rating: "★★★★★ (29)",
    badge: "Antioxidante",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Limón Fino Ecológico",
    category: "citricos",
    origin: "Murcia",
    rating: "★★★★☆ (19)",
    badge: "Piel Comestible",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Manzanas Fuji Crujientes",
    category: "temporada",
    origin: "Lleida",
    rating: "★★★★★ (51)",
    badge: "Cosecha propia",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Mango Osteen",
    category: "tropical",
    origin: "Granada",
    rating: "★★★★★ (41)",
    badge: "Extra dulce",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
  }
];

document.addEventListener("DOMContentLoaded", () => {

  // ==============================================================
  // 1. Control del Preloader (Animación ~2 Segundos)
  // ==============================================================
  const preloader = document.getElementById('preloader');
  
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 400); 
    }, 2000);
  }

  // ==============================================================
  // 2. Lógica del Menú Móvil (Hamburguesa)
  // ==============================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('is-active');
      navLinks.classList.toggle('nav-active');
      
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('is-active');
        navLinks.classList.remove('nav-active');
        mobileMenuBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // ==============================================================
  // 3. Renderizado del Catálogo (Visual y Estático)
  // ==============================================================
  const gridFrutas = document.getElementById("grid-frutas");

  if (gridFrutas) {
    gridFrutas.innerHTML = products.map(product => `
      <article class="product-card">
        <span class="badge-tag">${product.badge}</span>
        <img class="product-thumb" src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-body">
          <span class="product-origin">${product.origin}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">${product.rating}</div>
        </div>
      </article>
    `).join("");
  }
});