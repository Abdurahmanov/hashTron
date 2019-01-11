<template>
    <div>
        <div class="news-item__block" :class="activeItem === index ? 'news-item__block_active': ''" v-for="(item, index) in news" :key="item.id">
            <div class="news-item__name">
                {{item.name}}
            </div>
            <div class="news-item__text">
                {{item.text}}
            </div>
            <div class="news-item__info">
                {{item.user}} {{item.date}}
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        news: [
          {
            id: 1,
            name: 'Аждар Жеңісұлы',
            text: 'Кое че задумал, будет прикольно. #css #js',
            user: '@by_Flapjack',
            date: '8 янв',
          },
          {
            id: 2,
            name: 'Виктор Коровин',
            text: 'Осталось написать интерпретатор #JS на #Python, и можно будет веселится https://brython.info/console.html ',
            user: '@Ktulhy',
            date: '4 янв',
          },
          {
            id: 3,
            name: 'Eλευθερίαn',
            text: 'Статическая типизация курильщика в #JS ',
            user: '@abausk',
            date: '2 янв',
          },
          {
            id: 4,
            name: 'Камиль Абзалов',
            text: '#js #javascript\n' +
            'И снова о наболевшем - this в javascript.\n' +
            'Ссылка на статью категории "очень хорошо" - https://getinstance.info/articles/javas ',
            user: '@kamabzalov',
            date: '6 янв',
          },
          {
            id: 5,
            name: 'Елена Орехова',
            text: 'Узнал http://webdiz.com.ua/osnovy-javascript/peremennye-v-javascript … как создать переменную в #JS.',
            user: '@Elena_Orexova',
            date: '8 янв',
          },
          {
            id: 6,
            name: 'Аждар Жеңісұлы',
            text: 'Кое че задумал, будет прикольно. #css #js',
            user: '@by_Flapjack',
            date: '8 янв',
          },
          {
            id: 7,
            name: 'Виктор Коровин',
            text: 'Осталось написать интерпретатор #JS на #Python, и можно будет веселится https://brython.info/console.html ',
            user: '@Ktulhy',
            date: '4 янв',
          },
          {
            id: 8,
            name: 'Eλευθερίαn',
            text: 'Статическая типизация курильщика в #JS ',
            user: '@abausk',
            date: '2 янв',
          },
          {
            id: 9,
            name: 'Камиль Абзалов',
            text: '#js #javascript\n' +
            'И снова о наболевшем - this в javascript.\n' +
            'Ссылка на статью категории "очень хорошо" - https://getinstance.info/articles/javas ',
            user: '@kamabzalov',
            date: '6 янв',
          },
          {
            id: 10,
            name: 'Елена Орехова',
            text: 'Узнал http://webdiz.com.ua/osnovy-javascript/peremennye-v-javascript … как создать переменную в #JS.',
            user: '@Elena_Orexova',
            date: '8 янв',
          },
        ],
        activeItem: 1,
      };
    },
  };
</script>

<style lang="scss">
    .news-item {
        &__block {
            border-bottom: 1px solid #ccc;
            padding: 20px;
            cursor: pointer;
            &_active {
                background: #ccc;
            }
        }

        &__name {
            font-size: 16px;
            font-weight: 500;
        }

        &__text {
            margin-top: 10px;
            font-size: 22px;
        }

        &__info {
            font-size: 15px;
            color: gray;
            margin-top: 5px;
        }
    }
</style>
