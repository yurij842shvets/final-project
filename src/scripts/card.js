import modalTemplate from '../templates/modal.hbs';
import { eventsService } from './eventsService';

const modalContainer = document.getElementById('modalContainer');
const modalOverlay = document.getElementById('modalOverlay');

function getPreparedCard(data) {
  const preparedData = {
    topImg: data.images[0]?.url,
    banner: data.images[0]?.url,
    info: data._embedded?.venues[0]?.accessibleSeatingDetail,
    date: data.dates?.start?.localDate,
    time: data.dates?.start.localTime,
    where: `${data._embedded?.venues[0]?.city?.name}, ${data._embedded?.venues[0]?.country?.name}`,
    who: data._embedded?.attractions[0]?.name,
    price1:
      data.priceRanges && data.priceRanges[0]
        ? `${data.priceRanges[0]?.min} - ${data.priceRanges[0]?.max} ${data.priceRanges[0]?.currency} `
        : 'No price',
    price2:
      data.priceRanges && data.priceRanges[1]
        ? `${data.priceRanges[1]?.min} - ${data.priceRanges[1]?.max} ${data.priceRanges[1]?.currency} `
        : 'No price',
  };
  return preparedData;
}

async function onCardHandler(id) {
  const data = await eventsService.getEventById(id);

  const preparedCard = getPreparedCard(data);
  const html = modalTemplate({
    modal: preparedCard,
  });
  modalContainer.innerHTML = html;

  modalOverlay.style.display = 'block';
  modalContainer.style.display = 'block';
}

async function onClickHandler(e) {
  if (e.target.closest('.card')) {
    const card = e.target.closest('.card');
    const id = card.dataset.id;
    onCardHandler(id);
  } else if (e.target.closest('.modal-close') || e.target === modalOverlay) {
    modalContainer.innerHTML = '';
    modalOverlay.style.display = 'none';
    modalContainer.style.display = 'none';
  }
}

export function cardEventListener() {
  document.addEventListener('click', onClickHandler);
}
