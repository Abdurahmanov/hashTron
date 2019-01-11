<template>
    <div class="news-detail">
        <div class="news-detail__favorites"></div>
        <div class="news-detail__img">
            <img src="https://via.placeholder.com/500x300" alt="">
        </div>
        <div class="news-detail__title">
            Виктор Коровин
        </div>
        <div class="news-detail__text">
            Осталось написать интерпретатор #JS на #Python, и можно будет веселится https://brython.info/console.html
        </div>
        <div class="news-detail__info">
            @Ktulhy 4 янв
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
        }

        &__title {
            margin-top: 40px;
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
