<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <div class="modal__card">
      <img 
        class="modal__movie-backdrop" 
        :src="modalMovie.posterUrlPreview" 
        alt="movie__cover"
      >
      <h2 class="modal__movie-title">{{modalMovie.nameRu}}</h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-release-year">
          Год производства - {{modalMovie.year}}
        </li>
        <li class="modal__movie-genre">
          Жанр - {{getGenres(modalMovie.genres)}}
        </li>
        <li class="modal__movie-runtime">
          Время - {{modalMovie.filmLength}} минут
        </li>
        <li class="modal__movie-overview">Описание - {{modalMovie.description}}</li>
      </ul>
      <button type="button" class="modal__button-close" @click="$emit('close')">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    modalMovie: {
      type: Object
    }
  },
  methods: {
    getGenres(el) {
      return el.map((genre) => genre.genre).join(', ');
    }
  },
}
</script>

<style>

</style>