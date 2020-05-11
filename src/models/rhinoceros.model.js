const uuidv4 = require('uuid/v4');
const _ = require('lodash')
let rhinoceroses = require('../data');

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
  const groupedRhinoceroses = _.groupBy(rhinoceroses, 'species')

  const endanged = Object.values(groupedRhinoceroses).reduce((groupedRhinoceroses, currentGroup) => {
    if (currentGroup.length <= 2) {
      groupedRhinoceroses = [...groupedRhinoceroses, ...currentGroup]
    }
    return groupedRhinoceroses;
  }, [])

  console.log('wtf', endanged)
  return endanged
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
