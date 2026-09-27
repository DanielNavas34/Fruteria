// Catálogo de productos con fotografía realista de Unsplash
const products = [
  {
    id: 1,
    name: "Fresas de Huelva",
    category: "temporada",
    price: 3.85,
    unit: "cesta 500g",
    origin: "Huelva, Andalucía",
    rating: "★★★★★ (48)",
    badge: "Superdulces",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Naranjas de Zumo",
    category: "citricos",
    price: 1.75,
    unit: "kg",
    origin: "Valencia",
    rating: "★★★★★ (62)",
    badge: "100% Zumo",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Aguacates Hass Madurados",
    category: "tropical",
    price: 4.90,
    unit: "kg (aprox. 4 piezas)",
    origin: "La Axarquía, Málaga",
    rating: "★★★★☆ (34)",
    badge: "Listos para comer",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Plátano Canario Extra",
    category: "bio",
    price: 2.10,
    unit: "kg",
    origin: "La Palma, Canarias",
    rating: "★★★★★ (95)",
    badge: "Sello Bio",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Arándanos Silvestres",
    category: "bio",
    price: 2.60,
    unit: "tarrina 125g",
    origin: "Asturias",
    rating: "★★★★★ (29)",
    badge: "Antioxidante",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Limón Fino Ecológico",
    category: "citricos",
    price: 1.95,
    unit: "kg",
    origin: "Murcia",
    rating: "★★★★☆ (19)",
    badge: "Piel Comestible",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Manzanas Fuji Crujientes",
    category: "temporada",
    price: 2.40,
    unit: "kg",
    origin: "Lleida",
    rating: "★★★★★ (51)",
    badge: "Cosecha propia",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Mango Osteen",
    category: "tropical",
    price: 3.90,
    unit: "pieza (500g aprox)",
    origin: "Granada",
    rating: "★★★★★ (41)",
    badge: "Extra dulce",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];
let currentCategory = "todos";
const FREE_SHIPPING_THRESHOLD = 25.00;

// Elementos del DOM
const productsGrid = document.getElementById("products-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const shippingMessage = document.getElementById("shipping-message");
const shippingProgressFill = document.getElementById("shipping-progress-fill");
const checkoutBtn = document.getElementById("checkout-btn");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

// Renderizar catálogo con filtrado
function renderProducts() {
  const filtered = currentCategory === "todos"
    ? products
    : products.filter(p => p.category === currentCategory);

  productsGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <span class="badge-tag">${product.badge}</span>
      <img class="product-thumb" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-body">
        <span class="product-origin">${product.origin}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">${product.rating}</div>
        <div class="product-footer">
          <div>
            <span class="product-price">${product.price.toFixed(2)} €</span>
            <span class="product-unit">/ ${product.unit}</span>
          </div>
          <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Añadir a la cesta">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

// Control de filtros
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});

// Añadir al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const itemInCart = cart.find(item => item.id === productId);

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  showToast(`Añadido: ${product.name}`);
}

// Modificar cantidades (+ o -)
function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  updateCart();
}

// Actualizar Drawer y estado
function updateCart() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  cartCountElement.textContent = totalCount;
  cartTotalElement.textContent = `${totalPrice.toFixed(2)} €`;

  // Barra de progreso envío gratis
  if (totalPrice >= FREE_SHIPPING_THRESHOLD) {
    shippingMessage.innerHTML = "🎉 ¡Felicidades! Tienes <strong>Envío Gratis</strong>";
    shippingProgressFill.style.width = "100%";
    shippingProgressFill.style.backgroundColor = "var(--primary)";
  } else {
    const remaining = (FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2);
    const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
    shippingMessage.innerHTML = `Añade <strong>${remaining} €</strong> más para <strong>Envío Gratis</strong>`;
    shippingProgressFill.style.width = `${progress}%`;
  }

  // Renderizar lista en el drawer
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <li style="text-align: center; color: var(--text-muted); padding: 3rem 0;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🧺</span>
        Tu cesta de la compra está vacía
      </li>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <li class="drawer-item">
      <img src="${item.image}" alt="${item.name}" class="item-img" />
      <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-price">${item.price.toFixed(2)} € / ${item.unit}</p>
      </div>
      <div class="item-controls">
        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
        <span class="item-qty">${item.quantity}</span>
        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
    </li>
  `).join("");
}

// Notificación flotante (Toast)
let toastTimeout;
function showToast(msg) {
  clearTimeout(toastTimeout);
  toastMessage.textContent = msg;
  toast.classList.remove("hidden");
  toastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

// Abrir y cerrar Drawer
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.remove("hidden");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.add("hidden");
}

cartToggleBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Finalizar pedido
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu cesta está vacía.");
    return;
  }
  alert(`¡Pedido confirmado! Total a abonar: ${cartTotalElement.textContent}`);
  cart = [];
  updateCart();
  closeCart();
});

// Inicio inicial
renderProducts();
updateCart();