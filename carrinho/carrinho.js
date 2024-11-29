let cart = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho ou inicializa vazio
let cartCount = cart.reduce((count, item) => count + item.quantity, 0); // Conta a quantidade total de itens

function updateLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(cart)); // Salva o carrinho como string no Local Storage
}


// Lógica do botão voltar
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'index.html'; // Volta para a página inicial
});

