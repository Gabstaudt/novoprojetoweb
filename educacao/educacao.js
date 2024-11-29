let cart = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho ou inicializa vazio
let cartCount = cart.reduce((count, item) => count + item.quantity, 0); // Conta a quantidade total de itens

// Função para adicionar produtos ao carrinho
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

// Atualiza o localStorage
function updateLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
}

// Atualiza a visualização do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpa os itens do carrinho

    let totalValue = 0; // Inicializa o total

    cart.forEach(item => {
        totalValue += item.price * item.quantity; // Calcula o total
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="./imgeduca/${item.image}" alt="${item.name}"> <!-- Corrige o caminho da imagem -->
                <div class="item-info">
                    <p>${item.name}</p>
                    <p>R$${item.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1" data-name="${item.name}" onchange="updateQuantity(this)">
                </div>
            </div>
        `;
    });

    document.getElementById('total-value').textContent = totalValue.toFixed(2); // Atualiza o total no carrinho
}

function updateLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(cart)); // Salva o carrinho como string no Local Storage
}


// Atualiza a quantidade de um item no carrinho
function updateQuantity(productName, newQuantity) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity = parseInt(newQuantity);
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove o item se a quantidade for 0
        }
        updateLocalStorage();
        updateCart();
    }
}

// Abrir carrinho
document.getElementById('cart-button').addEventListener('click', function() {
    document.getElementById('cart-overlay').style.display = 'block'; // Mostra a overlay
    document.getElementById('cart-sidebar').classList.add('active'); // Abre a sidebar
});

// Fechar carrinho
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-overlay').style.display = 'none'; // Esconde a overlay
    document.getElementById('cart-sidebar').classList.remove('active'); // Fecha a sidebar
});

// Fechar o carrinho ao clicar fora
document.getElementById('cart-overlay').addEventListener('click', function() {
    document.getElementById('cart-overlay').style.display = 'none'; // Esconde a overlay
    document.getElementById('cart-sidebar').classList.remove('active'); // Fecha a sidebar
});
