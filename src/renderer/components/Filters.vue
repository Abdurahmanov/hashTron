<template>
    <div class="sidebar__block">
       <div class="sidebar__title">Filters</div>
        <div class="sidebar__list">
            <div class="sidebar__item" v-for="item in filters" :key="item.id">
                <input type="checkbox" :id="item.id" :value="item.id" v-model="filterCheck">
                <label :for="item.id" >
                    {{item.name}}
                </label>

            </div>
        </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        filters: [
          {
            id: 1,
            name: 'Instagram',
          },
          {
            id: 2,
            name: 'VK',
          },
          {
            id: 3,
            name: 'Facebook',
          },
        ],
        filterCheck: [2],
      };
    },
  };
</script>

<style lang="scss">

    .sidebar__item {
        input {
            display: none;

            &:checked + label:before{
                background: blue;
                transition: 0.3s;
            }
        }

        label {
            display: block;
            position: relative;
            padding-left: 25px;

            &:after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                border: 1px solid #ccc;
                left: 0;
                top: calc(50% - 10px)
            }

            &:before {
                content: '';
                position: absolute;
                width: 8px;
                height: 8px;
                background: transparent;
                top: calc(50% - 5px);
                left: 5px;
                transition: 0.3s;
            }
        }
    }
</style>
