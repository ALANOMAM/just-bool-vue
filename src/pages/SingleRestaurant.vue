<script>
import axios from 'axios';
import { useRoute } from 'vue-router';


export default {
    name: 'SingleRestaurant',
    components:{
       
    },
    data() {
        return {
            restaurantId: null,
            restaurant: {},   
            baseApiUrl: 'http://127.0.0.1:8000/api',
            quantity: 1,
            currentDish: null,

            //pezzo carrello
            cart: []
        }
    },

    //pezzo carrello
    created() {
        this.restaurantId = this.$route.params.id;
        this.loadCart();
    },

    mounted() {
    
        this.restaurantId = this.$route.params.id;
        
        axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
            this.restaurant = res.data.restaurant;
        })
    },

    computed: {
        totalPrice() {
            return this.cart.reduce((total, item) => total + item.price, 0);
        }
    },

    methods: {
        getImageUrl(image) {
            if (image) {
                if (image.startsWith('http://') || image.startsWith('https://')) {
                    return image;
                } else {
                    return `${this.baseApiUrl}/storage/${image}`;
                }
            } else {
                return '/img/Default_different_food_0.jpg';
            }
        },    

        decrement() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
            
        increment() {
            this.quantity++;
        },

        //pezzo carrello
        loadCart() {
            const savedCart = localStorage.getItem('cart_' + this.restaurantId);
            this.cart = savedCart ? JSON.parse(savedCart) : [];
        },

        addToCart() {
            const cartItem = {
                name: this.currentDish.dish_name,
                quantity: this.quantity,
                price: this.currentDish.dish_price * this.quantity,
                id: this.currentDish.id,
            };
            
            //Controlla se il piatto esiste già nel carrello
            const existingItemIndex = this.cart.findIndex(item => item.name === cartItem.name);

            if (existingItemIndex !== -1) {
                //Aggiorna il piatto esistente
                this.cart[existingItemIndex].quantity += this.quantity;
                this.cart[existingItemIndex].price += cartItem.price;
            
            } else {
                //Aggiungi il nuovo piatto
                this.cart.push(cartItem);
            }

            this.updateLocalStorage();
        },

        removeFromCart(index) {
            this.cart.splice(index, 1);
            this.updateLocalStorage();
        },

        updateLocalStorage() {
            localStorage.setItem('cart_' + this.restaurantId, JSON.stringify(this.cart));
        },

        // Metodo per aggiornare la quantità di un articolo nel carrello
        updateCartItem(index, increment) {
            if (increment) {
                this.cart[index].quantity++;
            } else if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--;
            } else {
                return;
            }
            this.cart[index].price = this.cart[index].quantity * (this.cart[index].price / (this.cart[index].quantity + (increment ? -1 : 1)));
            this.updateLocalStorage();
        },

        openModal(dish) {
            this.currentDish = dish;
            this.quantity = 1;
            new bootstrap.Modal(document.getElementById('addDish')).show();
        },

        goToCheckout() {
            const id = this.restaurantId;
            this.$router.push({ name: 'checkout', params: { id} })
        },

        goBack() {
            this.$router.go(-1);
        }
        

    },

    // Osserva i cambiamenti del ristorante e aggiorna il carrello di conseguenza
    watch: {
        $route(to, from) {
            // Salva il carrello corrente
            this.updateLocalStorage();

            // Aggiorna l'ID del ristorante e carica il nuovo carrello
            this.restaurantId = to.params.id;
            this.loadCart();

            // Ricarica i dati del ristorante
            axios.get(`${this.baseApiUrl}/restaurants/${this.restaurantId}`).then(res => {
                this.restaurant = res.data.restaurant;
            });
        }
    }
}
</script>

<template>
    <div class="header-page">
        <div class="container">
            <div class="restaurant">
                <div class="image-box">
                    <div class="image" v-if="restaurant.image === null">
                        <img  src="/img/restaurant_placeholder.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="image" v-else-if="restaurant && restaurant.image && restaurant.image.startsWith('images/')">
                        <img  :src="'http://localhost:8000/storage/' + restaurant.image" class="card-img-top" alt="...">
                    </div>
                    <div class="image" v-else>
                        <img :src="restaurant.image" class="card-img-top" alt="...">
                    </div>
                </div>

                <div class="info">
                    <h2 class="fs-3 text-center text-md-start mt-2 mt-md-0">{{ restaurant.restaurant_name }}</h2>

                    <div class="category list-group-item my-2">
                        <span v-for="category in restaurant.categories" :key="category.id" class="badge rounded-pill">
                            {{ category.category_name }}
                        </span>
                    </div>

                    <p class="mt-3" v-if="restaurant.description">{{ restaurant.description }}</p>
                </div>

                <div class="contacts d-flex flex-md-column gap-3 gap-md-2 mt-2 mt-md-0">
                    <span class="phone" v-if="restaurant.phone"><i class="fa-solid fa-phone me-2"></i> <a href="tel:{{ restaurant.phone }}" class="text-decoration-none">{{ restaurant.phone }}</a></span>
                    <span class="address" v-if="restaurant.address"><i class="fa-solid fa-location-dot me-2 mb-3"></i> <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(restaurant.address)" target="_blank" class="text-decoration-none">{{ restaurant.address }}</a>.</span>
                    <span class="vat" v-if="restaurant.vat">VAT: {{ restaurant.vat }}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="page pb-5 py-lg-2">
        <div class="container">

            <div class="row">

                <div class="col-12 col-lg-8">
                    <div class="mt-3">
                        <a @click="goBack" class="mb-3"><i class="fa-solid fa-arrow-left"></i> indietro</a>
                    </div>

                    <h2 class="text-center fs-2 mt-2 mb-4 text-uppercase">Menù</h2>

                    <div class="dishes" v-for="dish in restaurant.dishes" :key="dish.id">
                        <div class="dish" type="button" data-bs-toggle="modal" data-bs-target="#addDish" @click="openModal(dish)" v-if="!dish.visible">

                            <!-- Immagine Piatto -->
                            <div class="img-dish d-flex align-items-center">
                                <div class="image me-2">
                                    <img v-if="dish.dish_image === null" src="/img/dish_placeholder.jpg" class="card-img-left" alt="...">
                                    <img v-else-if="dish.dish_image.startsWith('dish_images/')" :src="'http://localhost:8000/storage/' + dish.dish_image" class="card-img-left" alt="...">
                                    <img v-else :src="dish.dish_image" class="card-img-left" alt="...">
                                </div>
                            </div>

                            <div class="info-dish">
                                <!-- Nome piatto -->
                                <div class="title-dish d-flex gap-3">
                                    <div class="fw-bold"> {{ dish.dish_name }} </div>

                                    <!-- Prezzo piatto -->
                                    <div class="price-dish badge rounded-pill">
                                        <div class="fw-normal"> {{ dish.dish_price }} € </div>
                                    </div>
                                </div>
            
                                
            
                                <!-- Ingredienti piatto -->
                                <div class="ingedients-dish">
                                    <div class="fw-normal"> {{ dish.ingredients || 'Nessun Ingrediente inserito' }} </div>
                                </div>

                            </div>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade" id="addDish" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content py-2 px-5">
                                    <div class="modal-body d-flex flex-column align-items-center">
                                        <h2 class="text-center mb-4">{{ currentDish ? currentDish.dish_name : '' }}</h2>
                                        <span class="mb-5 fs-5 fw-bold">{{ currentDish ? currentDish.dish_price * quantity : '' }} €</span>

                                        <div class="counter">
                                            <span class="minus" @click="decrement" :disabled="quantity === 1">-</span>
                                            <span class="px-3 fs-3">{{ quantity }}</span>
                                            <span class="plus" @click="increment">+</span>
                                        </div>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center">
                                        <button type="button" class="btn button" @click="addToCart" data-bs-dismiss="modal">Aggiungi al carrello</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>

                <!--carello inizio-->
                <div class="col-12 col-lg-4 mt-4 mt-lg-5 cart-box">
                    <div class="cart">
                        <h2 class="text-center fs-2 mb-5 pt-4 text-uppercase">Carrello</h2>
                        <ul>
                            <li v-for="(cartItem, index) in cart" :key="index" class="d-flex justify-content-between mb-4">
                                <div class="d-flex flex-column">
                                    <span>{{ cartItem.name }}</span>
                                    <span class="price">€ {{ cartItem.price }}</span>
                                </div>

                                <div class="d-flex align-items-center">
                                   <!--numero, piu e meno-->
                                    <div class="d-flex gap-2 align-items-center" >
                                    <i class="fa-solid fa-minus" @click="updateCartItem(index, false)"></i>
                                    <span>{{ cartItem.quantity }}</span>
                                    <i class="fa-solid fa-plus" @click="updateCartItem(index, true)"></i>
                                    </div>

                                    <span @click="removeFromCart(index)" class="remove-item">
                                        <i class="fa-solid fa-trash fs-5 ms-4 me-2"></i>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        
                        <hr class="mx-4">

                        <div class="d-flex justify-content-between align-items-center mx-4">
                            <h2 class="fs-4 ms-2">Totale</h2>

                            <span class="fs-3 me-1">{{ totalPrice }} €</span>
                        </div>

                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn button-cart" @click="goToCheckout(restaurant.id)">Procedi all'ordine</button>
                        </div>
                    
                    </div>
                </div>

                <!--carello fine-->

            </div>
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-page {
    background-color: #202020;
    cursor: default;
    
    .restaurant {
        margin: 0 60px;
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #A0A0A0;

        .image-box .image img {
            width: 300px;
            border-radius: 8%;
        }

        .info {
            .category {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                max-width: 300px;
                span {
                    font-size: 11px;
                    color: #403f3f;
                    background: linear-gradient(to left, #c68434 0%, #ebb45b 100%);
                    box-shadow: 0px 1px 6px rgba(242, 173, 60, 0.5);
                }
            }

            p {
                max-width: 350px;
                font-size: 14px;
            }
        }

        .contacts {
            .phone, .address {
                font-size: 13px;
                transition: 0.2s;
                &:hover {
                    transform: scale(115%);
                }

                a {
                    color: #A0A0A0;
                }
            }

            .vat {
                font-size: 13px;
            }
            
        }
    }
}

a {
    color: #F65901;
    cursor: pointer;
    text-decoration: none;

}
a:hover {
    color: #ffab24;
    text-decoration: none;
}

.page {

    min-height: 620px;

    .dish {
        display: flex;
        padding: 10px 0;
        border-bottom: 0.5px solid #A0A0A0;

        .image img {
            width: 110px;
            height: 65px;
            border-radius: 8px;
        }

        .info-dish {
            display: flex;
            flex-direction: column;
            justify-content: center;


            .price-dish {
                font-size: 14px;
                background-color: #F65901;
                background: linear-gradient(to left, #F65901 0%, #ff8844 100%);
            }

            .ingedients-dish {
                margin-top: 5px;
                font-size: 16px;
                color: #807f7f;
            }
        }
    }
}


.modal {
    .counter {
        .minus, .plus {
            font-size: 25px;
            padding: 10px;
            cursor: pointer;
        }

        input {
            border: none;
        }
    }

    .button {
        margin-top: 10px;
        padding: 10px 20px;
    
        text-transform: uppercase;
        font-size: bold;
        font-weight: 16px;
        
        background-color: rgba(246, 89, 0, 1);
        color: white;
    
        &:hover {
            background-color: transparent;
            color: rgba(246, 89, 0, 1);
            border: 1px solid rgba(246, 89, 0, 1);
        }
    }
}

.cart-box .cart {
    padding-bottom: 20px;
    background-color: #FEFAF1;

    .price {
        font-size: 14px;
        color: #A0A0A0;
    }

    .fa-minus, .fa-plus {
        font-size: 18px;
        cursor: pointer;
        color:#ebb45b;
        transition: 0.1s;

        &:hover {
            transform: scale(120%);
        }
    }

    .remove-item i {
        cursor: pointer;
        color:#ebb45b;
        transition: 0.1s;

        &:hover {
            transform: scale(120%);
        }
    }

    .button-cart {
        margin-top: 10px;
        padding: 10px 20px;
    
        text-transform: uppercase;
        font-size: bold;
        font-weight: 16px;
        
        background-color: rgba(246, 89, 0, 1);
        color: white;
    
        &:hover {
            background-color: transparent;
            color: rgba(246, 89, 0, 1);
            border: 1px solid rgba(246, 89, 0, 1);
        }
    }

}


//laptop-view
@media (max-width: 992px) {
    .header-page {
        .restaurant {
            margin: 0;

            .image-box .image img {
                width: 200px;
            }

            .info {
                .category span {
                    font-size: 11px;
                }

                p {
                    max-width: 200px;
                    font-size: 10px;
                }
            }

            .contacts {
                padding-left: 0;

                .phone, .address {
                    font-size: 11px;
                }

                .vat {
                    font-size: 11px;
                }
            }
        }
    }

    .page {
        .dish {
            .info-dish {
                .ingedients-dish {
                    margin-top: 5px;
                    font-size: 16px;
                    color: #807f7f;
                }
            }
        }
    }

    .cart-box {
        display: flex;
        justify-content: center;
        
        .cart {
            min-width: 550px;
        }
    }
}



//tablet-view
@media (max-width: 768px) {
    .restaurant {
        display: flex;
        flex-direction: column;
    }

    .page {
        .dish {
            .info-dish {
                .ingedients-dish {
                    font-size: 14px;
                }
            }
        }
    }
}



//mobile-view
@media (max-width: 576px) {
    .header-page {        
        .restaurant {
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .image-box .image img {
                width: 200px;
            }

            .contacts {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    }

    .page {
        .dish {
            .info-dish {
                .price-dish {
                    top: 5px;
                    left: -70px;
                }
            }
        }
    }

    .cart-box {
        .cart {
            min-width: 320px;
        }
    }
}
</style>
