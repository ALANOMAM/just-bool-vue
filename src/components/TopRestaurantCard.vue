<script>

import {store} from '../store.js'

export default{

    name: 'TopRestaurantCard',

    data(){
        return{
            store,
            

        }
    },

    props : {

        topRestaurant: Object,

    }
}

</script>

<template>
  <div class="row justify-content-center">
    <div >
      <a :href="'/restaurant/' + topRestaurant.id" class="restaurant-card py-3 px-3 mb-sm-0 text-decoration-none d-flex flex-column align-items-center">
        <div class="d-flex flex-column">
          <div class="image rounded-4 overflow-hidden">
            <img v-if="topRestaurant.image === null" src="/img/restaurant_placeholder.jpg" class="card-img-left" alt="...">
            <img v-else-if="topRestaurant.image.startsWith('images/')" :src="'http://localhost:8000/storage/' + topRestaurant.image" class="card-img-left" alt="...">
            <img v-else :src="topRestaurant.image" class="card-img-left" alt="...">
          </div>
        </div>

        <div class="d-flex flex-column justify-content-center align-items-center mt-3">
          <h4 class="py-2 mb-4 text-wrap text-center">{{ topRestaurant.name }}</h4>
          <div class="text-center d-flex flex-wrap gap-2">
            <div class="bg-pills text-white px-2 rounded-5" v-for="category in topRestaurant.categories" :key="category.category_name">{{ category.category_name }}</div>
          </div>
        </div>
      </a>
    </div>
</div>
</template>
  
  <style lang="scss" scoped>
    .restaurant-card {
  background-color: #FDEED0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image {
  width: 100%;
  height: 150px;
  display: flex;
}

h4 {
  font-weight: 500;
  color: black;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.bg-pills {
  background-color: rgba(255, 179, 14, 1);
  margin: 2px 0;
}

@media (max-width: 767px) {
  .restaurant-card {
    flex-direction: column;
  }
  
  .image {
    width: 140px;
    height: 120px;

  }
}

  </style>