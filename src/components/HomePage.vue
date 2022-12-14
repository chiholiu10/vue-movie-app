<script setup>
import SearchInput from "./SearchInput.vue";
import GenreCheckboxes from "./GenreCheckboxes.vue";
import TvResult from "./TvResult.vue";
import SelectRating from "./SelectRating.vue";
import { ref, computed } from "vue";

const selectedGenres = ref([]);
const fullList = ref([]);
const searchTitle = ref("");
const selectedRating = ref(null);

const ratings = [
  { id: 1, ratingStars: 1 },
  { id: 2, ratingStars: 2 },
  { id: 3, ratingStars: 3 },
  { id: 4, ratingStars: 4 },
];

fetch("https://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((response) => {
    fullList.value = response;
  });

const genres = computed(() => {
  const uniqueGenres = new Set();
  fullList.value.forEach((item) => {
    if (!item.genres) return;
    item.genres.forEach((genre) => uniqueGenres.add(genre));
  });
  return [...uniqueGenres];
});

const filteredList = computed(() => {
  if (
    !selectedGenres.value.length &&
    !selectedRating.value &&
    !searchTitle.value.length
  )
    return fullList.value;
  return fullList.value
    .filter((item) => {
      if (!selectedGenres.value.length) return true;
      let isInGenres = false;
      for (let genre of item.genres) {
        isInGenres = selectedGenres.value.includes(genre);
        if (isInGenres) {
          break;
        }
      }
      return isInGenres;
    })
    .filter((item) => {
      if (!selectedRating.value) return true;
      return item.rating.average >= selectedRating.value * 2;
    })
    .filter((item) => {
      if (!searchTitle.value) return true;

      return item.name.toLowerCase().includes(searchTitle.value.toLowerCase());
    });
});
</script>

<template>
  <div class="main-container">
    <GenreCheckboxes :genres="genres" v-model:selectedGenres="selectedGenres" />
    <SelectRating :ratings="ratings" v-model:selectedRating="selectedRating" />
    <div class="search-input-container">
      <SearchInput v-model:searchTitle="searchTitle" />
    </div>
    <TvResult headingTitle="Movies" :filteredList="filteredList" />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  min-height: 100vh;
  .search-input-container {
    @include md {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
