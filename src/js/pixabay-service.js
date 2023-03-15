export default class PixabayApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async fetchImages(query) {
    const axios = require('axios').default;

    const options = {
      params: {
        key: '27407559-16eca6dd65687bb41f2493a6b',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: this.page,
        q: this.query,
      },
    };

    try {
      const URL = `https://pixabay.com/api/`;

      const response = await axios.get(URL, options).then(response => {
        return response.data;
      });

      this.page += 1;

      return response;
    } catch (error) {
      console.log(error.code, error.stack);
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
