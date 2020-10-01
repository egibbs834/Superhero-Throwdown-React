import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const apicv_key = process.env.REACT.APP.APICV_KEY;

console.log("api_key: ", api_key);
console.log("apicv_key: ", apicv_key);

export default {
  getSuperhero: function (name) {
    console.log("name", name);
    return axios.get(`https://superheroapi.com/api/${api_key}/search/${name}`);
  },
  getSuperheroID: function (name) {
    console.log("name", name);
    return axios.get(
      `https://comicvine.gamespot.com/api/characters/${name}/?api_key=${apicv_key}&field_list=id&format&json`
    )
  },
  
  getMoreInfo: function (shid) {
    console.log("shid", shid);
    return axios.get(
      `https://comicvine.gamespot.com/api/character/4005-${shid}/?api_key=${apicv_key}&format&json`
    )
  },

};

// https://comicvine.gamespot.com/api/character/4005-75487/?api_key=b84279396e62eefae65b678fe285ad3c06e136fb&format=json