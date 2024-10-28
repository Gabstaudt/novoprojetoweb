let cart = [];  
let cartCount = 0; 

// Abre o carrinho e a sobreposição
document.getElementById('cart-button').addEventListener('click', function() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('active'); 
    document.getElementById('cart-overlay').classList.add('active'); // Adiciona classe ao overlay
});

// Fecha o carrinho e a sobreposição
document.getElementById('close-cart').addEventListener('click', function() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('active'); 
    document.getElementById('cart-overlay').classList.remove('active'); // Remove classe do overlay
});

// Adiciona produto ao carrinho
function addToCart(productName, price, imageName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity++; 
    } else {
        cart.push({ name: productName, price: price, quantity: 1, image: imageName }); // Adiciona a imagem ao objeto do produto
    }
    cartCount++;
    updateLocalStorage(); 
    updateCart(); // Atualiza a visualização do carrinho
}


// Atualiza o armazenamento local
function updateLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
}

// Atualiza o carrinho na interface
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpa os itens existentes
    let totalValue = 0;  
    
    cart.forEach(item => {
        totalValue += item.price * item.quantity;  
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="./image/produtos/${item.image}" alt="${item.name}"> <!-- Usa o nome da imagem armazenado -->
                <div class="item-info">
                    <p>${item.name}</p>
                    <p>R$${item.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1" data-name="${item.name}" onchange="updateQuantity(this)">
                </div>
            </div>
        `;
    });

    document.getElementById('total-value').textContent = totalValue.toFixed(2);
}


// Atualiza a quantidade de produtos
function updateQuantity(inputElement) {
    const productName = inputElement.getAttribute('data-name');
    const newQuantity = parseInt(inputElement.value);
    
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        const difference = newQuantity - cart[productIndex].quantity;
        cart[productIndex].quantity = newQuantity;
        cartCount += difference;
        
        if (newQuantity === 0) {
            cart.splice(productIndex, 1);  
        }
        
        updateLocalStorage(); 
        updateCart();
    }
}

// Redireciona para a página de finalização de compra
document.getElementById('checkout-btn').addEventListener('click', function() {
    window.location.href = '/carrinho/carrinho.html';  
});

// Funções de rolagem do carrossel
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const carousel = document.getElementById('product-carousel');
let scrollAmount = 0;
let isScrolling = false; // Estado para controlar a rolagem

prevButton.addEventListener('click', () => {
    scrollCarousel(-1); // Rola para a esquerda
});

nextButton.addEventListener('click', () => {
    scrollCarousel(1); // Rola para a direita
});

// Função para rolar o carrossel
function scrollCarousel(direction) {
    if (isScrolling) return; // Não faz nada se já está rolando
    isScrolling = true;

    const scrollDistance = 200; // Distância para rolar
    scrollAmount += direction * scrollDistance; // Atualiza a quantidade de scroll

    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false; // Permite novos cliques após a animação
    }, 300); // Tempo para a animação
}
