const API_URL = "http://localhost:3000"; // URL base do backend

const productList = document.getElementById("product-list");
const cartOverlay = document.querySelector(".cart-overlay");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItemsContainer = document.querySelector(".cart-items");
const closeCartButton = document.querySelector(".close-cart");
const checkoutButton = document.querySelector(".checkout-button");

let cart = []; // Carrinho local

// Função para buscar produtos
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) {
            throw new Error("Erro ao buscar os produtos.");
        }
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Erro na API:", error);
        productList.innerHTML = `
            <p style="color: red; text-align: center;">Erro ao carregar os produtos.</p>
        `;
    }
}

// Função para renderizar produtos
function renderProducts(products) {
    if (!Array.isArray(products) || products.length === 0) {
        productList.innerHTML = "<p>Nenhum produto disponível no momento.</p>";
        return;
    }

    productList.innerHTML = products
        .map((product) => {
            const preco = product.preco ? `R$${parseFloat(product.preco).toFixed(2)}` : "Preço indisponível";
            return `
                <div class="product-card">
                    <img src="${product.imagem || 'https://via.placeholder.com/300x200'}" alt="${product.nome}">
                    <h3>${product.nome}</h3>
                    <p>${product.descricao || "Sem descrição disponível."}</p>
                    <p class="preco">${preco}</p>
                    <button class="carousel-button" onclick="addToCart(${product.id}, '${product.nome}', ${product.preco})">Adicionar ao Carrinho</button>
                </div>
            `;
        })
        .join("");
}

// Função para adicionar produto ao carrinho
function addToCart(id, nome, preco) {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantidade += 1; // Incrementa a quantidade se já estiver no carrinho
    } else {
        cart.push({ id, nome, preco, quantidade: 1 });
    }

    updateCartUI();
}

// Atualizar o UI do carrinho
function updateCartUI() {
    cartItemsContainer.innerHTML = cart
        .map(
            (item) => `
            <div class="cart-item">
                <p><strong>${item.nome}</strong></p>
                <p>Preço: R$${item.preco.toFixed(2)}</p>
                <p>Quantidade: ${item.quantidade}</p>
            </div>
        `
        )
        .join("");

    // Exibe ou esconde o carrinho
    if (cart.length > 0) {
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
    } else {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
    }
}

// Fechar o carrinho
closeCartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

// Finalizar compra
checkoutButton.addEventListener("click", () => {
    alert("Compra finalizada com sucesso!");
    cart = []; // Limpa o carrinho
    updateCartUI();
});

// Carregar os produtos ao abrir a página
document.addEventListener("DOMContentLoaded", fetchProducts);
