// --- 1. Array de Produtos (Requisito ATUALIZADO com mais detalhes) ---
const eventos = [
  {
    id: "p1",
    name: "Evento 1",
    image: "https://static.portaldaindustria.com.br/media/anuga.jpeg",
    description: " ",
    specs: {
      Categoria: "Empresarial",
      Endereço: "Rua da Indústria, 1000 - Campinas/SP",
      Dia: "4",
      Mes: "12",
      Ano: 2025,
    },
  },
  {
    id: "p2",
    name: "Evento 2",
    image:
      "https://senaies.com.br/wp-content/uploads/2018/08/Desvendar40-590x430.jpeg",
    description: " ",
    specs: {
      Categoria: "Industrial",
      Endereço: "Rua da Indústria, 1000 - Campinas/SP",
      Dia: "6",
      Mes: "04",
      Ano: 2025,
    },
  },
  {
    id: "p3",
    name: "Evento 3",
    image:
      "https://arquivos.sfiec.org.br/sfiec/files/images/mundo%20senai(1).jpeg",
    description: " ",
    specs: {
      Categoria: "Tecnologia",
      Endereço: "Rua da Indústria, 1000 - Campinas/SP",
      Dia: "30",
      Mes: "07",
      Ano: 2025,
    },
  },
];

// Seleciona os elementos do DOM que serão manipulados
const cardsContainer = document.getElementById("cards"); // Onde os cards dos produtos serão exibidos
const detailsWrapper = document.getElementById("product-details-wrapper"); // Container dos detalhes do produto
const detailsContent = document.getElementById("product-details-content"); // Conteúdo dos detalhes
const closeBtn = document.getElementById("close-btn"); // Botão para fechar os detalhes

// Seleciona os containers individuais
const cardsEventos = document.getElementById("cards-eventos");

// Função genérica para renderizar em qualquer container
function renderProducts(lista, container) {
  container.innerHTML = "";
  lista.forEach((produto) => {
    const cardElement = createProductCard(produto);
    container.appendChild(cardElement);
  });
}

// Quando a página carregar, renderiza cada categoria separadamente
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(eventos, cardsEventos);
});

// Fecha os detalhes do produto quando o botão for clicado
closeBtn.addEventListener("click", closeDetails);

// Cria um card visual para cada produto
function createProductCard(produto) {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card shadow-sm h-100 product-card";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = produto.image;
  img.alt = produto.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = produto.name;

  // Monta o card com imagem, título e preço
  cardBody.appendChild(title);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  // Adiciona evento de clique para abrir os detalhes do produto
  card.addEventListener("click", () => {
    showProductDetails(produto.id);
  });

  return col;
}

// Exibe os detalhes do produto selecionado
function showProductDetails(productId) {
  // Procura o produto em todas as categorias
  const product =
    eventos.find((p) => p.id === productId);


  if (!product) {
    detailsContent.innerHTML =
      '<p class="text-danger">Produto não encontrado.</p>';
    return;
  }

  // Gera a lista de especificações técnicas
  let specsHtml = "";
  for (const key in product.specs) {
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
    specsHtml += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="fw-semibold">${formattedKey}:</span>
        <span>${product.specs[key]}</span>
      </li>
    `;
  }

  // Monta o HTML completo dos detalhes do produto
  const html = `
    <div class="row g-4 p-3 p-md-5">
      <div class="col-md-6">
        <img src="${product.image}" alt="${product.name}" class="img-fluid rounded shadow">
      </div>
      <div class="col-md-6">
        <h2 class="h3 fw-bold">${product.name}</h2>
        <p class="lead">${product.description}</p>
        <h4 class="h5 mt-4 mb-2">Informações do evento:</h4>
        <ul class="list-group list-group-flush">
          ${specsHtml}
        </ul>
        <button class="btn btn-success btn-lg mt-4 w-100">Marcar presença</button>
      </div>
    </div>
  `;

  // Exibe os detalhes e rola até a seção
  detailsContent.innerHTML = html;
  detailsWrapper.classList.remove("d-none");
  detailsWrapper.scrollIntoView({ behavior: "smooth" });
}

// Fecha a seção de detalhes e rola de volta para os produtos
function closeDetails() {
  detailsWrapper.classList.add("d-none");
  const productSection = document.getElementById("produtos");
  productSection.scrollIntoView({ behavior: "smooth" });
}