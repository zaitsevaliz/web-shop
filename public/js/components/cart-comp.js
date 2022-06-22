const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart-vue', {
    data() {
        return {
            cartItems: [],
            counter() {
                let cartCount = 0;
                for (let item of this.cartItems) {
                    cartCount += item.quantity;
                }
                this.$parent.$refs.count.innerText = cartCount;
            }
        }

    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                            this.counter();
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                            this.counter();
                        }
                    })
            }
            this.cartCount++;
        },
        remove(item) {
            this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                .then(data => {
                    if (data.result === 1) // минус 1 товар в файле, возвращаем result: 1 
                    {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.$parent.delJson(`/api/cart/${item.id_product}`)
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                        this.counter();
                    }

                })
            this.cartCount--;
        },
    },


    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
                this.counter();
            });
    },
    template:
        `
    <div class="cart"  v-show="$parent.showCart">		
        <div class="cart-block">
            <cart-item v-for="item of cartItems" 
            :key="item.id_product" 
            :img="item.imgProduct" 
            :cart-item="item" @remove="remove">
            </cart-item>
        </div>
    </div>
`
});


Vue.component('cart-item', {
    props: ['img', 'cart-item'],
    template: `
    <div class="cart-item">
    <div class="product-bio">
        <img :src="img" alt="Some img"  style="width: 70px;">
        <div class="product-desc">
            <div class="product-cart-title">{{ cartItem.product_name }}</div>
            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
            <div class="product-single-price">$ {{ cartItem.price }} each</div>
        </div>
    </div>
    <div class="right-block">
        <div class="product-price-cart">{{ Math.round((cartItem.quantity * cartItem.price)* Math.pow(10, 2))/Math.pow(10, 2) }}</div>
        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
    </div >
</div >
`
});