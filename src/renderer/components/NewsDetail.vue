<template>
    <div class="news-detail">
        <div class="news-detail__block" v-if="this.$store.state.newsItem.activeItem !== ''">
            <div class="news-detail__favorites" @click="activeFavorites" :class="this.$store.state.newsItem.activeItem.like === true ? 'news-detail__favorites_active': ''"></div>
            <div class="news-detail__img" v-if="this.$store.state.newsItem.activeItem.photo">
                <img :src="this.$store.state.newsItem.activeItem.photo" alt="">
            </div>
            <!-- <div class="news-detail__title">
               {{ this.$store.state.newsItem.activeItem.id}}
            </div> -->
            <div class="news-detail__text">
                {{ this.$store.state.newsItem.activeItem.text}}
            </div>
            <div class="news-detail__info">
                {{this.$store.state.newsItem.activeItem.id}} {{ this.$store.state.newsItem.activeItem.date}}
            </div>
        </div>
        <div class="news-detail__empty" v-else>
            Выберите интересующий вас пост
        </div>
    </div>
</template>

<script>
  export default {
    methods: {
      activeFavorites() {
        this.$store.commit('setActiveFavorites');
      },
    },
  };
</script>

<style lang="scss">
    .news-detail {
        padding: 50px 35px;
        width: calc(100% - 400px);
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;

        &__empty {
            text-align: center;
            font-size: 35px;
            color: #bbb;
            align-self: center;
            width: 100%;
        }

        &__img {
            text-align: center;
            width: 100%;
            margin-bottom: 40px;
        }

        &__title {
            text-align: center;
            font-size: 70px;
            font-weight: 500;
        }

        &__text {
            font-size: 30px;
        }

        &__info {
            font-size: 20px;
            margin-top: 10px;
            color: #ccc;
            margin-bottom: 10px;
        }

        &__favorites {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
            background: url(../assets/favorite.svg);
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer;
            transition: 0.3s;

            &_active {
                background: url(../assets/favorite_active.svg);
                transition: 0.3s;
            }
        }
    }
</style>
