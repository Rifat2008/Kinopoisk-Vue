<template>

  <div 
    class="movie" 
    @click="open"
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
      
      <p class="movie__title">{{movie.nameRu}}</p>

      <p class="movie__category">{{getGenres(movie.genres)}}</p>

      <p class="movie__average" 
        :class="movie.rating ? 
        getClassByRate(getRating(movie.rating)) 
        : getClassByRate(getRating(0)) "
      >
        {{ movie.rating ? getRating(movie.rating) : '' }}
      </p>

    </div> 

  </div>

</template>

<script>
export default {
  emits:['open'],
  props: {
    movie: {
      type: Object
    }
  },

  methods: {
    open() {
      this.$emit('open', this.movie.filmId); 
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
      } else if (vote === 0) {
          return 'б/р';
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