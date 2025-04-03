const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = 'XoWdlrAgDbi7pRSRibKrECGRIIYtPAXc';

class EventsService {
  constructor() {
    this.events = [];
    this.keyword = '';
    this.countryCode = '';
    this.page = 0;
    this.size = 20;
    this.totalPages = 0;
  }

  getPageData() {
    return {
      page: this.page,
      totalPages: this.totalPages,
    };
  }

  getEvents() {
    const url = new URL(`${ROOT_URL}/events`);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('keyword', this.keyword);
    url.searchParams.append('page', this.page);
    url.searchParams.append('countryCode', this.countryCode);
    url.searchParams.append('size', this.size);

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.events = data?._embedded?.events ?? [];
        this.totalPages = data.page.totalPages;
        return this.events;
      });
  }

  getEventById(id) {
    const url = new URL(`${ROOT_URL}/events/${id}`);
    url.searchParams.append('apikey', API_KEY);

    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  }

  setSearchKeyword(keyword) {
    this.keyword = keyword;
    this.page = 0;
  }

  setCountryCode(countryCode) {
    this.countryCode = countryCode;
    this.page = 0;
  }
  setPage(page) {
    this.page = page;
  }
}

export const eventsService = new EventsService();
