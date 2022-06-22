'use strict';
const app = new Vue({
    el: '#app',
    // data: {
    //     catalogUrl: '/catalogData.json',
    //     cartUrl: '/getBasket.json',
    //     url: '',
    //     imgProduct: 'https://via.placeholder.com/200x150', //placehold.it
    //     imgCart: 'https://via.placeholder.com/50x100',
    //     userSearch: '',
    //     products: [], // массив полученных товаров из json файла
    //     filtered: [], // массив полученных товаров из json файла
    //     cartItems: [], // массив товаров в корзине хранится в json файле
    //     showCart: true,
    //     error: false
    // },
    data: {
        showCart: false,
        error: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.error = true;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => { this.$refs.error.text = error; })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => { this.$refs.error.text = error; })
        },
        delJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(result => result.json())
                .catch(error => { this.$refs.error.text = error; })
        },

        // filter() {
        //     let regexp = new RegExp(this.userSearch, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name));
        // },
        menuOpen() {
            this.$refs.menu.classList.remove('main-nav--close');
        },
        menuClose() {
            this.$refs.menu.classList.add('main-nav--close');
        },


    },

    mounted() {

    }
});