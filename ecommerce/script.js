// Produtos fictícios
const products = [
    { id: 1, name: "Tikal", category: "Aventura", price: 100, img: "assets/images/jogo1.jpg"},
    { id: 2, name: "Gloomhaven", category: "RPG", price: 150, img: "assets/images/jogo2.jpg" },
    { id: 3, name: "Forbidden Island", category: "Cooperativo", price: 120, img: "assets/images/jogo3.jpg" },
    { id: 4, name: "Catan", category: "Competitivo", price: 80, img: "assets/images/jogo4.jpg" },
    { id: 5, name: "Codenames", category: "4 jogadores", price: 110, img: "assets/images/jogo5.jpg" },
    { id: 6, name: "Mansions of Madness", category: "Aventura", price: 100, img: "assets/images/jogo6.jpg" },
    { id: 7, name: "Descent: Journeys in the Dark", category: "RPG", price: 130, img: "assets/images/jogo7.jpg" },
    { id: 8, name: "Pandemic", category: "Cooperativo", price: 140, img: "assets/images/jogo8.jpg" }
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
            <p>Preço: R$ ${product.price}</p>
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
          <p>${product.img}</p>
          <p>${product.name}</p>
          <p>R$ ${product.price}</p>
          <button class="remove-button" onclick="removeFromCart(${product.id})">X</button>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += product.price;
  });

  document.getElementById("total-amount").innerText = total.toFixed(2);
}

// Função para adicionar o produto ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];  // Carregar carrinho existente ou criar um novo
  cart.push(product);
  
  // Armazenar carrinho atualizado no localStorage
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

      // Cria o conteúdo do item
      cartItem.innerHTML = `
          <p>${product.img}</p>
          <p>${product.name}</p>
          <p>R$ ${product.price}</p>
          <button class="remove-button" onclick="removeFromCart(${product.id})">X</button>
      `;

      cartItemsContainer.appendChild(cartItem);
      total += product.price;
  });

  // Atualiza o valor total no carrinho
  document.getElementById("total-amount").innerText = total.toFixed(2);
}

// Remove os itens do carrinho
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Encontra o produto no carrinho
  const product = cart.find(p => p.id === productId);

  if (product && product.quantity > 1) {
      // Se o produto tiver mais de 1 quantidade, diminui a quantidade
      product.quantity -= 1;
  } else {
      // Se a quantidade for 1 ou menos, remove o item completamente
      cart = cart.filter(p => p.id !== productId);
  }

  // Atualiza o localStorage com o novo carrinho
  localStorage.setItem("cart", JSON.stringify(cart));

  // Atualiza a interface do carrinho
  showNotification(`Você removeu o ${product.name} do carrinho.`);
  updateCart();
}

// // Função para deletar os itens do carrinho
// function removeFromCart(productId) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Carregar carrinho existente ou criar um novo
//   cart = cart.filter(product => product.id !== productId);  // Filtra o item e remove o produto com o id correspondente

//   // Armazenar carrinho atualizado no localStorage
//   localStorage.setItem("cart", JSON.stringify(cart));

//   // Atualiza a lista de produtos exibida
//   updateCart();
// }

// Função para renderizar todos os produtos inicialmente
function renderAllProducts() {
    renderProducts(products);
}

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
const creditCardInput = document.getElementById("credit-card");

creditCardInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.substring(0, 16);
  const formattedValue = value.match(/.{1,4}/g)?.join("-") || "";
  e.target.value = formattedValue;
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
