import { eventsService } from './eventsService';
import { updateContent } from './updateContent';

const search = document.getElementById('search');
const countrySelect = document.getElementById('countrySelect');

function debounce(callback, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

async function handleSearch(e) {
  const { value } = e.target;
  eventsService.setSearchKeyword(value);
  await updateContent();
}

async function handelSelect(e) {
  const { value } = e.target;
  eventsService.setCountryCode(value);
  await updateContent();
}

export async function initFilters() {
  search.addEventListener('input', debounce(handleSearch, 500));
  countrySelect.addEventListener('change', handelSelect);

  await updateContent();
}
