const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');

export const createGallery = images => {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
      <a href="${largeImageURL}">
      <div class="image-wrapper">
      <img class="gallery-item-photo" src="${webformatURL}" alt="${tags}">
      </div>
      </a>
      <div class="stats">
      <span class="stats-item">
      <p>Likes</p>
      <p>${likes}</p>
      </span>
      <span class="stats-item">
      <p>Views</p>
      <p>${views}</p>
      </span>
      <span class="stats-item">
      <p>Comments</p>
      <p>${comments}</p>
      </span>
      <span class="stats-item">
      <p>Downloads</p>
      <p>${downloads}</p>
      </span>
      </div>
    </li>`;
      }
    )
    .join('');
};

export const clearGallery = () => {
  galleryEl.innerHTML = '';
};

export const showLoader = () => {
  loaderEl.classList.remove('is-hidden');
};

export const hideLoader = () => {
  loaderEl.classList.add('is-hidden');
};
