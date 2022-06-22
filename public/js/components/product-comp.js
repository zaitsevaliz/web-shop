Vue.component('product-vue', {
    data() {
        return {
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    template: `  <div class="first-row ">
				 <product v-for="item of filtered" 
				 :key="item.id_product"
				 :img="item.imgProduct"
				 :product="item"
                 @add-product="$parent.$refs.cart.addProduct">
				 </product>
				</div>
                `
});


Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="card1">
    <div class="products-overlay">
        <button class="btn-add" @click="$emit('add-product', product)">
            <img class="btn-add-img" src="img/bin.svg" alt="cart">
            <span class="btn-add-text"> Add to Cart </span>
        </button>
    </div>
    <img :src="img" class="card-img" alt="card1">
    <div class="card1-description">
        <a href="product.html" class="card-zag">{{product.product_name}}</a>
        <p class="product-par">{{product.description}}</p>
        <p class="price">$ {{product.price}}</p>
    </div>

</div>
	`
});

