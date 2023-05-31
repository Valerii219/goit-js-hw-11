const url = 'https://pixabay.com/api';
    const API_KEY = '36861352-2474982a97ff1b570eda1c4c2';
    const END_POINT ='image_type=photo&orientation=horizontal&safesearch=true'
export default class NewServices{
   
    constructor() {
        this.nameInput = "";
        this.page = 1;
    }
    
    fetchArticles() {
        console.log(this);
     return fetch(`${url}?key=${API_KEY}&q=${this.nameInput}&${END_POINT}&per_page=40&page=${this.page}`)
            .then(resp => resp.json())
            .then(data => {
                
                this.page +=1;
                return data.hits
            })
            .catch((err)=> console.log(err))
     
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