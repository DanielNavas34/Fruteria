// Catálogo de productos
const products = [
  { id: 1, name: "Manzanas Fuji", price: 2.20, emoji: "🍎" },
  { id: 2, name: "Plátanos de Canarias", price: 1.85, emoji: "🍌" },
  { id: 3, name: "Naranjas de Mesa", price: 1.60, emoji: "🍊" },
  { id: 4, name: "Fresas Silvestres", price: 3.40, emoji: "🍓" },
  { id: 5, name: "Aguacates Hass", price: 4.50, emoji: "🥑" },
  { id: 6, name: "Uvas Negras", price: 2.90, emoji: "🍇" }
];

let cart = [];

// Elementos del DOM
const productsGrid = document.getElementById("products-grid");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

// Renderizar catálogo
function renderCatalog() {
  productsGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-emoji">${product.emoji}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">${product.price.toFixed(2)} € / kg</p>
      <button class="btn-add" onclick="addToCart(${product.id})">Añadir al carrito</button>
    </div>
  `).join("");
}

// Añadir producto al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

// Eliminar producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalCount;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalElement.textContent = `${totalPrice.toFixed(2)} €`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li style="text-align:center; color:#94a3b8; padding:2rem 0;">Tu cesta está vacía</li>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <li class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-title">${item.emoji} ${item.name}</span>
        <span class="cart-item-sub">${item.quantity} kg x ${item.price.toFixed(2)} €</span>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${item.id})">Quitar</button>
    </li>
  `).join("");
}

// Control de apertura y cierre del modal
cartToggleBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
closeCartBtn.addEventListener("click", () => cartModal.classList.add("hidden"));
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.classList.add("hidden");
});

// Finalizar compra simulada
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío. Elige alguna fruta primero.");
    return;
  }
  alert(`¡Gracias por tu compra! El total es de ${cartTotalElement.textContent}.`);
  cart = [];
  updateCartUI();
  cartModal.classList.add("hidden");
});

// Inicialización
renderCatalog();