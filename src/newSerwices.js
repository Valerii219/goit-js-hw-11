import axios from 'axios';
import Notiflix from 'notiflix';
import LoadButton from './buttonOptions';
const url = 'https://pixabay.com/api';
    const API_KEY = '36861352-2474982a97ff1b570eda1c4c2';
    const END_POINT ='image_type=photo&orientation=horizontal&safesearch=true'
    const LoadMoreButton = new LoadButton({
      selector: '[data-action="load"]',
      hidden:true,
    })
    const axiosInstance = axios.create(
        {
        baseURL: url,
        headers: {
          'Content-Type': 'application/json',
        },
      });
export default class NewServices{
    constructor() {
        this.nameInput = "";
        this.page = 1;
        this.totalHitsResult = 0;
        this.totalPagesResult = 0;
    }
    
    async fetchArticles() {
        try {
          const response = await axiosInstance.get(`?key=${API_KEY}&q=${this.nameInput}&${END_POINT}&per_page=40&page=${this.page}`);
          const result = response.data;
          console.log(result);
          this.totalHitsResult = result.totalHits;
          this.totalPagesResult = Math.ceil(result.totalHits / 40);
          this.page += 1;
          if (this.page <= this.totalPagesResult) {
            console.log(this.totalPagesResult);
            console.log(this.page);
          } else {
            LoadMoreButton.hide();
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results")
          } 
          return result.hits;
        } catch (error) {
          console.error(error);
        }
      }
    
      totalHits() {
        return this.totalHitsResult;
      }
    
      resetPage() {
        this.page = 1;
      }
    
      get query() {
        return this.nameInput;
      }
    
      set query(newQuery) {
        this.nameInput = newQuery;
      }
    }
    
    
    
    
    
    

        