import css from './css/styles.css';
import refs from '../src/refs/refs.js';
import fetchCountries from './js/fetchCountries.js';
import countriesList from './templates/countries-list.hbs';
import oneCountryInfo from './templates/one-country.hbs';
// імпорт з бібліотеки "lodash" підхіду "debounce"
import debounce from 'lodash/debounce';
// імпорт нотифікації , щоб необхідно зробити запит більш специфічним (і тем під неї)
import { error } from '@pnotify/core/';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const { input, articles } = refs;

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  e.preventDefault();
  clearMarkup();
  if (!e.target.value) {
    return;
  }
  fetchCountries(e.target.value)
    .then(data => {
      if (data.length === 1) {
        buildCountryMarkup(articles, data);
      }
      if (data.length > 1 && data.length <= 10) {
        buildList(articles, data);
      }
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
          delay: 2000,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function buildCountryMarkup(place, country) {
  place.insertAdjacentHTML('beforeend', oneCountryInfo(country));
}

function buildList(place, countries) {
  place.insertAdjacentHTML('beforeend', countriesList(countries));
}

function clearMarkup() {
  refs.articles.innerHTML = '';
}
