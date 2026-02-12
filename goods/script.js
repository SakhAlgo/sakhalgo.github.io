// Sample initial data
let goods = [
  { id: 1, name: "Ноутбук", price: 999.99, stock: 10 },
  { id: 2, name: "Мышь", price: 29.99, stock: 50 },
  { id: 3, name: "Клавиатура", price: 79.99, stock: 30 }
];

let basket = [];

// DOM Elements
const goodsList = document.getElementById('goodsList');
const basketList = document.getElementById('basketList');
const searchInput = document.getElementById('searchInput');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productStock = document.getElementById('productStock');
const addProductBtn = document.getElementById('addProductBtn');
const totalAmount = document.getElementById('totalAmount');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  renderGoodsList();
  renderBasket();
  setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
  addProductBtn.addEventListener('click', addNewProduct);
  searchInput.addEventListener('input', filterGoods);
}

// Render goods list
function renderGoodsList(filteredGoods = null) {
  const goodsToShow = filteredGoods || goods;
  goodsList.innerHTML = '';
  
  goodsToShow.forEach(good => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${good.name}</td>
      <td>${good.price.toFixed(2)} руб.</td>
      <td>${good.stock}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn btn-success" onclick="addToBasket(${good.id})">Добавить в корзину</button>
          <button class="action-btn btn-danger" onclick="deleteGood(${good.id})">Удалить</button>
        </div>
      </td>
    `;
    goodsList.appendChild(row);
  });
}

// Render basket
function renderBasket() {
  basketList.innerHTML = '';
  
  basket.forEach(item => {
    const product = goods.find(g => g.id === item.productId);
    if (!product) return;

    const itemTotal = calculateItemTotal(product.price, item.quantity, item.discount);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price.toFixed(2)} руб.</td>
      <td>${item.quantity}</td>
      <td><input type="number" class="discount-input" value="${item.discount}" min="0" max="100" onchange="updateDiscount(${item.productId}, this.value)" /></td>
      <td>${itemTotal.toFixed(2)} руб.</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn btn-danger" onclick="removeFromBasket(${item.productId})">Удалить</button>
        </div>
      </td>
    `;
    basketList.appendChild(row);
  });
  
  updateTotal();
}

// Add new product
function addNewProduct() {
  const name = productName.value.trim();
  const price = parseFloat(productPrice.value);
  const stock = parseInt(productStock.value);
  
  if (!name || isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
    alert('Пожалуйста, заполните все поля допустимыми значениями');
    return;
  }
  
  const newId = goods.length > 0 ? Math.max(...goods.map(g => g.id)) + 1 : 1;
  goods.push({
    id: newId,
    name: name,
    price: price,
    stock: stock
  });
  
  // Clear form
  productName.value = '';
  productPrice.value = '';
  productStock.value = '';
  
  renderGoodsList();
  filterGoods(); // Reapply filter if there was one
}

// Add to basket
function addToBasket(productId) {
  const product = goods.find(g => g.id === productId);
  if (!product) return;
  
  // Check if product is in stock
  if (product.stock <= 0) {
    alert('Этого товара нет в наличии!');
    return;
  }
  
  // Check if already in basket
  const existingItem = basket.find(item => item.productId === productId);
  if (existingItem) {
    if (product.stock <= existingItem.quantity) {
      alert('Недостаточно товара на складе!');
      return;
    }
    existingItem.quantity++;
  } else {
    basket.push({
      productId: productId,
      quantity: 1,
      discount: 0
    });
  }
  
  // Reduce stock
  product.stock--;
  
  renderGoodsList();
  renderBasket();
  filterGoods(); // Reapply filter if there was one
}

// Remove from basket
function removeFromBasket(productId) {
  const itemIndex = basket.findIndex(item => item.productId === productId);
  if (itemIndex !== -1) {
    const item = basket[itemIndex];
    const product = goods.find(g => g.id === productId);
    
    // Return stock
    product.stock += item.quantity;
    
    basket.splice(itemIndex, 1);
    renderGoodsList();
    renderBasket();
    filterGoods(); // Reapply filter if there was one
  }
}

// Update discount
function updateDiscount(productId, discountValue) {
  const discount = parseFloat(discountValue) || 0;
  const item = basket.find(item => item.productId === productId);
  if (item) {
    item.discount = Math.min(100, Math.max(0, discount)); // Limit between 0 and 100
    renderBasket();
  }
}

// Delete good
function deleteGood(productId) {
  if (confirm('Вы уверены, что хотите удалить этот товар?')) {
    // Check if product is in basket
    const basketIndex = basket.findIndex(item => item.productId === productId);
    if (basketIndex !== -1) {
      alert('Невозможно удалить товар, который находится в корзине. Пожалуйста, сначала удалите его из корзины.');
      return;
    }

    goods = goods.filter(g => g.id !== productId);
    renderGoodsList();
    filterGoods(); // Reapply filter if there was one
  }
}

// Calculate item total with discount
function calculateItemTotal(price, quantity, discount) {
  const totalBeforeDiscount = price * quantity;
  const discountAmount = totalBeforeDiscount * (discount / 100);
  return totalBeforeDiscount - discountAmount;
}

// Update total amount
function updateTotal() {
  let total = 0;
  basket.forEach(item => {
    const product = goods.find(g => g.id === item.productId);
    if (product) {
      total += calculateItemTotal(product.price, item.quantity, item.discount);
    }
  });
  totalAmount.textContent = total.toFixed(2);
}

// Filter goods based on search input
function filterGoods() {
  const searchTerm = searchInput.value.toLowerCase();
  if (!searchTerm) {
    renderGoodsList();
    return;
  }
  
  const filtered = goods.filter(good => 
    good.name.toLowerCase().includes(searchTerm)
  );
  renderGoodsList(filtered);
}

// Make functions available globally for inline event handlers
window.addToBasket = addToBasket;
window.removeFromBasket = removeFromBasket;
window.updateDiscount = updateDiscount;
window.deleteGood = deleteGood;