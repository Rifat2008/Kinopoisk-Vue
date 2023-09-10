<template>
  <div class="wrapper">
    <the-header @searchHandler="search" />
    <app-loader v-if="loading"/>
    <app-movies v-else :movies="movies" />
    <h2 v-if="noMovies" class="no-movies-title">Нет совпадений</h2>
  </div>
</template>

<script>
import AppMovies from './components/AppMovies.vue';
import TheHeader from './components/TheHeader.vue';
import AppLoader from './components/ui/AppLoader.vue'
import { ref } from 'vue';
import { apiEndpoints, fetchMovies } from './api';

export default {
  components: { TheHeader, AppMovies, AppLoader },

  data() {
    return {
      movies: [],
      currentPage: 1,
      maxPage: 2, //max=20
      prevScrollPosition: null,
      apiEndpoint: apiEndpoints.topMovies,
      noMovies: false,
      loading: false
    }
  },

  mounted() {
    this.loadMovies(this.apiEndpoint);
    this.prevScrollPosition = ref(window.scrollY);
    window.addEventListener('scroll', this.debounce(this.handleScroll, 200));
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.debounce(this.handleScroll, 200));
  },

  methods: {
    async search(url) {
      this.noMovies = false;
      this.movies = [];
      this.loading = true;
      await this.loadMovies(url);
      this.loading = false;
      this.apiEndpoint = url;
      this.isSearchMoviesExist();
    },

    async loadMovies(url) {
      try {
        const films = await fetchMovies(url);
        this.movies = this.movies.concat(films);
      } catch (error) {
        console.error('Ошибка при загрузке фильмов', error);
      }
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
      if (this.currentPage !== this.maxPage) {
        this.currentPage++;
        let api = `${this.apiEndpoint}&page=${this.currentPage}`;
        this.loadMovies(api);
      }
    }, 
    isSearchMoviesExist() {
      if (this.movies.length === 0) {
        this.noMovies = true;
      }
    }
  }
}
</script>