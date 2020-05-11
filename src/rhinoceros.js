const uuidv4 = require('uuid/v4');
const _ = require('lodash')
let rhinoceroses = require('./data');

exports.getAll = ({ name, species }) => {

  let results = rhinoceroses
  if (species) {
    results = rhinoceroses.filter(r => r.species === species)
  }
  if (name) {
    results = rhinoceroses.filter(r => r.name === name)
  }
  return results;
};

exports.getById = (id) => {
  return rhinoceroses.find(rh => rh.id === id)
};


exports.getAllEndanged = () => {
  const results = _.groupBy(rhinoceroses, 'species')
  console.log(results)
  return results
}

exports.newRhinoceros = data => {
  const newRhino = {
    id: uuidv4(),
    name: data.name,
    species: data.species,
  };
  rhinoceroses.push(newRhino);
  return newRhino;
};
