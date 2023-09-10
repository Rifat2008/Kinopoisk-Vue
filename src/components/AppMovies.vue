<template>
  <div class="container">
    <div class="movies">
      <movie-card 
        v-for="movie in movies" 
        :key="movie.filmId" 
        :movie="movie" 
        @select="select"
        :selected="selected"
      />
    </div>
  </div>
</template>

<script>

import MovieCard from './MovieCard.vue';
import AppModal from './AppModal.vue';

export default {
  components:{MovieCard, AppModal},

  props: {
    movies: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      selected: null
    }
  },

  methods: {
    select(filmId) {
      this.selected = filmId;
    }
  }

}
  
</script>