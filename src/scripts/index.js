import { cardEventListener } from './card';
import { initFilters } from './filters';

async function init() {
  await initFilters();
  cardEventListener();
}

init();
