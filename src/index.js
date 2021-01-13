let breeds = [];
let dogImageContainer = document.getElementById('dog-image-container')
let dogBreedList = document.getElementById('dog-breeds');
let breedSelector = document.getElementById('breed-dropdown')

document.addEventListener('DOMContentLoaded', function () {
  fetchImages();
  fetchBreeds();
})

dogBreedList.addEventListener('click', function (e) {
  if (e.target && e.target.matches('li'))
  e.target.classList.add('active');
})

breedSelector.addEventListener('change', function (e) {
  filterBreeds(e.target.value)
})

function fetchImages() {
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(results => {
    results.message.forEach(img => {
      dogImageContainer.innerHTML += `<img src=${img} alt-text='dog' height='200' width='auto'><br>`
    })
  })
}

function fetchBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(results => {
    for (let key in results.message) {
      breeds.push(key);
    };
    displayBreeds(breeds);
  })
}

function displayBreeds(breeds) {
  dogBreedList.innerHTML = '';
  breeds.forEach(breed => addBreed(breed));
}

function addBreed(breed) {
  dogBreedList.innerHTML += `<li>${breed}</li>`
}

function filterBreeds(letter) {
  displayBreeds(breeds.filter(breed => breed.startsWith(letter)));
}
