<template>
    <div class="news-item__block" @click="isActiveItem(news)" :class="this.$store.state.newsItem.activeItemId === news.id ? 'news-item__block_active': ''">
            <!-- <div class="news-item__name">
                {{news.id}}
            </div> -->
            <div class="news-item__info">
                {{news.id}} {{news.date}}
            </div>
            <div class="news-item__photo" v-if="news.preview">
              <img :src="news.preview" alt="">
            </div>
            <div class="news-item__text">
                {{news.text}}
            </div>
        </div>
</template>

<script>
  export default {
    props: {
      news: Object,
    },
    mounted() {
    },
    data() {
      return {

      };
    },
    methods: {
      isActiveItem(item) {
        this.$store.dispatch('getItem', {
          item,
        });
      },
    },
  };
</script>

<style lang="scss">
    .news-item {
        &__block {
          border-bottom: 1px solid #ccc;
          padding: 20px;
          cursor: pointer;
          overflow: hidden;
          max-height: 250px;
          min-height: 150px;
          position: relative;
            &_active {
                background: #ccc;
            }
            &:after{
              content: '';
              display: block;
              background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 99%,rgba(255,255,255,0) 100%);
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50%
            }
        }

        &__name {
            font-size: 16px;
            font-weight: 500;
        }

        &__text {
            margin-top: 10px;
            font-size: 22px;
            overflow: hidden;
            max-height: 180px;
            word-wrap: break-word;
        }

        &__info {
            font-size: 15px;
            color: gray;
        }
        &__photo{
          text-align: center;
          margin-top: 10px
        }
    }
</style>
