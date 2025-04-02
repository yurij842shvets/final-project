import { cardEventListener } from './card';
import { renderCardList } from './cardList';
import { initFilters } from './filters';
import { renderPagination } from './pagination';

async function init() {
  await initFilters();
  await renderPagination();
  cardEventListener();
}

init();
