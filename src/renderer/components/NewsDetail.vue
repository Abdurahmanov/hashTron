<template>
    <div class="news-detail">
        <div class="news-detail__favorites"></div>
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
</template>

<script>
  export default {

  };
</script>

<style lang="scss">
    .news-detail {
        padding: 50px 35px;
        width: calc(100% - 600px);
        position: relative;
        overflow: auto;

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
            margin-top: 30px;
            font-size: 30px;
        }

        &__info {
            font-size: 20px;
            margin-top: 10px;
            color: #ccc;
        }

        &__favorites {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
            background: url(../assets/star.svg);
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer;
        }
    }
</style>
