// Produtos fictícios
const products = [
    { id: 1, name: "Tikal", category: "Aventura", price: 100, img: "assets/images/tikal.png"},
    { id: 2, name: "Gloomhaven", category: "RPG", price: 150, img: "assets/images/Gloomhaven.jpg" },
    { id: 3, name: "Forbidden Island", category: "Cooperativo", price: 120, img: "assets/images/forbidden-island.png" },
    { id: 4, name: "Catan", category: "Competitivo", price: 80, img: "assets/images/catan.png" },
    { id: 5, name: "Codenames", category: "4 jogadores", price: 110, img: "assets/images/codenames.png" },
    { id: 6, name: "Mansions of Madness", category: "Aventura", price: 100, img: "assets/images/mansions-of-madness.jpg" },
    { id: 7, name: "Descent: Journeys in the Dark", category: "RPG", price: 130, img: "assets/images/descent-journeys-in-the-dark.jpg" },
    { id: 8, name: "Pandemic", category: "Cooperativo", price: 140, img: "assets/images/pandemic.jpg" }
];

// Função para filtrar os produtos pela categoria selecionada
function filterCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);  // Passar os produtos filtrados para a renderização
}
// Função para resetar todos os filtros e mostrar todos os produtos
function resetFilters() {
    // Renderiza todos os produtos
    renderAllProducts();
}


// Função para renderizar os produtos no catálogo
function renderProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";  // Limpar os produtos existentes
    filteredProducts.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>Categoria: ${product.category}</h4>
            <p><b>Preço: R$ ${product.price}</b></p>
            <button class="adicionar-carrinho" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>`;
        productList.appendChild(productItem);
    });
}

// Função para carregar o carrinho na página "Carrinho"
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let total = 0;
  cart.forEach(product => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
          <img src="${product.img}" alt="${product.name}" class="cart-item-img">
          <div class="cart-item-details">
            <p><b>Nome:</b> ${product.name}</p>
            <p><b>Categoria:</b> ${product.category}</p>
            <p><b>Preço: R$${product.price}</b></p>
            <button class="remove-button" onclick="removeFromCart(${product.id})">X</button>
          </div>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += product.price;
  });

  document.getElementById("total-amount").innerText = total.toFixed(2);
}

// Função para adicionar o produto ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  
  localStorage.setItem("cart", JSON.stringify(cart));

  showNotification(`Você adicionou ${product.name} ao carrinho.`);
  updateCart();
}

// Função para atualizar os itens do carrinho e o total
function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";  // Limpar os itens existentes

  let total = 0;
  cart.forEach(product => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
          <img src="${product.img}" alt="${product.name}" class="cart-item-img">
          <div class="cart-item-details">
            <p><b>Nome:</b> ${product.name}</p>
            <p><b>Categoria:</b> ${product.category}</p>
            <p><b>Preço: R$${product.price}</b></p>
            <button class="remove-button" onclick="removeFromCart(${product.id})">X</button>
          </div>
      `;

      cartItemsContainer.appendChild(cartItem);
      total += product.price;
  });

  document.getElementById("total-amount").innerText = total.toFixed(2);
}

// Remove os itens do carrinho
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Encontra o produto no carrinho
  const product = cart.find(p => p.id === productId);

  if (product && product.quantity > 1) {
      product.quantity -= 1;
  } else {   
      cart = cart.filter(p => p.id !== productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(`Você removeu o ${product.name} do carrinho.`);
  updateCart();
}

// Função para renderizar todos os produtos inicialmente
function renderAllProducts() {
    renderProducts(products);
}
document.addEventListener("DOMContentLoaded", function() {
  renderAllProducts();
});

// Função para mostrar a notificação
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function applyPriceFilter() {
  const filterValue = document.getElementById("price-filter").value;
  let filteredProducts = [...products]; // Copiar todos os produtos inicialmente

  if (filterValue === "asc") {
      // Ordenar por menor preço
      filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filterValue === "desc") {
      // Ordenar por maior preço
      filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filterValue === "greater100") {
      // Filtrar produtos com preço maior que R$100
      filteredProducts = filteredProducts.filter(product => product.price >= 100);
  } else if (filterValue === "less100") {
      // Filtrar produtos com preço menor que R$100
      filteredProducts = filteredProducts.filter(product => product.price <= 100);
  }

  // Renderizar os produtos filtrados
  renderProducts(filteredProducts);
}



// Função para abrir o menu lateral
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";  // Largura do menu lateral ao ser aberto
    document.getElementById("main").style.marginLeft = "250px";  // Empurrar o conteúdo principal para a direita
}

// Função para fechar o menu lateral
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";  // Largura do menu lateral ao ser fechado
    document.getElementById("main").style.marginLeft = "0";  // Remover o empurrão do conteúdo principal
}

// Verificar se a página é "Carrinho" e carregar os dados
if (window.location.pathname.includes("cart.html")) {
    loadCart();  // Carregar carrinho na página de carrinho
}

// Função para limpar o carrinho
function clearCart() {
    // Limpa o carrinho no localStorage
    localStorage.removeItem("cart");

    // Atualiza a interface do carrinho
    updateCart();

    // Notifica o usuário
    showNotification("O carrinho foi limpo.");
}

//Função para o cartão de crédito
const cardNumberInput = document.getElementById("card-number");

cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1-");
    e.target.value = value;
});

// Função para o cartão CVV somente 3 números
const cvvInput = document.getElementById("card-cvv");

cvvInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
});

const cepInput = document.getElementById("cep");

// Função para o CEP somente números e formatação certa
cepInput.addEventListener("input", (e) => {
    let cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8); // Adiciona o "-"
    }
    e.target.value = cep; // Atualiza o valor formatado
});

const telefoneInput = document.getElementById("telefone");

// Função para o Telefone aceite somente números e formatação certa
telefoneInput.addEventListener("input", (e) => {
    let telefone = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (telefone.length > 0) {
        telefone = telefone.slice(0, 11); // Limita o número a 11 dígitos
    }
    if (telefone.length >= 2) {
        telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`; // Adiciona o DDD
    }
    if (telefone.length > 9) {
        telefone = `${telefone.slice(0, 9)}-${telefone.slice(9)}`; // Adiciona o traço
    }
    e.target.value = telefone; // Atualiza o valor formatado
});

// Função para o Email verificar se está correto com @hotmail/gmail/outlook
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const validDomains = ["gmail.com", "hotmail.com", "outlook.com"];
    
    // Verifica se o email possui "@" e um domínio válido
    const domain = email.split("@")[1];
    if (domain && validDomains.includes(domain)) {
        emailError.style.display = "none"; // Oculta a mensagem de erro
        emailInput.setCustomValidity(""); // Remove o estado de erro
    } else {
        emailError.style.display = "block"; // Exibe a mensagem de erro
        emailInput.setCustomValidity("Domínio inválido."); // Define o estado de erro
    }
});

// Função para o acessibilidade de texto
let currentFontSize = 100; // Tamanho inicial como percentual

function adjustFontSize(action) {
    const root = document.documentElement; // Seleciona o elemento <html>
    if (action === 'increase') {
        currentFontSize = Math.min(currentFontSize + 10, 150); // Limita o máximo a 150%
    } else if (action === 'decrease') {
        currentFontSize = Math.max(currentFontSize - 10, 80); // Limita o mínimo a 80%
    } else if (action === 'reset') {
        currentFontSize = 100; // Volta ao tamanho padrão
    }
    root.style.fontSize = `${currentFontSize}%`;
}


// Chamar a função de renderização com todos os produtos inicialmente
renderAllProducts();  // Inicializa a renderização dos produtos ao carregar a página
