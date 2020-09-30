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
};
