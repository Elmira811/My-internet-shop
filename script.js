const items = [
  {
    title: "Машинка на пульте управления",
    description: "Зарядка от сети, 2 режима скорости",
    tags: ["boys"],
    price: "75.00",
    img: "img/car-with-remote.jpg",
    rating: 4.6,
  },
  {
    title: "Кукла Barbie",
    description: "Любимая подружка на все времена",
    tags: ["girls"],
    price: "53.70",
    img: "img/doll.jpg",
    rating: 4.8,
  },
  {
    title: "Паззл «Микки Маус»",
    description: "Развивает логическое мышление",
    tags: ["boys", "girls"],
    price: "12.00",
    img: "img/puzzle.jpg",
    rating: 5.0,
  },
  {
    title: "Мяч футбольный",
    description: "Активные игры на природе",
    tags: ["boys", "girls"],
    price: "47.00",
    img: "img/ball.jpg",
    rating: 4.9,
  },
  {
    title: "Конструктор",
    description: "Воплощать фантазии легко",
    tags: ["boys", "girls"],
    price: "39.40",
    img: "img/constructor.jpg",
    rating: 3.7,
  },
  {
    title: "Набор парикмахера",
    description: "Всё, что нужно для юного парикмахера",
    tags: ["girls"],
    price: "16.50",
    img: "img/hairdresser-kit.jpg",
    rating: 2.9,
  },
  {
    title: "Робот-трансформер",
    description: "Игрушка 2 в 1",
    tags: ["boys"],
    price: "23.90",
    img: "img/robot.jpg",
    rating: 4.5,
  },
  {
    title: "Кукольный дом",
    description: "Мечта любой девочки",
    tags: ["girls"],
    price: "193.00",
    img: "img/doll-house.jpg",
    rating: 5.0,
  },
  {
    title: "Игрушка «Человек-паук»",
    description: "Стань супергероем!",
    tags: ["boys"],
    price: "21.00",
    img: "img/spider-man.jpg",
    rating: 3.8,
  },
  {
    title: "Набор для песочницы",
    description: "Развитие моторики для самых маленьких",
    tags: ["boys", "girls"],
    price: "14.50",
    img: "img/sandbox-kit.jpg",
    rating: 3.9,
  },
  {
    title: "Настольная игра «Сумасшедший лабиринт»",
    description: "Игра для всей семьи",
    tags: ["boys", "girls"],
    price: "107.80",
    img: "img/board-game.jpg",
    rating: 4.3,
  },
  {
    title: "Погремушка",
    description: "Первая игрушка малыша",
    tags: ["boys", "girls"],
    price: "9.60",
    img: "img/rattle.jpg",
    rating: 4.4,
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function makeItemCard(shopItem) {
  const {title, description, tags, price, img, rating} = shopItem;

  const item = itemTemplate.content.cloneNode(true);

  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price} Br`;

  const ratingContainer = item.querySelector(".rating");

  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsContainer = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsContainer.append(element);
  })

  return item;
}

function renderItems(arr) {
  nothingFound.textContent = "";

  itemsContainer.innerHTML = "";

  arr.forEach((item) => {
    itemsContainer.append(makeItemCard(item));
  });

  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
 
  if (a.title < b.title) {
    return -1;
  }
  
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  
  renderItems(currentState);
});

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );

  currentState.sort((a, b) => sortByAlphabet(a, b));

  sortControl.selectedIndex = 0;

  renderItems(currentState);
}

searchButton.addEventListener("click", applySearch);

searchInput.addEventListener("search", applySearch);