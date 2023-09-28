import data from "./data.json" assert { type: "json" };

const originalArr = data;

const mainColor = "hsl(180, 29%, 50%)";

let filters = [];

function createFilterBar() {
  const container = document.querySelector(".container");
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  const containerForFilters = document.createElement("div");
  containerForFilters.classList.add("wrapper-for-filters");

  container.insertBefore(searchContainer, container.firstChild);

  const clearBtn = document.createElement("span");
  clearBtn.classList.add("clear-btn");
  clearBtn.textContent = "Clear";
  searchContainer.appendChild(containerForFilters);
  searchContainer.appendChild(clearBtn);
}
createFilterBar();

function createCard(data) {
  const cardContainer = document.querySelector(".container");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("container-for-card");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left-div");

  const img = document.createElement("img");
  img.src = data.logo;
  leftDiv.appendChild(img);

  const nameTagsDiv = document.createElement("div");
  nameTagsDiv.classList.add("name-tags");

  const nameDiv = document.createElement("div");
  const nameP = document.createElement("p");
  nameP.textContent = data.company;
  nameDiv.style.color = mainColor;
  nameDiv.appendChild(nameP);
  nameTagsDiv.appendChild(nameDiv);

  if (data.new) {
    const newDiv = document.createElement("div");
    newDiv.classList = "new";
    const newP = document.createElement("p");
    newP.textContent = "NEW!";
    newDiv.appendChild(newP);
    nameTagsDiv.appendChild(newDiv);
  }

  if (data.featured) {
    const featuredDiv = document.createElement("div");
    featuredDiv.classList = "featured";
    const featuredP = document.createElement("p");
    featuredP.textContent = "FEATURED";
    featuredDiv.appendChild(featuredP);
    nameTagsDiv.appendChild(featuredDiv);
  }

  const cardDescriptionDiv = document.createElement("div");
  cardDescriptionDiv.classList.add("card-description");

  cardDescriptionDiv.appendChild(nameTagsDiv);
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.textContent = data.position;
  cardDescriptionDiv.appendChild(titleDiv);

  const generalInfoDiv = document.createElement("div");
  generalInfoDiv.classList.add("general-info");
  const infoItems = [data.postedAt, data.contract, data.location];

  infoItems.forEach((itemText, index) => {
    const itemDiv = document.createElement("div");
    if (index < infoItems.length - 1) {
      itemText += "\u00A0\u00A0\u00A0.\u00A0\u00A0\u00A0";
    }

    itemDiv.textContent = itemText;

    generalInfoDiv.appendChild(itemDiv);
  });

  cardDescriptionDiv.appendChild(generalInfoDiv);

  leftDiv.appendChild(cardDescriptionDiv);

  const rightDiv = document.createElement("div");
  rightDiv.classList.add("right-div");

  const roleDiv = document.createElement("div");
  roleDiv.classList = "languages";
  roleDiv.textContent = data.role;
  rightDiv.appendChild(roleDiv);

  const levelDiv = document.createElement("div");
  levelDiv.classList = "languages";
  levelDiv.textContent = data.level;
  rightDiv.appendChild(levelDiv);

  data.languages.forEach((language) => {
    const tagDiv = document.createElement("div");
    tagDiv.classList = "languages";
    tagDiv.textContent = language;
    rightDiv.appendChild(tagDiv);
  });

  data.tools.forEach((tool) => {
    const toolDiv = document.createElement("div");
    toolDiv.classList = "languages";
    toolDiv.textContent = tool;
    rightDiv.appendChild(toolDiv);
  });

  cardDiv.appendChild(leftDiv);
  cardDiv.appendChild(rightDiv);

  cardContainer.appendChild(cardDiv);

  rightDiv.addEventListener("click", (event) => {
    const searchContainer = document.querySelector(".search-container");
    searchContainer.style.opacity = 1;
    const element = event.target;
    if (
      element &&
      event.target.classList.contains("languages") &&
      !filters.includes(element.textContent)
    ) {
      createFilterCard(element.textContent);
      filters.push(element.textContent);
      //   debugger;
      filter(originalArr, filters);
    }
  });
}

function filter(originalData, filters) {
  const resultArr = originalData.filter((data) => {
    const { role, level, languages, tools } = data;

    const isMatch = filters.every((filter) =>
      [role, level, ...languages, ...tools].includes(filter)
    );

    return isMatch;
  });

  initialize(resultArr);
}

function createFilterCard(title) {
  const containerForFilters = document.querySelector(".wrapper-for-filters");

  const filterCard = document.createElement("div");
  filterCard.classList.add("filter-card");

  const filterTitle = document.createElement("div");
  filterTitle.classList.add("filter-title");
  filterTitle.textContent = title;

  const closeSvg = document.createElement("img");
  closeSvg.classList.add("close-btn");
  closeSvg.src = "./images/icon-remove.svg";

  filterCard.appendChild(filterTitle);
  filterCard.appendChild(closeSvg);

  closeSvg.addEventListener("click", () => {
    const filterIndex = filters.indexOf(title);
    if (filterIndex !== -1) {
      filters.splice(filterIndex, 1);
    }
    if (filters.length === 0) {
      searchContainer.style.opacity = 0;
    }

    filter(originalArr, filters);

    containerForFilters.removeChild(filterCard);
  });

  if (containerForFilters && containerForFilters.children.length > 0) {
    containerForFilters.insertBefore(
      filterCard,
      containerForFilters.firstChild
    );
  } else {
    containerForFilters.appendChild(filterCard);
  }
}

const clearButton = document.querySelector(".clear-btn");

const searchContainer = document.querySelector(".search-container");
clearButton.addEventListener("click", () => {
  initialize(data);
  searchContainer.style.opacity = 0;
  filters = [];
  const filterContainer = document.querySelector(".wrapper-for-filters");
  const children = filterContainer.querySelectorAll(".filter-card");

  children.forEach((child) => {
    filterContainer.removeChild(child);
  });
});

function initialize(data) {
  const container = document.querySelector(".container");
  const children = Array.from(container.children);

  if (children.length > 1) {
    for (let i = children.length - 1; i > 0; i--) {
      container.removeChild(children[i]);
    }
  }

  data.forEach((data) => {
    createCard(data);
  });
}

initialize(data);
