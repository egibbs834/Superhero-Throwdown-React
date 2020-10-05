import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const apicv_key = process.env.REACT_APP_APICV_KEY;

export default {
  getSuperheroID: function (name) {
    return axios.get(
      `https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/characters/?api_key=${apicv_key}&format=json&filter=name:${name}`
    );
  },
  getMoreInfo: function (sh_id) {
    return axios.get(
      `https://cors-anywhere.herokuapp.com/https://comicvine.gamespot.com/api/character/4005-${sh_id}/?api_key=${apicv_key}&format=json`
    );
  },
  getSuperhero: function (name) {
    return axios.get(
      `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${api_key}/search/${name}`
    );
  },
  getComicVine: function () {
    return axios.get(`http://www.comicvine.com/api`);
  },
  getRandomVillain: function () {
    return axios({
      method: "GET",
      withCredentials: true,
      url: "/api/villain_data",
    });
  },

  addHero: function (heroToBeAdded) {
    return axios({
      method: "POST",
      data: heroToBeAdded,
      withCredentials: true,
      url: "/api/hero_data",
    });
  },

  getAllHeroes: function (username) {
    return axios({
      method: "GET",
      withCredentials: true,
      url: `/api/universe/${username}`,
    });
  },

  registerUsername: function (data) {
    return axios({
      method: "POST",
      data: {
        username: data.registerUsername,
        password: data.registerPassword,
      },
      withCredentials: true,
      url: "/api/signup",
    });
  },
  handleLogin: function (data) {
    return axios({
      method: "POST",
      data: {
        username: data.loginUsername,
        password: data.loginPassword,
      },
      withCredentials: true,
      url: "/api/login",
    });
  },
  handleLogout: function () {
    return axios({
      method: "GET",
      withCredentials: true,
      url: "/logout",
    });
  },
};

// https://comicvine.gamespot.com/api/character/4005-75487/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json
// https://comicvine.gamespot.com/api/characters/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json&filter=name:
