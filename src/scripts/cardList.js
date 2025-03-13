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
