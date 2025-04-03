import { renderCardList } from './cardList.js';
import { renderPagination } from './pagination.js';

export async function updateContent() {
  await renderCardList();
  await renderPagination();
}
