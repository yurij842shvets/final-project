import { renderCardList } from './cardList';
import { eventsService } from './eventsService';

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
        // scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  });
}
