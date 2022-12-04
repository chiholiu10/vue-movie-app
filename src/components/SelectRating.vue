<script setup>
import vue3StarRatings from "vue3-star-ratings";
defineProps({
  ratings: {
    type: Array,
    default: () => [],
  },
  selectedRating: {
    type: Number,
    default: 2,
  },
  radio: {
    type: String,
  },
});
const emit = defineEmits(["update:selectedRating"]);
const updateValue = (value) => {
  emit("update:selectedRating", Number(value));
};
</script>

<template>
  <div class="star-rating-component">
    <div
      v-for="(option, index) in ratings"
      :key="index"
      class="star-rating-block"
    >
      <label :class="'label' + index">
        <input
          type="radio"
          name="radio + index"
          :value="option.ratingStars"
          :checked="index === 0"
          @input="updateValue($event.target.value)"
        />
        <vue3-star-ratings
          class="chiho"
          :numberOfStars="option.ratingStars"
          inactiveColor="#ff9800"
          :showControl="false"
          :disableClick="true"
          starSize="20"
        />
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
label {
  display: inline-flex;
  padding: 20px 0;
  &:not(.label1) {
    margin: 0 20px;
  }

  .vue3-star-ratings__wrapper {
    padding: 0;
    margin: 0;
  }
}
.star-rating-component {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  @include md {
    flex-direction: row;
  }
  .star-rating-block {
    width: 100%;
    margin: 5px 0;
    @include md {
      width: auto;
      padding: 0 20px;
    }
    display: flex;

    label {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
