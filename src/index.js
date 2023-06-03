import Notiflix from 'notiflix';
import NewServices from './newSerwices';
import LoadButton from './buttonOptions';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const form  = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox(".gallery__link");

const newSerwice = new NewServices({
});

const LoadMoreButton = new LoadButton({
  selector: '[data-action="load"]',
  hidden:true,
 
})

form.addEventListener('submit', onSearch);
LoadMoreButton.refs.button.addEventListener('click', onLoad);

function onSearch(e){
  LoadMoreButton.hide()
e.preventDefault();
clearContainer()
newSerwice.query = e.currentTarget.elements.searchQuery.value;
if(newSerwice.query === ""){
  return Notiflix.Notify.info('You need to enter certain data')
}
LoadMoreButton.show();
LoadMoreButton.disable();
newSerwice.resetPage();
newSerwice.fetchArticles().then(hits =>
  {clearContainer();
    addMarkupOnPage(hits);
    LoadMoreButton.enable();
    const totalHits = newSerwice.totalHits();
    if(newSerwice.totalHits() > 0){
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    lightbox.refresh();
    const { height: cardHeight } = 
    gallery.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  });
}

function onLoad(){
  LoadMoreButton.disable();
  newSerwice.fetchArticles().then(hits =>{
      addMarkupOnPage(hits);
      LoadMoreButton.enable();
    });
}
function addMarkupOnPage(hits){
  gallery.insertAdjacentHTML('beforeend',createMarkup(hits))
    if(hits.length === 0){
      Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
      LoadMoreButton.hide();
   
    }
    lightbox.refresh();
}

function clearContainer(){
    gallery.innerHTML = "";
}
function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
    `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
      <img class = img-card src="${webformatURL}" alt="${tags}" loading="lazy"  data-source="${largeImageURL}"/></a>
      <div class="info">
        <p class="info-item">
          <b class = "bb" >Likes<span  class = span-opt>${likes}</span></b>
        </p>
        <p class="info-item">
        <b class = "bb" >Views<span class = span-opt>${views}</span></b>
      </p>
      <p class="info-item">
          <b class = "bb">Comments<span class = span-opt>${comments}</span></b>
        </p>
        <p class="info-item">
          <b class = "bb">Downloads<span class = span-opt>${downloads}</span></b>
        </p> 
      </div>
    </div>`)
  .join('')
}