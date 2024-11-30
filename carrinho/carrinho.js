let cart = JSON.parse(localStorage.getItem('carrinho')) || []; 
let cartCount = cart.reduce((count, item) => count + item.quantity, 0); 

function updateLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(cart)); 
}


// Lógica do botão voltar
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'index.html'; 
});

