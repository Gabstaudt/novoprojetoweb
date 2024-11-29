const API_URL = "http://localhost:3000";

// Elementos HTML
const output = document.getElementById("output");
const viewDashboardButton = document.getElementById("view-dashboard");
const addProductButton = document.getElementById("add-product");
const deleteProductButton = document.getElementById("delete-product");
const logoutButton = document.getElementById("logout");

// Funções de Utilidade
async function fetchAPI(endpoint, method = "GET", body = null) {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(`${API_URL}/${endpoint}`, options);

        // Verificar status da resposta
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro desconhecido.");
        }
        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        return { error: error.message };
    }
}

function renderOutput(content) {
    output.innerHTML = content;
}

// Ver Compras Mensais
viewDashboardButton.addEventListener("click", async () => {
    const data = await fetchAPI("admin/compras-mensais");
    if (data.error) {
        renderOutput(`<p>${data.error}</p>`);
    } else {
        renderOutput(
            `<h2>Compras Mensais</h2>` +
            data.map(
                (item) =>
                    `<p>Mês: ${item.mes}, Total: R$${item.total_compras.toFixed(2)}</p>`
            ).join("")
        );
    }
});

// Adicionar Produto
addProductButton.addEventListener("click", () => {
    const form = `
        <h2>Adicionar Produto</h2>
        <form id="product-form">
            <label>Nome: <input type="text" id="product-name" required></label><br>
            <label>Descrição: <input type="text" id="product-description"></label><br>
            <label>Preço: <input type="number" id="product-price" required></label><br>
            <label>Estoque: <input type="number" id="product-stock" required></label><br>
            <label>Imagem: <input type="text" id="product-image"></label><br>
            <label>Categoria ID: <input type="number" id="product-category-id" required></label><br>
            <button type="submit">Enviar</button>
        </form>
    `;
    renderOutput(form);

    const productForm = document.getElementById("product-form");
    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nome = document.getElementById("product-name").value;
        const descricao = document.getElementById("product-description").value;
        const preco = parseFloat(document.getElementById("product-price").value);
        const estoque = parseInt(document.getElementById("product-stock").value, 10);
        const imagem = document.getElementById("product-image").value;
        const categoriaid = parseInt(document.getElementById("product-category-id").value, 10);

        // Validações
        if (isNaN(preco) || preco <= 0) {
            alert("O preço deve ser um número positivo.");
            return;
        }
        if (isNaN(estoque) || estoque < 0) {
            alert("O estoque deve ser um número não negativo.");
            return;
        }

        // Enviar dados para o servidor
        const result = await fetchAPI("produtos", "POST", { nome, descricao, preco, estoque, imagem, categoriaid });
        if (result.error) {
            renderOutput(`<p>${result.error}</p>`);
        } else {
            renderOutput(`<p>Produto criado com sucesso! ID: ${result.id}</p>`);
        }
    });
});

// Excluir Produto
deleteProductButton.addEventListener("click", () => {
    const form = `
        <h2>Excluir Produto</h2>
        <form id="delete-form">
            <label>Produto ID: <input type="number" id="product-id" required></label><br>
            <button type="submit">Excluir</button>
        </form>
    `;
    renderOutput(form);

    const deleteForm = document.getElementById("delete-form");
    deleteForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const productId = parseInt(document.getElementById("product-id").value, 10);

        if (isNaN(productId) || productId <= 0) {
            alert("O ID do produto deve ser um número positivo.");
            return;
        }

        const result = await fetchAPI(`produtos/${productId}`, "DELETE");
        if (result.error) {
            renderOutput(`<p>${result.error}</p>`);
        } else {
            renderOutput(`<p>Produto deletado com sucesso!</p>`);
        }
    });
});

// Logout
logoutButton.addEventListener("click", () => {
    alert("Você saiu do painel administrativo.");
    window.location.href = "index.html"; // Redireciona para a página inicial
});
