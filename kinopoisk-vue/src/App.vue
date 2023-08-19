<template>

  <the-header @searchHandler="search"/>
  <app-movies :movies="movies"/>

</template>

<script>
import { getMovies } from './api';
import AppMovies from './components/AppMovies.vue';
import TheHeader from './components/TheHeader.vue';

export default {
  components: { TheHeader, AppMovies },

  mounted() {  
    this.fetchAndDisplayMovies(this.apiTop);
  },

  data() {
    return {
      apiTop: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=',
      movies: [],
      currentPage: 1
    }
  },

  methods: {
    search(url) {
      this.fetchAndDisplayMovies(url);
    },

    async fetchAndDisplayMovies(url) {
      const films = await getMovies(url);
      this.movies = films;
    }
  }

}

</script>

<style>

</style>
