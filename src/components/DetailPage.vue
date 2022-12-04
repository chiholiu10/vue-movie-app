<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NoResult from "./NoResult.vue";

const queryMovie = ref({});
const isLoading = ref(false);
const route = useRoute();

onMounted(async () => {
  const result = await fetch(`https://api.tvmaze.com/shows/${route.params.id}`);
  const response = await result.json();
  console.log(response);
  queryMovie.value = await response;
  isLoading.value = result.ok;
});
</script>

<template>
  <div class="detail-page-component">
    <div v-if="isLoading">
      <h2 class="detail-page-heading">{{ queryMovie?.name }}</h2>
      <div class="two-columns-desktop">
        <div class="detail-page-image-block column-desktop">
          <img :src="queryMovie.image?.medium" />
          <p class="star-rating">
            {{ queryMovie.rating?.average }}
          </p>
        </div>
        <div class="detail-page-info column-desktop column-desktop-right">
          <p>{{ queryMovie?.language }}</p>
          <div
            v-for="(item, index) in queryMovie.genres"
            :key="index"
            class="pills"
          >
            <span>{{ item }}</span>
          </div>
          <p>
            {{ queryMovie.schedule?.time }}
          </p>
          <p v-for="(item, index) in queryMovie.schedule?.days" :key="index">
            {{ item }}
          </p>
          <p>{{ queryMovie?.premiered }}</p>
          <p class="detail-page-article" v-html="queryMovie?.summary"></p>
        </div>
      </div>
    </div>
    <div v-else>
      <NoResult />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-page-component {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  .pills {
    min-width: 100px;
    height: 30px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
    max-width: 120px;
    display: inline-flex;
    border-radius: 50px;
    background-color: $blue;
    margin: 0 10px 10px 0;
    font-weight: 600;
  }
  .detail-page-image-block {
    position: relative;
    display: inline-block;
    width: auto;
    .star-rating {
      position: absolute;
      bottom: -20px;
      right: -30px;
      @include md {
        top: -30px;
      }
    }
  }
  .star-rating {
    font-size: 30px;
    font-weight: 700;
    border-radius: 50%;
    background-color: $yellow;
    width: 70px;
    color: $black;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .detail-page-article {
    padding: 20px 0;
    line-height: 1.6;
    text-align: left;
    max-width: 600px;
  }
  .detail-page-heading {
    font-size: 30px;
    font-weight: 600;
    padding: 20px 0;
  }
  p {
    margin: 20px 0;
  }
  .two-columns-desktop {
    display: block;
    @include md {
      display: inline-flex;
      flex-direction: row;
    }
    .column-desktop {
      padding: 20px 0;

      &.column-desktop-right {
        @include md {
          padding: 40px;
        }
      }
    }
  }
}
</style>
