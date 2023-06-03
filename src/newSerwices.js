const url = 'https://pixabay.com/api';
    const API_KEY = '36861352-2474982a97ff1b570eda1c4c2';
    const END_POINT ='image_type=photo&orientation=horizontal&safesearch=true'
  
export default class NewServices{
    constructor() {
        this.nameInput = "";
        this.page = 1;
    }
    async fetchArticles() {
        const option = {
            baseURL: 'https://pixabay.com/api',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const resp = await fetch(`https://pixabay.com/api?key=${API_KEY}&q=${this.nameInput}&${END_POINT}&per_page=40&page=${this.page}` );
            const result = await resp.json();
            this.totalHitsResult = result.totalHits;
            this.page +=1;
            if(this.page )
            return result.hits;
            
            
        } catch (error) {
            console.log(error)
        }
    }
  
    totalHits(){
        return this.totalHitsResult;
    }
    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.nameInput;
    }
    set query(newQuery){
        this.nameInput = newQuery;
    }
}