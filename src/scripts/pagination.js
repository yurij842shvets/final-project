import cardList from './cardList.js';
// import eventsService from './eventsservice.js';    error

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

        $('.paginationjs-page').removeClassList('active');
        $(`.paginationjs-page[data-num="${pageNumber}"]`).addClassList('active');
      },
    });
  });
}