<template>
    <transition name="modal" appear >
      <div class="modal__card" v-if="isContentLoaded">
        <div class="modal__card-header">
          <h2 class="modal__movie-title">{{modalMovie.nameRu}}</h2>
          <movie-rating :rating="modalMovie.ratingKinopoisk" :votes="modalMovie.ratingKinopoiskVoteCount"/>
        </div>

        <div class="modal__card-content">
          <img 
            class="modal__movie-backdrop" 
            :src="modalMovie.posterUrlPreview" 
            alt="movie__cover"
          >

          <ul class="modal__movie-info">
            <li class="modal__movie-info-item">
              Год выпуска: <span class="modal__movie-info-value">{{modalMovie.year}}</span>
            </li>
            <li class="modal__movie-info-item">
              Страна: <span class="modal__movie-info-value">{{getCountries(modalMovie.countries)}}</span>
            </li>
            <li class="modal__movie-genre">
              Жанр: <span class="modal__movie-info-value">{{getGenres(modalMovie.genres)}}</span>
            </li>
            <li v-if="modalMovie.filmLength" class="modal__movie-info-item">
              Время: <span class="modal__movie-info-value">{{modalMovie.filmLength}} минут</span>
            </li>
            <li class="modal__movie-info-item"><span class="modal__movie-info-value">{{modalMovie.description}}</span></li>
          </ul>
        </div>

        <div class="modal__buttons">
          <a 
            v-if="trailerUrl"
            class="modal__watch-trailer" 
            :href="trailerUrl"
            target="_blank"
          >
            Смотреть трейлер
          </a>
        </div>
      
        <button type="button" class="modal__button-close" @click="$emit('close')">
          &times;
        </button>
      </div>
    </transition>  
</template>

<script>
import {getMovieInfo} from '../api';
import {getMovieTrailer} from '../api';
import MovieRating from './MovieRating.vue';

export default {
  components: {MovieRating},
  emits: ['close'],
  props: ['modalMovieId', 'selected'],
  data() {
    return {
      modalMovie: null,
      isContentLoaded: false,
      trailerUrl: ''
    }
  },
  created() {
    this.loadMovieInfo(this.modalMovieId);
  },
  methods: {
    async loadMovieInfo(id) {
      try {
        const movieInfo = await getMovieInfo(id);
        this.modalMovie = movieInfo;
        console.log(movieInfo);

        const trailer = await this.getTrailer(id);
        this.trailerUrl = trailer;

        this.isContentLoaded = true;
      }
      catch(error) {
        console.error('Ошибка загрузки контента:', error);
      }
    },

    getGenres(el) {
      return el.map((genre) => genre.genre).join(', ');
    },

    getCountries(countries) {
      return countries.map((country) => country.country).join(', ');
    },

    async getTrailer(id) {
      const {items} = await getMovieTrailer(id);
      return items[0].url;
    }
  },
}
</script>

<style scoped>
/* Стили для модального окна с анимацией появления */
.modal-enter-active,
.modal-leave-active {
  transition: transform .2s ease; /* Пример длительности анимации и функции времени */
}

/* Начальное состояние анимации (масштаб 0) */
.modal-enter-from,
.modal-leave-to {
  transform: scale(0);
}

/* Конечное состояние анимации (масштаб 1) */
.modal-enter-to,
.modal-leave-from {
  transform: scale(1);
}
</style>