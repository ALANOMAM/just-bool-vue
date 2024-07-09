<script>
import axios from 'axios';
import { store } from '../store.js';
import RestaurantCard from './RestaurantCard.vue';

export default {
  name: 'CategoryApp',
  data() {
    return {
      store,
      restaurants: [],
      categories: [],
      apiPageNumber: 1,
      currentPage: 1,
      per_page: 1,
      last_page: 1,
      total_items: 1,
      apiLinks: [],
      showModal: false,

      categoryImages: [
        '/public/img/cinese-category.jpg',
        '/public/img/pizza-category.jpg',
        '/public/img/mexican-category.jpg',
        '/public/img/japanese-category.avif',
        '/public/img/fast-category.jpg',
        '/public/img/vegan-category.jpg',
        '/public/img/vege-category.jpeg',
        '/public/img/ita-category.jpg',
        '/public/img/corean-category.jpg',
        '/public/img/sushi-category.jpg',
        '/public/img/kebab-category.jpg',
        '/public/img/gourmet-category.jpg',
      ]
    };
  },

  components: {
    RestaurantCard,
  },

  mounted() {

    axios.get(this.store.apiBaseUrl + '/categories').then(res => {
      this.categories = res.data.results;
    });

    this.getAllRestaurants();
    this.filterCategory();

  },

  methods: {

    filterCategory() {

      if(this.store.checkBoxValue.length > 0) {
                axios.get(this.store.apiBaseUrl +'/restaurants?categories=' + this.store.checkBoxValue, {
                    params: {
                        page: this.apiPageNumber
                    }
                }).then(res => {
                    this.restaurants = res.data.results.data;

                    //Aggiorna il numero totale di ristoranti filtrati
                    this.total_items = res.data.results.total;

                    //Resetta alla pagina 1 dopo aver applicato il filtro
                    this.currentPage = 1;
                })

      } else {

        this.getAllRestaurants();

      }
    },

    getAllRestaurants() {

      axios.get(this.store.apiBaseUrl + '/restaurants', {
        params: { page: this.apiPageNumber }
      }).then(res => {
        this.restaurants = res.data.results.data;
        this.apiLinks = res.data.results.links;
        this.last_page = res.data.results.last_page;
        this.total_items = res.data.results.total;
        this.per_page = res.data.results.per_page;
      });

    },

    changePage(direction) {
      if (direction === 'next' && this.currentPage < this.last_page) {
        this.currentPage++;
      } else if (direction === 'prev' && this.currentPage > 1) {
        this.currentPage--;
      }
      this.apiPageNumber = this.currentPage;
      this.getAllRestaurants();

    },

    toggleCategorySelection(categoryName) {
      const index = this.store.checkBoxValue.indexOf(categoryName);
      if (index === -1) {
        this.store.checkBoxValue.push(categoryName);
      } else {
        this.store.checkBoxValue.splice(index, 1);
      }
      this.filterCategory(); 

    },

    isCategorySelected(categoryName) {
      // Controlla se la categoria è selezionata
      return this.store.checkBoxValue.includes(categoryName);
    },

    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false
    }
  

  }
};
</script>

<template>
  <section class="parallax d-none d-md-block"> 
    <div class="container text-center">
      <h2 class="text-white">Cerca Per Categorie</h2>

      <div class="d-none d-md-block">
        <div class="row">
          <div class="col-sm-2 mt-4 mb-sm-0" v-for="(categoryElement, catIndex) in categories" :key="categoryElement">
            <div class="card box" :class="{ 'selected': isCategorySelected(categoryElement.category_name) }" @click="toggleCategorySelection(categoryElement.category_name)">
              <div class="card-body d-flex flex-column align-items-center">
                <div class="category-icon">
                  <div v-for="(categoryLogo, logoIndex) in categoryImages" :key="logoIndex">
                    <div v-if="catIndex == logoIndex">
                      <img class="category-image" :src="categoryLogo" alt="">
                    </div>
                  </div>
                </div>
                <div class="checkbox-name">
                  <label class="form-check-label categoryEv" :for="categoryElement.category_name">{{ categoryElement.category_name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>  


  <h2 v-if="restaurants.length !== 0" class="text-center my-5">Lista Ristoranti</h2>
  
    <div class="d-block d-md-none button-modal-wrapper">
      <div class="d-flex justify-content-center"> 
        <button type="button" class="btn cat-button" @click="openModal">
          Filtra per categorie
        </button>
      </div>

    <div class="modal cat" :class="{ 'is-active': showModal }" @click.self="closeModal">
      <div class="modal-content content">
        <div class="modal-header">
          <h5 class="modal-title">Categorie</h5>
          <button type="button" class="modal-close" @click="closeModal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div v-for="category in categories" :key="category.category_name" class="form-check">
            <input class="form-check-input" type="checkbox" :value="category.category_name" v-model="store.checkBoxValue" @change="filterCategory">
            <label class="form-check-label">
              {{ category.category_name }}
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Chiudi</button>
        </div>
      </div>
    </div>
  </div>

  <section v-if="restaurants.length === 0" class="restaurants-section">
    <div class="container my-5">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h1 class="text-center my-5">Non ci sono ristoranti per queste categorie, ci dispiace!</h1>
      </div>
    </div>
  </section>

  <section v-else class="restaurants-section">


    <div class="my-5">
      <div class="row">
        <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant"></RestaurantCard>
      </div>

      <div class="text-center mt-5">
        <vue-awesome-paginate
          v-if="restaurants && restaurants.length > 0"
          :total-items="total_items"
          v-model="currentPage"
          :items-per-page="per_page"
          :max-pages-shown="last_page"
          :on-click="changePage"
          :hide-prev-next-when-ends="true"
        />
      </div>
    </div>
  </section>

  
</template>


<style lang="scss">

.box {
  border: none;
  background-color: rgba(245, 245, 245, 0.564);
  color: black;
  height: 140px;
  font-weight: bold;

  &:hover {
    background-color: rgba(245, 245, 245, 0.335);
  }

  &.selected {
    background-color: #f17228aa;
    color: white;
    font-weight: bold;
    box-shadow: 1px 1px 1px #F17228;
  }
}

.checkbox-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #F17228;
  border: 1px solid #F17228;
  color: white;
}

.active-page:hover {
  background-color: rgba(255, 179, 14, 1);
  border: 1px solid rgba(255, 179, 14, 1);
}

h2 {
  color: #F17228;
  font-weight: 700;
}

.categoryEv {
  padding: 5px;
  border-radius: 5px;
}

.parallax {
  background-image: url('/img/categories_background.jpeg');
  background-position: center;
  padding-top: 40px;
  padding-bottom: 400px;
  max-height: 460px;
  background-attachment: fixed;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(0px);
}

section {
  min-height: 400px;

  h1 {
    color: #F17228;
    font-weight: 700;
  }

  i {
    color: #F17228;
    font-size: 100px;
  }
}

.cat-button {
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

.card {
  width: 100%;
}

.category-icon {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .category-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

}
.cat {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.is-active {
  display: block;
}

.content {
  position: relative;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 5px;
  top: 50%;
  transform: translateY(-50%);
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto; 
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
}


@media (max-width: 767px) {
  .categories-wrapper {
    display: none;
  }

  .button-modal-wrapper {
    display: block;
  }
}


@media (max-width: 992px) {
  .box {
    max-width: 120px;
  }

}
</style>
