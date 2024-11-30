// Gera um código de rastreio aleatório
function generateTrackingCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Atualiza a barra de progresso
function updateProgress(step) {
    const steps = document.querySelectorAll(".step");
    const progressFill = document.querySelector(".progress-fill");

    steps.forEach((s, index) => {
        if (index <= step) {
            s.classList.add("active");
        } else {
            s.classList.remove("active");
        }
    });

    progressFill.style.width = `${(step / (steps.length - 1)) * 100}%`;
}

// Simula o progresso do pedido
function simulateOrderProgress() {
    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep < 3) {
            currentStep++;
            updateProgress(currentStep);
        } else {
            clearInterval(interval);
        }
    }, 2000); 
}

// Inicializa a página
document.addEventListener("DOMContentLoaded", () => {
    const trackingCodeElement = document.getElementById("tracking-code");
    trackingCodeElement.textContent = generateTrackingCode();

    // Inicia a simulação do progresso do pedido
    simulateOrderProgress();

    // Botão de voltar
    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "../index.html"; 
    });
});
