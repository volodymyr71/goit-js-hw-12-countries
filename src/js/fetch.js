import template from '../templates/drinks.hbs';
const drinksList = document.querySelector('.drinks');

// console.log(drinksList);

let _search = 'Margarita';
// let _search = 'sunrise';
let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${_search}`;

const myFirstFetch = fetch(url);
// console.log(myFirstFetch);

myFirstFetch
  .then(response => {
    // console.log(response);
    return response.json();
  })
  .then(result => {
    // console.log(result);
    const array = result.drinks;
    // array.map(el => console.log(el));
    const item = template(array);
    // console.log(item);
    drinksList.insertAdjacentHTML('afterbegin', item);
  });
