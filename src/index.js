import Notiflix from 'notiflix';

const API_KEY = '?key=36861352-2474982a97ff1b570eda1c4c2';
const URL = 'https://pixabay.com/api/'
const qParametr = '&q&image_type =photo&orientation=horizontal&safesearch=true&per_page=4&page=2'
const form  = document.querySelector('.search-form');
searchImages()

async function searchImages(){
    const resp = await fetch(`${URL}${API_KEY}${qParametr}`);
    const data = await resp.json();
    console.log(data);
    return data;
}
form.addEventListener('submit', (e) => {
e.preventDefault();
})

// post
// const option = {
//     method:'POST',
//     headers:{"Content-type":"aplication/json"
       
//     },
//     body: JSON.stringify({
//        title:"hello"
//     })
// }
// fetch(`${URL}posts`,option)
// .then(resp => console.log(resp))