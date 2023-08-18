<template>

  <the-header @searchHandler="search"/>
  <app-movies :movies="movies"/>

</template>

<script>
import AppMovies from './components/AppMovies.vue';
import TheHeader from './components/TheHeader.vue';

export default {
  components: { TheHeader, AppMovies },

  mounted() {  
    this.getMovies(this.apiTop);
  },

  data() {
    return {
      apiKey: 'e467ec5b-1628-45bf-844c-f994b8295c79',
      apiTop: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=',
      apiSearch: 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=',
      apiMovieDetails: "https://kinopoiskapiunofficial.tech/api/v2.2/films/",
      movies: null,
      currentPage: 1
    }
  },

  methods: {
    search(url) {
      this.getMovies(url);
    },

    async getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": this.apiKey,
      },
    });
    const {films} = await resp.json();
    this.movies = films;
  },
  }

}

</script>

<style>

</style>
