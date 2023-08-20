<template >

  <the-header @searchHandler="search"/>
  <app-movies :movies="movies"/>
 
</template>

<script>
import { loadMovies } from './api';
import AppMovies from './components/AppMovies.vue';
import TheHeader from './components/TheHeader.vue';
import { ref } from 'vue';

export default {
  components: { TheHeader, AppMovies },

  mounted() {  
    this.fetchAndDisplayMovies(this.apiValue);

    this.prevScrollPosition = ref(window.scrollY);

    window.addEventListener('scroll', this.debounce(this.handleScroll, 200));
  },

  beforeUnmount() {
    window.addEventListener('scroll', this.debounce(this.handleScroll, 200));
  },

  data() {
    return {
      apiValue: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS',
      movies: [],
      maxPage: 20,
      currentPage: 1,
      prevScrollPosition: null,
    }
  },

  methods: {
    async search(url) {
      this.movies = [];
      this.fetchAndDisplayMovies(url);
      this.apiValue = url;
    },

    async fetchAndDisplayMovies(url) {
      const films = await loadMovies(url);
      this.movies = this.movies.concat(films);
    },

    debounce(func, delay) {
      let timeoutId;
      return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, arguments);
        }, delay);
      };
    },

    handleScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = 20;

      if (scrollPosition > this.prevScrollPosition) {
        if (scrollPosition + windowHeight >= documentHeight - threshold) {
          this.nextPage();
        }
      }

      this.prevScrollPosition = scrollPosition;
    },

    nextPage() {
      if(this.currentPage !== this.maxPage) {
        this.currentPage++;
        let api = this.apiValue + '&page=' + this.currentPage;
        this.fetchAndDisplayMovies(api);
      }
    }, 

  }

}

</script>

<style>

</style>
