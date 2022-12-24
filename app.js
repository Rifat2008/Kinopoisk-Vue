const App = {
    data() {
        return {
            apiKey: 'e467ec5b-1628-45bf-844c-f994b8295c79',
            apiTop: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=',
            apiSearch: 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=',
            apiMovieDetails: "https://kinopoiskapiunofficial.tech/api/v2.2/films/",
            movies: null,
            inputValue: '',
            modal: false,
            modalMovie: null,
            currentPage: 1
        }
    },
    computed: {
        nonScrollableClass() {
            return this.modal ? 'stop-scrolling' : '';
        },
        isFirstPageActive() {
            return this.currentPage === 1;
          },
        isLastPageActive() {
            return this.currentPage === 20;
        },
    },
    mounted() {  
        this.getMovies(this.apiTop);
    },
    methods: {
        async getMovies(url) {
            const resp = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey,
              },
            });
            const {films} = await resp.json();
            this.movies = films;
          },
        submitHandler() {
            const apiSearchUrl = `${this.apiSearch}${this.inputValue}`;

            if (this.inputValue) {
                this.getMovies(apiSearchUrl);
            
                this.inputValue = "";
              }
        },
        async open(id) {
            const resp = await fetch(this.apiMovieDetails + id, {
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey,
              },
            });
            const respData = await resp.json();

            this.modalMovie = respData;
            this.modal = true;
        },
        close() {
            this.modal = false; 
        },
        nextPage() {
            if(this.currentPage !== 20) {
                this.currentPage++;
                let api = this.apiTop + this.currentPage;
                this.getMovies(api);
            }
        },
        prevPage() {
            if(this.currentPage !== 1) {
                this.currentPage--;
                let api = this.apiTop + this.currentPage;
                this.getMovies(api);
            }
        },
        lastPage() {
            this.currentPage = 20;
            let api = this.apiTop + this.currentPage;
            this.getMovies(api);
        },
        firstPage() {
            this.currentPage = 1;
            let api = this.apiTop + this.currentPage;
            this.getMovies(api);   
        }
    },
    components: {
        'app-movie': {
            props: ['filmid', 'nameru', 'posterpreview', 'genres', 'rating', 'year', 'filmLength', 'webUrl', 'description', 'modal'],
            emits:['open'],
            template: `
                <div class="movie">
                    <div class="movie__cover-inner" @click="open">
                        <img
                        :src="posterpreview"
                        class="movie__cover"
                        alt=""
                        />
                        <div class="movie__cover--darkened"></div>
                    </div>
                    <div class="movie__info">
                        <div class="movie__title">{{nameru}}</div>
                        <div class="movie__category">
                            {{getGenres(genres)}}
                        </div>
                        <div class="movie__average" 
                            :class="rating ? getClassByRate(getRating(rating)) : getClassByRate(getRating(0)) "
                        >{{ rating ? getRating(rating) : '' }}</div>
                    </div> 
                </div>
            `,
            methods: {
                open() {
                    this.$emit('open', this.filmid); 
                }
            },
            mixins: [
                getDataMixin = {
                    methods: { 
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
            ],
        },
        'app-modal': {
            props: ['nameru', 'posterpreview', 'genres', 'rating', 'year', 'filmlength', 'webUrl', 'description'],
            emits: ['close'],
            template: `
                <div class="modal">
                    <div class="modal__card">
                        <img 
                            class="modal__movie-backdrop" 
                            :src="posterpreview" 
                            alt=""
                        >
                        <h2>
                            <span class="modal__movie-title">{{nameru}}</span>
                            <span class="modal__movie-release-year"> - {{year}}</span>
                        </h2>
                        <ul class="modal__movie-info">
                            <div class="loader"></div>
                            <li class="modal__movie-genre">
                                Жанр - {{getGenres(genres)}}
                            </li>
                            <li class="modal__movie-runtime">
                                Время - {{filmlength}} минут
                            </li>
                            <li >Сайт: <a class="modal__movie-site" :href="webUrl">{{webUrl}}</a></li>
                            <li class="modal__movie-overview">Описание - {{description}}</li>
                        </ul>
                        <button type="button" class="modal__button-close" @click="$emit('close')">
                            Закрыть
                        </button>
                    </div>
                </div>
            `,
            methods: {
                close() {
                    this.$emit('close'); 
                }
            },
        }
    }
};

Vue.createApp(App).mixin(getDataMixin).mount('#app');



