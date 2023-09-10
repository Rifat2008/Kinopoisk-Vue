<template>

  <div 
    class="movie" 
    @click="openModal()"
  >
    <div class="movie__cover-inner">
      <img
      :src="movie.posterUrlPreview"
      class="movie__cover"
      alt="movie picture"
      />
      <p class="movie__cover--darkened"></p>
    </div>
    <div class="movie__info">
      <p class="movie__average" 
        :class="movie.rating ? 
        getClassByRate(getRating(movie.rating)) 
        : getClassByRate(getRating(0)) "
      >
        {{ movie.rating ? getRating(movie.rating) : '' }}
      </p>
    </div> 
  </div>

  <app-modal 
    v-if="modal && selected===movie.filmId"
    :key="movie.filmId"
    :modalMovieId="movie.filmId"
    @close="closeModal"
  />

</template>

<script>
import AppModal from './AppModal.vue';

export default {
  components: {AppModal},

  data() {
    return {
      modal: false,
    }
  },

  emits: ['select'],

  props: {
    movie: {
      type: Object
    },
    selected: {
      type: Number
    }
  },

  methods: {
    openModal() {
      if (this.selected !== this.movie.filmId) {
        this.$emit('select', this.movie.filmId);
        this.modal = true;

        window.addEventListener("keydown", (e) => {
          if (e.key === 'Escape') {
            this.modal = false;
          }
        });
      }
    },

    closeModal() {
      this.modal = false;
    },

    getGenres(el) {
      return el.map((genre) => genre.genre).join(', ');
    },

    getRating(vote) {
      if (vote[vote.length - 1] === '%') {
        vote = vote.slice(0, -1);
      }

      if (vote >= 10) {
        return vote = (vote * 0.1).toFixed(1);
      } else if (vote == null) {
        return '';
      } else return vote;  

    },

    getClassByRate(vote) {
      if (vote >= 7) {
        return "movie__average--green";
      } else if (vote > 5) {
        return "movie__average--orange";
      } else if (vote > 0) {
        return "movie__average--red";
      } else {
        return "movie__average--grey";
      }
    }

  }
}
  
</script>