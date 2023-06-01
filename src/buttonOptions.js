class LoadButton {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);
        hidden && this.hide();
     }

    getRefs(selector){
        const refs = {};
        refs.button = document.querySelector(selector);
        // refs.load = refs.button.querySelector('.load-more');
        return refs;
    }

    enable(){
this.refs.button.disabled = false;
// this.refs.textContent = 'Loadmore';
    }

    disable(){
        this.refs.button.disabled = true;
        this.refs.button.textContent = 'loading'
        // this.refs.textContent = 'Loading'
            }
            show(){
                this.refs.button.classList.remove('is-hidden');
            }
            hide(){
                this.refs.button.classList.add('is-hidden');
            }
}
export default LoadButton;