import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages(query) {
    const options = {
      params: {
        key: '27407559-16eca6dd65687bb41f2493a6b',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: this.per_page,
        page: this.page,
        q: this.query,
      },
    };

    try {
      const URL = `https://pixabay.com/api/`;

      const response = await axios.get(URL, options);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}
