<script setup>
import GenreCheckboxes from "./GenreCheckboxes.vue";
import { ref, computed } from "vue";

const selectedGenres = ref([]);
const fullList = ref([]);

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
    !searchTitle.value.length &&
    !selectedLanguage.length
  )
    return fullList.value;
  return fullList.value.filter((item) => {
    if (!selectedGenres.value.length) return true;
    let isInGenres = false;
    for (let genre of item.genres) {
      isInGenres = selectedGenres.value.includes(genre);
      if (isInGenres) {
        break;
      }
    }
    return isInGenres;
  });
});
</script>

<template>
  <div class="main-container">
    <GenreCheckboxes :genres="genres" v-model:selectedGenres="selectedGenres" />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
}
</style>
