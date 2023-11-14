const POKEAPI = "https://pokeapi.co/api/v2/pokemon";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const loadPokemon = async (url) => {
  try {
    const infoPokemon = {};

    for (let i = 1; i <= 151; i++) {
      infoPokemon[i] = await fetchData(`${url}/${i}`);
    }

    return infoPokemon;
  } catch (error) {
    console.error(error);
  }
};

const createCardPokemon = async (url) => {
  try {
    const infoPokemon = await loadPokemon(url);
    const cardsPokemon = document.querySelector(".cardsPokemon");

    for (let i = 1; i <= 151; i++) {
      const divCard = document.createElement("div");
      divCard.classList.add("card");
      const divInfoPokemon = document.createElement("div");
      divInfoPokemon.classList.add("infoPokemon");
      const divTypePokemon = document.createElement("div");
      divTypePokemon.classList.add("typePokemon");
      const imgPokemon = document.createElement("img");
      const orderPokemon = document.createElement("p");
      const namePokemon = document.createElement("p");
      const typeOnePokemon = document.createElement("p");
      const typeTwoPokemon = document.createElement("p");

      imgPokemon.src = infoPokemon[i]?.sprites?.other?.dream_world?.front_default;
      namePokemon.textContent = `${infoPokemon[i]?.name}`.toUpperCase();
      typeOnePokemon.textContent = `${infoPokemon[i]?.types[0]?.type?.name}`.toUpperCase();
      typeTwoPokemon.textContent = infoPokemon[i]?.types[1]?.type?.name === undefined ? null : `${infoPokemon[i]?.types[1]?.type?.name}`.toUpperCase();

      typeOnePokemon.classList.add(`${infoPokemon[i]?.types[0]?.type?.name}`);
      typeTwoPokemon.classList.add(typeTwoPokemon.textContent === null ? "onlyType" : `${infoPokemon[i]?.types[1]?.type?.name}`);

      const numberOderPokemon = infoPokemon[i]?.id;

      if (numberOderPokemon < 10) {
        orderPokemon.textContent = `#00${numberOderPokemon}`;
      } else if (numberOderPokemon < 100) {
        orderPokemon.textContent = `#0${numberOderPokemon}`;
      } else {
        orderPokemon.textContent = `#${numberOderPokemon}`;
      }

      divCard.appendChild(imgPokemon);
      divInfoPokemon.appendChild(orderPokemon);
      divInfoPokemon.appendChild(namePokemon);
      divTypePokemon.appendChild(typeOnePokemon);
      divTypePokemon.appendChild(typeTwoPokemon);
      cardsPokemon.appendChild(divCard);
      divCard.appendChild(divInfoPokemon);
      divCard.appendChild(divTypePokemon);
    }
  } catch (error) {
    console.error(error);
  }
};

createCardPokemon(POKEAPI);

const typePokemonsButtons = document.querySelectorAll(".btn-header");

typePokemonsButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const type = event.target.textContent;
    filterCardPokemon(type);
  });
});

const filterCardPokemon = (type) => {
  const cardsPokemon = document.querySelector(".cardsPokemon");
  const divCard = cardsPokemon.querySelectorAll(".card");

  divCard.forEach((card) => {
    const divTypePokemon = card.querySelector(".typePokemon");
    const typeOne = divTypePokemon.querySelector("p:nth-child(1)").textContent;
    const typeTwo = divTypePokemon.querySelector("p:nth-child(2)").textContent;

    if (typeOne === type.toUpperCase() || typeTwo === type.toUpperCase() || type === "Show all") {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
};

const searchPokemonsInput = document.getElementById("searchPokemons");

searchPokemonsInput.addEventListener("keyup", (event) => {
  const namePokemonInput = event.target.value;

  const cardsPokemon = document.querySelector(".cardsPokemon");
  const divCard = cardsPokemon.querySelectorAll(".card");

  divCard.forEach((card) => {
    const divInfoPokemon = card.querySelector(".infoPokemon");
    const namePokemon =
      divInfoPokemon.querySelector("p:nth-child(2)").textContent;

    if (namePokemon.startsWith(namePokemonInput.toUpperCase())) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
