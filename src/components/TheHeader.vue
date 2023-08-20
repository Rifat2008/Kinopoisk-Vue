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
      apiSearch: 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=',
      search: ''
    }
  },

  methods: {
    searchHandler() {
      const apiSearchUrl = `${this.apiSearch}${this.search}`;

      if (this.search) {
        this.$emit('searchHandler', apiSearchUrl);
        this.search = "";
      }
    },
  }
}
  
</script>