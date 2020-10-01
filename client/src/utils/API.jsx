import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
// const apicv_key = process.env.REACT.APP.APICV_KEY;

console.log("api_key: ", api_key);
// console.log("apicv_key: ", apicv_key);

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

  addHero: function(hero) {
    console.log("API.jsx Hero: ", hero);
    return axios({
      method: "POST",
      data: hero,
      withCredentials: true,
      url: "http://localhost:3001/api/hero_data",
    });
  },
};

