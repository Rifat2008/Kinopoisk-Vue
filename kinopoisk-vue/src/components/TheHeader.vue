<template>

  <header class="container">
    <div class="header__content">

      <a href="index.html" class="header__logo">Kinopoisk</a>

      <form @submit.prevent="searchHandler">
        <input type="text" 
        class="header__search" 
        placeholder="Поиск" 
        v-model="search"/>
      </form>
      
    </div>
  </header>

</template>

<script>

export default {
  data() {
    return {
      apiKey: 'e467ec5b-1628-45bf-844c-f994b8295c79',
      apiTop: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=',
      apiSearch: 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=',
      apiMovieDetails: "https://kinopoiskapiunofficial.tech/api/v2.2/films/",
      movies: null,
      search: '',
      modal: false,
      modalMovie: null,
      currentPage: 1
    }
  },

  methods: {
    searchHandler() {
      const apiSearchUrl = `${this.apiSearch}${this.search}`;

      if (this.search) {
        this.$emit('searchHandler', apiSearchUrl);
        //this.getMovies(apiSearchUrl);
        this.search = "";
      }
    },
  }
}
  
</script>