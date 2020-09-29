import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

console.log("api_key: ", api_key);

export default {
  getSuperhero: function (name) {
    console.log("name", name);
    return axios.get(
      `${api_key}/search/${name}`
    );
  },
};
