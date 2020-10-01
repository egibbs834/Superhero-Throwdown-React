import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

console.log("api_key: ", api_key);

export default {
  getSuperhero: function (name) {
    console.log("name", name);
    return axios.get(
      `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${api_key}/search/${name}`
    );
  },
  getRandomVillain: function () {
    return axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/api/villain_data",
    });
  },

  addHero: function (heroToBeAdded) {
    console.log({ heroToBeAdded });
    return axios({
      method: "POST",
      data: heroToBeAdded,
      withCredentials: true,
      url: "http://localhost:3001/api/hero_data",
    });
  },
};

// https://comicvine.gamespot.com/api/character/4005-75487/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json
// https://comicvine.gamespot.com/api/characters/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json&filter=name:spiderman
