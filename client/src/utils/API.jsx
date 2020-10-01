import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const apicv_key = process.env.REACT.APP.APICV_KEY;

console.log("api_key: ", api_key);
console.log("apicv_key: ", apicv_key);

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

  //  getSuperheroID: function (name) {
  //   console.log("name", name);
  //   return axios.get(
  //     `https://comicvine.gamespot.com/api/characters/?api_key=${apicv_key}&format&json&filter=name:${name}`
  //   )
  // },
  
  // getMoreInfo: function (superHeroID.id) {
  //   console.log("getMoreInfo", getMoreInfo);
  //   return axios.get(
  //     `https://comicvine.gamespot.com/api/character/4005-${superHeroID.id}/?api_key=${apicv_key}&format&json`
  //   )
  // } 


};

// https://comicvine.gamespot.com/api/character/4005-75487/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json
// https://comicvine.gamespot.com/api/characters/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json&filter=name:spiderman