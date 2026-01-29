import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import { lightbox } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const searchBtn = searchFormEl.querySelector('button[type="submit"]');
let lightbox;

const onSearchFormSubmit = evt => {
  evt.preventDefault();
  clearGallery();
  const searchQuery = evt.target.elements.searchText.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOutRight',
      timeout: 3000,
    });
    return;
  }

  searchBtn.disabled = true;
  showLoader();

  getImagesByQuery(searchQuery)
    .then(data => {
      if (!data.data.hits.length) {
        return Promise.reject(
          new Error(
            'Sorry, there are no images matching your search query. Please try again!'
          )
        );
      }
      return data.data.hits;
    })
    .then(photos => {
      iziToast.success({
        message: 'Successfully found images!',
        position: 'topRight',
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
        timeout: 3000,
      });

      galleryEl.insertAdjacentHTML('beforeend', createGallery(photos));

      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionsDelay: 250,
        });
      }

      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        message: error.message,
        position: 'topRight',
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
        timeout: 3000,
      });
      console.error('Axios error:', error);
    })
    .finally(() => {
      searchBtn.disabled = false;
      hideLoader();
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
