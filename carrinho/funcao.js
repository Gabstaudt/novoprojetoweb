const API_URL = "http://localhost:3000"; // URL base do backend

// Elementos HTML
const output = document.getElementById("output");
const viewUsersButton = document.getElementById("view-users");
const viewProductsButton = document.getElementById("view-products");
const registerModal = document.getElementById("register-modal");
const loginModal = document.getElementById("login-modal");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const registerButton = document.getElementById("register-button");
const loginTrigger = document.getElementById("login-trigger");
const loginButton = document.getElementById("login-button");
const closeButtons = document.querySelectorAll(".close");

// Funções de Utilidade
async function fetchAPI(endpoint, method = "GET", body = null) {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(`${API_URL}/${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        return { error: "Erro ao se conectar com o servidor." };
    }
}

function toggleModal(modal) {
    modal.classList.toggle("hidden");
}

// Handlers de Modais
loginTrigger.addEventListener("click", () => {
    toggleModal(registerModal); // Fecha o modal de cadastro
    toggleModal(loginModal); // Abre o modal de login
});

closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const modal = event.target.closest(".modal");
        toggleModal(modal);
    });
});

// Lógica de Cadastro
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    const result = await fetchAPI("usuarios", "POST", { nome: fullName, email, telefone: phone, senha: password });
    if (result.error) {
        alert(result.error);
    } else {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "sucesso.html";
    }
});

// Lógica de Login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("login-password").value;

    const result = await fetchAPI("login", "POST", { usuario: username, senha: password });

    if (result.error) {
        // Exibe mensagem de erro ao usuário
        alert(result.error);
    } else {
        
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user)); 
        alert("Login realizado com sucesso!");

        // Verifica o privilégio do usuário
        if (result.user.privilegio === "admin") {
            window.location.href = "privilegio.html"; 
        } else {
            window.location.href = "sucesso.html"; 
        }
    }
});


// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para exibir os itens do carrinho
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpa os itens do carrinho

    let totalValue = 0; // Inicializa o total

    cart.forEach(item => {
        totalValue += item.price * item.quantity; // Calcula o total
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="./image/produtos/${item.image}" alt="${item.name}">
                <div class="item-info">
                    <p>${item.name}</p>
                    <p>R$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    document.getElementById('total-value').textContent = totalValue.toFixed(2); // Atualiza o total no carrinho

    // Se o carrinho não estiver vazio, mostra o botão de finalizar compra
    if (cart.length > 0) {
        document.getElementById('finalize-button').classList.remove('hidden');
    } else {
        document.getElementById('finalize-button').classList.add('hidden');
    }
}

// Chama a função para exibir os itens ao carregar a página
displayCartItems();

// Exibir conteúdo de pagamento
document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
    input.addEventListener('change', function() {
        const paymentMethod = this.value;
        const creditCardForm = document.getElementById('credit-card-form');
        const paymentOutput = document.getElementById('payment-output');

        // Mostrar ou ocultar o formulário de cartão de crédito
        if (paymentMethod === 'cartao') {
            creditCardForm.classList.remove('hidden');
            paymentOutput.classList.add('hidden');
        } else {
            creditCardForm.classList.add('hidden');
            paymentOutput.classList.remove('hidden');

            if (paymentMethod === 'pix') {
                paymentOutput.innerHTML = '<p>QR Code gerado para pagamento via Pix</p>'; // Simulação de QR Code
            } else if (paymentMethod === 'boleto') {
                paymentOutput.innerHTML = '<p>Boleto gerado no valor de R$' + document.getElementById('total-value').textContent + '</p>'; // Simulação de Boleto
            }
        }
    });
});

// Validação do formulário e finalização da compra
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário
    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const installments = document.getElementById('installments').value;

    // Validação dos campos do cartão de crédito
    if (cardNumber && cardName && expiryDate && cvv && installments) {
        alert('Compra finalizada com sucesso!'); // Aqui você pode adicionar a lógica de finalização real
        // Adicionar lógica para redirecionar ou processar o pagamento
    } else {
        alert('Por favor, preencha todos os campos do cartão!');
    }
});

// Lógica do botão voltar
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = 'index.html'; // Volta para a página inicial
});

// Modal de Cadastro
const modal = document.getElementById('register-modal');
const registerTrigger = document.getElementById('register-trigger');
const closeModal = document.querySelector('.close');

// Abre o modal ao clicar no botão de cadastro
registerTrigger.addEventListener('click', () => {
    modal.classList.add('show');
});

// Fecha o modal de cadastro ao clicar no "X"
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Fecha o modal de cadastro ao clicar fora do conteúdo do modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});


// Abre o modal de login ao clicar em "Já tem login?"
loginTrigger.addEventListener('click', () => {
    modal.classList.remove('show'); // Fecha o modal de cadastro
    loginModal.classList.add('show'); // Abre o modal de login
});

// Fecha o modal de login ao clicar no "X"
closeLoginModal.addEventListener('click', () => {
    loginModal.classList.remove('show');
});

// Fecha o modal de login ao clicar fora do conteúdo do modal
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
    }
});
