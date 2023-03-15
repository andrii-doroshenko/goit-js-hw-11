import PixabayApiService from './js/pixabay-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const pixabayApiService = new PixabayApiService();

const refs = {
  searchForm: document.querySelector('form#search-form'),
  imgesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

hideBtn(refs.loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;

  if (!pixabayApiService.query.trim()) {
    return fetchRjected();
  }

  pixabayApiService.resetPage();
  hideBtn(refs.loadMoreBtn);

  pixabayApiService.fetchImages().then(data => {
    clearContainer();

    if (data.totalHits === 0) {
      return fetchRjected();
    }

    appendImagesMarkup(data.hits);
    enebleBtn(refs.loadMoreBtn);

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  });
}

function onLoadMore(e) {
  pixabayApiService.fetchImages().then(data => {
    if (data.hits.length !== data.totalHits) {
      hideBtn(refs.loadMoreBtn);
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    appendImagesMarkup(data.hits);
  });
}

function imagesMarkup(img) {
  return `<div class="photo-card">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${img.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${img.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${img.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${img.downloads}
        </p>
      </div>
    </div>`;
}

function appendImagesMarkup(hits) {
  hits.map(img => {
    refs.imgesContainer.insertAdjacentHTML('beforeend', imagesMarkup(img));
  });
}

function clearContainer() {
  refs.imgesContainer.innerHTML = '';
}

function fetchRjected() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function enebleBtn(element) {
  element.classList.remove('is-hidden');
  element.disabled = false;
}

function hideBtn(element) {
  element.disabled = true;
  element.classList.add('is-hidden');
}
