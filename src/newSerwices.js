import axios from 'axios';
const url = 'https://pixabay.com/api';
    const API_KEY = '36861352-2474982a97ff1b570eda1c4c2';
    const END_POINT ='image_type=photo&orientation=horizontal&safesearch=true'
  
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
    }
    
    async fetchArticles() {
        try {
          const response = await axiosInstance.get(`?key=${API_KEY}&q=${this.nameInput}&${END_POINT}&per_page=40&page=${this.page}`);
          const result = response.data;
          this.totalHitsResult = result.totalHits;
          this.page += 1;
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
    
    
    
    
    
    

        