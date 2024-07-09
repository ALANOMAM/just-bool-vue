<script>
import axios from 'axios';
import { store } from '../store.js';
import TopRestaurantCard from '../components/TopRestaurantCard.vue';
import Swiper from 'swiper/bundle'; 

export default {
  name: 'IntroApp',
  components: {
    TopRestaurantCard
  },
  data() {
    return {
      store,
      topRestaurants: [],
      swiper: null,
      slidesPerView: 5 
    }
  },
  methods: {
    async fetchTopRestaurants() {
      try {
        const response = await axios.get(this.store.apiBaseUrl + '/top-restaurants');
        const data = response.data;
        if (data.success) {
          this.topRestaurants = data.results.map(restaurant => ({
            id: restaurant.restaurant_id,
            name: restaurant.restaurant_name,
            image: restaurant.image,
            total_orders: restaurant.total_orders
          }));
          this.initSwiper(); // Inizializza lo Swiper
        }
      } catch (error) {
        console.error('Error fetching top restaurants:', error);
      }
    },
    initSwiper() {
      if (this.swiper) {
        this.swiper.destroy();
      }

      const screenWidth = window.innerWidth;
      if (screenWidth >= 992) {
        this.slidesPerView = 5;
      } else if (screenWidth >= 768) {
        this.slidesPerView = 3;
      } else {
        this.slidesPerView = 2;
      }

      this.swiper = new Swiper(".swiper", {
        loop: true,
        spaceBetween: 4,
        slidesPerView: this.slidesPerView,
        speed: 1000,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    handleWindowResize() {
      // Aggiorna lo Swiper quando cambia la dimensione della finestra
      window.addEventListener('resize', () => {
        this.initSwiper();
      });
    }
  },
  created() {
    this.fetchTopRestaurants();
    this.handleWindowResize(); 
  }
}
</script>

<template>
  <section>

    <div class="container text-center ">
      <h2 class="my-5">Come Funziona</h2>

      <div class="row mb-5">
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card-body d-flex flex-column align-items-center text-center">
            <div class="order-box mb-4">
              <img src="/public/img/order-bg.png" alt="" class="order-bg">
              <img src="/public/img/order.png" alt="" class="order-icon">
            </div>
            <p class="card-text">Scegli l'ordine</p>
            <p class="card-description">Scegli tra più di cento menu disponibili il tuo piatto preferito</p>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card-body d-flex flex-column align-items-center text-center">
            <div class="payments-box mb-4">
              <img src="/public/img/payments-bg.png" alt="" class="payments-bg">
              <img src="/public/img/payments.png" alt="" class="payments-icon">
            </div>
            <p class="card-text">Paga con comodità</p>
            <p class="card-description">Comodo, facile e veloce, scegli tra i nostri diversi metodi di pagamento</p>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card-body d-flex flex-column align-items-center text-center">
            <div class="meals-box mb-4">
              <img src="/public/img/meals-bg.png" alt="" class="meals-bg">
              <img src="/public/img/meals.png" alt="" class="meals-icon">
            </div>
            <p class="card-text">Goditi il cibo</p>
            <p class="card-description">Il cibo è fatto e consegnato direttamente a casa tua</p>
          </div>
        </div>
      </div>

    </div>

  </section>
  
  <div class="wave_bg"></div>
  <section class="top-rst-sect">

    <div class="container pt-3 mb-4">
      <h2 class="text-center mb-5">Ristoranti più popolari</h2>
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="restaurant in topRestaurants" :key="restaurant.id">
            <TopRestaurantCard :topRestaurant="restaurant"></TopRestaurantCard>
          </div>
        </div>
      </div>
    </div>

  </section>






</template>

<style lang="scss" scoped>

.wave_bg {
  width: 100%;
  height: 100px;
  background-image: url('/img/wave_bg.png');
  
}



.top-rst-sect {
  background-color: #FDEED0;
  width: 100%;
}


h2 {
  color: #F17228;
  font-weight: 700;
}

.order-box {
  position: relative;
  
  .order-bg {
    width: 67px;
    height: 82px;
    border-radius: 20px;
  }
  
  .order-icon {
    width: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.payments-box {
  position: relative;
  
  .payments-bg {
    width: 52px;
    height: 82px;
  }

  .payments-icon {
    width: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.meals-box {
  position: relative;
  
  .meals-bg {
    width: 82px;
    height: 82px;
  }

  .meals-icon {
    width: 65px;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.meals-bg,
.order-bg,
.payments-bg{
  filter: drop-shadow(0px 15px 20px rgba(255, 174, 0, 0.3));
}

.card-text {
  font-weight: bold;
  font-size: 22px;
}

.card-description {
  max-width: 300px;
  font-size: 18px;
  color: #9E9E9E;
}
</style>