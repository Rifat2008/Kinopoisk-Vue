<template>
  <div class="container">
    <div class="movies">
      <movie-card 
        v-for="movie in movies" 
        :key="movie.filmId" 
        :movie="movie" 
        @open="openModal"
      />
    </div>
    
    <teleport to='body' >
      <app-modal 
        v-if="modal"
        :key="modalMovie.filmId"
        :modalMovie="modalMovie"
        @close="closeModal"
      />
    </teleport>
    
  </div>
</template>

<script>

import MovieCard from './MovieCard.vue';
import AppModal from './AppModal.vue';
import {getMovieInfo} from '../api';

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
      modal: false,
      modalMovie: null,
    }
  },

  methods: {

    async openModal(id) {
      const movieInfo = await getMovieInfo(id);

      this.modalMovie = movieInfo;
      this.modal = true;

      document.body.classList.add("stop-scrolling");

      window.addEventListener("keydown", (e) => {
        if (e.key === 'Escape') {
          this.modal = false;
          document.body.classList.remove("stop-scrolling");
        }
      });

      window.addEventListener("click", (e) => {
        if (e.target === this.modalMovie) {
          closeModal();
        }
      });
  },
  
  closeModal() {
    this.modal = false; 
    document.body.classList.remove("stop-scrolling");
  },
  }
  
}
  
</script>