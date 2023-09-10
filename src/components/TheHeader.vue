<template>
  <header class="container">
    <div class="header__content">
      <a href="index.html" class="header__logo">Kinopoisk</a>
      <form @submit.prevent="searchHandler">
        <input
          type="text"
          class="header__search"
          placeholder="Поиск"
          v-model="search"
        />
      </form>
    </div>
  </header>
</template>

<script>
import { apiEndpoints } from '../api';

export default {
  data() {
    return {
      search: ''
    }
  },

  methods: {
    searchHandler() {
      const apiSearchUrl = `${apiEndpoints.searchMovies}${this.search}`;

      if (this.search) {
        this.$emit('searchHandler', apiSearchUrl);
        this.search = "";
      }
    },
  }
}
</script>