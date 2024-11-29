
const noticias = [
    { titulo: "Robôs Optimus foram controlados parcialmente por humanos em evento da Tesla", conteudo: "A interação dos robôs humanoides Optimus com o público no evento da Tesla realizado na última semana foi um dos destaques da conferência...", img: "./imgblog/noticia1.png", link: "https://www.tecmundo.com.br/produto/293904-robos-optimus-controlados-parcialmente-humanos-evento-tesla.htm" },
    { titulo: "Boston Dynamics e Toyota fecham acordo para adicionar IA ao robô Atlas", conteudo: "A fabricante Boston Dynamics anunciou nesta quarta-feira (16) uma parceria com um instituto de pesquisa da Toyota...", img: "./imgblog/not2.png", link: "https://www.tecmundo.com.br/software/293889-boston-dynamics-toyota-fecham-acordo-adicionar-ia-robo-atlas.htm" },
    { titulo: "Robôs aspiradores hackeados 'disparam' ataques racistas contra usuários", conteudo: "Robôs aspiradores de pó hackeados estão “disparando” ataques racistas e obscenidades por meio de seus alto-falantes...", img: "./imgblog/not3.png", link: "https://www.tecmundo.com.br/seguranca/290807-robos-aspiradores-hackeados-disparam-ataques-racistas-usuarios.htm" },
    { titulo: "Cybercab, Robovan, Optimus e mais: confira os anúncios do evento de robôs da Tesla", conteudo: "Após alguns anos de atraso, a Tesla finalmente apresentou seu aguardado robotaxi, que havia sido prometido por Elon Musk ...", img: "./imgblog/not4.png", link: "https://www.tecmundo.com.br/mercado/290674-cybercab-robovan-optimus-confira-anuncios-evento-robos-tesla.htm" },
    { titulo: "Amazon detalha sistemas robóticos com IA usados em centros de distribuição", conteudo: "A Amazon apresentou nesta quarta-feira (9) uma série de inovações que estão sendo utilizadas em seus centros de distribuição nos Estados Unidos ...", img: "./imgblog/not5.png", link: "https://www.tecmundo.com.br/mercado/290565-amazon-detalha-sistemas-roboticos-ia-usados-centros-distribuicao.htm" },
    { titulo: "Xiaomi lança Mijia H40, robô aspirador inteligente controlável por comandos de voz", conteudo: "A Xiaomi apresentou seu mais novo dispositivo para casas inteligentes, o aspirador de pó automático Mijia H40. ..", img: "./imgblog/not6.png", link: "https://www.tecmundo.com.br/produto/288837-xiaomi-lanca-mijia-h40-robo-aspirador-inteligente-controlavel-comandos-voz.htm" },
    { titulo: "Tesla abre vaga de 'imitador' de robôs; entenda", conteudo: "A Tesla está com vagas abertas para imitadores de robôs — ou quase isso. A companhia de Elon Musk divulgou vagas para...", img: "./imgblog/not7.png", link: "https://www.tecmundo.com.br/mercado/288422-tesla-abre-vaga-imitador-robos-entenda.htm" },
    { titulo: "Apple planeja robô doméstico com iPad como tela e lançamento até 2027", conteudo: "A Apple já decidiu qual será o próximo projeto mais ousado da empresa. Depois de lançar o headset Apple Vision Pro...", img: "./imgblog/not8.png", link: "https://www.tecmundo.com.br/produto/288267-apple-planeja-robo-domestico-ipad-tela-lancamento-2027.htm" },
    { titulo: "Robotáxis da Baidu causa engarrafamentos na China e motoristas temem perder emprego", conteudo: "A frota de robotáxis da Baidu que circula por Wuhan, na China, está dificultando o trânsito da cidade ao gerar engarrafamentos em algumas ruas. Os problemas são...", img: "./imgblog/not9.png", link: "https://www.tecmundo.com.br/auto/288090-robotaxis-baidu-engarrafamentos-china-motoristas-perder-emprego.htm" }
];


function renderCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');


    carouselContainer.innerHTML = '';

    // Adiciona cada notícia ao carrossel
    noticias.forEach((noticia) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        carouselItem.innerHTML = `
            <a href="${noticia.link}" target="_blank">
                <img src="${noticia.img}" alt="${noticia.titulo}">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.conteudo}</p>
            </a>
        `;
        
        carouselContainer.appendChild(carouselItem);
    });
}


renderCarousel();

// Lógica do carrossel
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

// visualização do carrossel
function updateCarousel() {
    const offset = currentIndex * -100 / 3; 
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.style.transform = `translateX(${offset}%)`; 
}

// Navegação manual
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % (Math.ceil(totalItems / 3)); 
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + Math.ceil(totalItems / 3)) % (Math.ceil(totalItems / 3)); 
    updateCarousel();
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % (Math.ceil(totalItems / 3)); 
    updateCarousel();
}, 3000); 


updateCarousel();