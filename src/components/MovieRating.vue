<template>
  <div v-if="isRatingExist" class="rating">
    <div class="rating__stars">
      <span class="rating__star rating-filled" v-for="i in filledStars" :key="i">&#9733;</span>
      <span class="rating__star" v-for="i in unfilledStars" :key="i">&#9734;</span>
    </div>
    <div class="rating__value">
      {{ this.rating }}/10 ({{ this.votes }} гол.)
    </div>
  </div>
</template>

<script>


export default {
  props: ['rating', 'votes'],
  created() {
    this.createStars(this.rating);
  },
  data() {
    return {
      filledStars: 0,
      unfilledStars: 0,
      isRatingExist: true
    }
  },
  methods: {
    createStars(vote) {
      const rating = this.getRating(vote);
      if (rating) {
        const max = 10;
        this.filledStars = Math.round(rating); 
        this.unfilledStars = max - this.filledStars;
      } else {
        this.isRatingExist = false;
      }
    },
    getRating(vote) {
      if (vote) {
        if (vote[vote.length - 1] === '%') {
        vote = vote.slice(0, -1);
        }
        if (vote >= 10) {
          return vote = (vote * 0.1).toFixed(1);
        } else if (vote == null) {
          return '';
        } else return vote;  
      } else {
        return null;
      }
    },
  }
}
</script>

<style scoped>
  .rating__star {
    font-size: 16px;
  }
  .rating-filled {
    color: orangered;
  }
  .rating__value {
    font-size: 12px;
    line-height: 1.2;
  }
</style>