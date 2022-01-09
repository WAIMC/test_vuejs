Vue.config.devtools = true;
Vue.component('product', {
    props :{
        premium : {
            type : Boolean,
            required : true
        }
    },
    template : `
        <div class="product-container">

            <div class="product-image">
                <img :src="image" alt="">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>shipping : {{shipping}} </p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <!-- use v-on:action or @action action(click, mouseover,..) -->
                <div  v-for="(variant, index) in variants" 
                        :key="variant.variantId"
                        class="color-box"
                        :style="{background : variant.variantColor}"
                        @mouseover="updateProduct(index)">
                </div>

                <button class="button" 
                        v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{disabledButton : !inStock}">
                    Add to Cart
                </button>
                

            </div>

            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no review yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>Name : {{ review.name }}</p>
                    <p>Review : {{ review.review }}</p>
                    <p>Rating : {{ review.rating }}</p>
                </li>
            </ul>

            <product-review @review-submitted="addReview"></product-review>

        </div>
    `,
    data () {
        return {
            brand : 'Vue Mastery',
            product : 'Socks',
            // inStock : true,
            // image : '../../assets/images/socks_green.jpg',
            selectedVariant : 0,
            details : ["80% cotton", "20% polyester", "Gender-neutral"],
            variants : [
                {
                    variantId : 2234,
                    variantColor : "Green",
                    variantImage : '../../assets/images/socks_green.jpg',
                    variantQuantity : 10
                },
                {
                    variantId : 2235,
                    variantColor : "Blue",
                    variantImage : '../../assets/images/socks_blue.jpg',
                    variantQuantity : 0
                }
            ],
            reviews : [],
            message : 'this is message' + new Date().toLocaleString()
        }
    },
    methods : {
        addToCart : function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct : function (index) {  
            this.selectedVariant = index
        },
        addReview : function (productReview) {  
            this.reviews.push(productReview)
        }
    },
    computed : {
        title(){
            return this.brand + ' ' + this.product 
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping () {
            if(this.premium)
                return "Free"
            return 2.99
        }
    }
})

Vue.component('product-review', {
    template : `
        <form class="review-info" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error  }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name :</label>
                <input v-model="name" id="name" />
            </p> 

            <p>
                <label for="review">Review:</label>
                <textarea v-model="review" id="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                <input type="submit" value="submit"/>
            </p>
        </form>
    `,
    data () {
        return {
            name : null,
            review : null,
            rating : null,
            errors : []
        }
    },
    methods : {
        onSubmit (){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name : this.name,
                    review : this.review,
                    rating : this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("review required.")
                if(!this.rating) this.errors.push("rating required.")
            }
        }
    }
})


var app = new Vue({
    el : '#app',
    data : {
        premium : true,
        cart : []
    },
    methods :{
        updateCart(id){
            this.cart.push(id)
        }
    }
})
