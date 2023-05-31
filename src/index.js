import Notiflix from 'notiflix';
import NewServices from './newSerwices';

const form  = document.querySelector('.search-form');
const gallary = document.querySelector('.gallery');
const load = document.querySelector('.js-load');

const newSerwice = new NewServices();
function onLoad(){

    newSerwice.fetchArticles().then(addMarkupOnPage);
}

form.addEventListener('submit', onSearch);
load.addEventListener('click', onLoad);

function onSearch(e){
e.preventDefault();
clearContainer()
newSerwice.query = e.currentTarget.elements.searchQuery.value;
newSerwice.resetPage()
newSerwice.fetchArticles().then(addMarkupOnPage);

}

function addMarkupOnPage(hits){
    gallary.insertAdjacentHTML('beforeend',createMarkup(hits));
}

function clearContainer(){
    gallary.innerHTML = "";
}
function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
    ` 
    <div class="photo-card">
    <a class="gallery__link" href="${webformatURL}">
<img
    class="gallery__image"
    src="${largeImageURL}" 
        alt="${tags}" 
        loading="lazy"
/> 
    <div class="info">
      <p class="info-item">
        <b>Likes:${likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${downloads}</b>
      </p>
    </div>
  </div> `).join()
}



