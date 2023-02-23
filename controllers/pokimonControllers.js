const MongoClient = require('mongodb').MongoClient;
const Pokimon = require('../models/pokimon');
const axios = require('axios');

async function fetchData({method, url}) {
  // fetchImnageBaseLink: concatinate it with id of pokimon and .png extension, then you have an link for the image.
  const fetchImageBaseLink = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'; 
  const response = await axios({
    method, url
  });
  
  
  // replace base url with fetchImageBaseLink, then add id.extenstion to have imgsrc

  response.data.results.forEach(pokimon => {
    let result = pokimon.url.replace(baseUrl, fetchImageBaseLink);
    result = result.substring(0, result.length - 1);
    pokimon.imgsrc = `${result}.png`;
  });

  // console.log(Array.isArray(response.data.results))
  // console.log('====================================')
  // console.log(response.data.results);

  return response.data.results;
}

// save pokimons to mongoodb
async function savePokimons(data) {
  Pokimon.insertMany(data)
            .then(() => {
              res.redirect('/');
            })
            .catch(error => {
              console.log(error);
            });
}

// fetch pokimons from API
const fetchPokimons = async (req, res) => {

  const data = await fetchData({
    method:"get",
    url:"https://pokeapi.co/api/v2/pokemon",
  });

  // console.log(process.env.DBURI)
  await savePokimons(data);
};

const index = async (req, res) => {
  Pokimon.find().then(data => {
    res.render('pokimon', {data});
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = {
  fetchPokimons,
  index
}