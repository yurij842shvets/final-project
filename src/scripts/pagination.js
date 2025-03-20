const api = `https://app.ticketmaster.com/discovery/v2/events?apikey=aUqRUZFGAS3PzeN62fcojeTe5M5Hd1TI`;
// fetch(api, {
//   method: 'GET',
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
// console.log(api._embedded.events.products.name, 'name of the event');

export function renderPagination() {
    const { totalPages } = eventsService.getPageData();
    $(document).ready(function () {
      const data = Array.from({ length: totalPages }, (_, i) => i);
      $('#pagination-container').pagination({
        dataSource: data,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: async function (_, { pageNumber }) {
          const page = pageNumber - 1;
          eventsService.setPage(page);
          await renderCardList();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      });
    });
  }
  