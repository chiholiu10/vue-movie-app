<script setup>
import NoResult from "./NoResult.vue";
import vue3StarRatings from "vue3-star-ratings";
defineProps({
  filteredList: {
    type: Array,
    default: () => [],
  },
  headingTitle: {
    type: String,
  },
});
</script>

<template>
  <div class="scrolling-wrapper">
    <div v-if="filteredList.length > 0">
      <h2 class="heading-title">{{ headingTitle }}</h2>
      <ul>
        <li v-for="tv in filteredList" :key="tv.id">
          <router-link :to="`/show/${tv.id}`" className="tv-list-anchor">
            <img :src="tv.image?.medium" />

            <h2>{{ tv.name }}</h2>
            <vue3-star-ratings
              :numberOfStars="Math.floor(tv.rating.average / 2)"
              inactiveColor="#ff9800"
              :showControl="false"
              :disableClick="true"
              starSize="20"
            />
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <NoResult />
    </div>
  </div>
</template>

<style scoped lang="scss">
.scrolling-wrapper {
  box-sizing: border-box;
  width: 100vw;
  .heading-title {
    font-size: 24px;
    font-weight: 600;
    background-color: $transparent;
    margin: 50px 0;
  }
  ul {
    list-style-type: none;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    li {
      display: inline-block;
      flex-direction: column;
      min-width: 200px;
      margin: 0 20px;
      position: relative;
      width: 200px;
      overflow: hidden;
      h2 {
        font-size: 18px;
        width: 100%;
        overflow: hidden;
        white-space: no-wrap;
        text-overflow: ellipsis;
        text-align: center;
        padding: 10px 0;
        opacity: 0.8;
      }

      .tv-list-anchor {
        background-color: $black;
        color: $white;
        display: block;
        &:hover {
          color: $white;
        }
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
