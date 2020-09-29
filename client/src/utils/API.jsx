import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const apicv_key = process.env.REACT.APP.APICV_KEY;

console.log("api_key: ", api_key);
console.log("apicv_key: ", apicv_key);

export default {
  getSuperhero: function (name) {
    console.log("name", name);
    return axios.get(
      `${api_key}/search/${name}`
    );
  },
  getMoreInfo: function (name) {
    console.log("name", name);
    return axios.get(
      `${apicv_key}/search/${name}`
    )
  }
};
