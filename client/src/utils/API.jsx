import axios from "axios";

export default {
  getMoreInfo: function (name) {
    return axios.get(
      "/api/comicvine/"+name
    );
  },
  getSuperhero: function (name) {
    return axios.get("/api/superhero/"+name)
  },
  // getComicVine: function () {
  //   return axios.get(`http://www.comicvine.com/api`);
  // },
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


