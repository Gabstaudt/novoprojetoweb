const API_URL = "http://localhost:3000"; 

// Elementos HTML
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const registerTrigger = document.getElementById("register-trigger");
const registerModal = document.getElementById("register-modal");
const closeModalButton = document.querySelector(".close");

// Funções de Utilidade
async function fetchAPI(endpoint, method = "GET", body = null) {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(`${API_URL}/${endpoint}`, options);
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

// Abrir o modal de cadastro
registerTrigger.addEventListener("click", () => {
    registerModal.classList.remove("hidden"); 
    registerModal.classList.add("show");
});

// Fechar o modal de cadastro
closeModalButton.addEventListener("click", () => {
    registerModal.classList.add("hidden"); 
    registerModal.classList.remove("show");
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
    if (event.target === registerModal) {
        registerModal.classList.add("hidden");
        registerModal.classList.remove("show");
    }
});

// Lógica de Login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const result = await fetchAPI("login", "POST", {
        usuario: email,
        senha: password,
    });

    if (result.error) {
        alert(result.error);
    } else {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Login realizado com sucesso!");

        if (result.user.privilegio === "admin") {
            window.location.href = "../privilegio/privilegio.html";
        } else {
            window.location.href = "sucesso.html";
        }
    }
});

// Lógica de Cadastro
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email-register").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password-register").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    if (!fullName || !email || !phone || !password || !confirmPassword) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    const result = await fetchAPI("usuarios", "POST", {
        nome: fullName,
        email,
        telefone: phone,
        senha: password,
    });

    if (result.error) {
        alert(result.error);
    } else {
        alert("Usuário cadastrado com sucesso!");
        registerModal.classList.add("hidden"); 
        registerModal.classList.remove("show");
    }
});
