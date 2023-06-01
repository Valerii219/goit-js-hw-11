import Notiflix from 'notiflix';
import NewServices from './newSerwices';
import LoadButton from './buttonOptions';

const form  = document.querySelector('.search-form');
const gallary = document.querySelector('.gallery');
const load = document.querySelector('.load-more');



const newSerwice = new NewServices();


const LoadMoreButton = new LoadButton({
  selector: '[data-action="load"]',
  hidden:true,
  
})
console.log(LoadMoreButton);

form.addEventListener('submit', onSearch);
LoadMoreButton.refs.button.addEventListener('click', onLoad);

function onSearch(e){
e.preventDefault();
clearContainer()
newSerwice.query = e.currentTarget.elements.searchQuery.value;
if(newSerwice.query === ""){
  return alert('You need to enter certain data')
}
// LoadMoreButton.show()
// LoadMoreButton.disable()


newSerwice.resetPage()
newSerwice.fetchArticles().then(addMarkupOnPage)



}

function onLoad(){

  newSerwice.fetchArticles().then(addMarkupOnPage);
}
function addMarkupOnPage(hits){
    gallary.insertAdjacentHTML('beforeend',createMarkup(hits))
    if(hits.length === 0){
      alert("Sorry, there are no images matching your search query. Please try again.");
        load.hidden = true;
      
    }
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


