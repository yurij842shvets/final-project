import cardListTemplate from '../templates/cards.hbs';
import { eventsService } from './eventsService';

const cardsContainer = document.getElementById('cardsWrapper');

function getPreparedCards(cards) {
  return cards.map(card => {
    return {
      id: card.id,
      title: card.name,
      imageUrl: card.images[0]?.url,
      time: card.dates?.start?.localDate,
      country: card._embedded?.venues[0]?.country?.name,
    };
  });
}

export async function renderCardList() {
  const cards = await eventsService.getEvents();
  const prepareCards = getPreparedCards(cards);
  const html = cardListTemplate({
    cards: prepareCards,
  });
  cardsContainer.innerHTML = html;
}

export async function updateCardList(filters = {}) {
  if ('keywords' in filters) {
    eventsService.setSearchKeyword(filters.keywords);
  }
  if ('countryCode' in filters) {
    eventsService.setCountryCode(filters.countryCode);
  }
  if ('page' in filters) {
    eventsService.setPage(filters.page);
  }

  await renderCardList();
}
