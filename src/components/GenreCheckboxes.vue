<script setup>
const props = defineProps({
  genres: {
    type: Array,
    default: () => [],
  },
  selectedGenres: {
    type: Array,
    default: () => [],
  },
  headingTitle: {
    type: String,
    default: "",
    required: true,
  },
});

const emit = defineEmits(["update:selectedGenres"]);
const updateValue = (value) => {
  let selectedGenresCopy = [...props.selectedGenres];
  const index = selectedGenresCopy.indexOf(value);

  if (index !== -1) {
    selectedGenresCopy.splice(index, 1);
  } else {
    selectedGenresCopy.push(value);
  }
  emit("update:selectedGenres", selectedGenresCopy);
};
</script>

<template>
  <div>
    <h2>{{ headingTitle }}</h2>
    <div class="genre-checkbox-container">
      <label v-for="(option, index) in genres" :key="index">
        <input
          type="checkbox"
          :value="option"
          @input="updateValue($event.target.value)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.genre-checkbox-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-top: 20px;
}
label {
  flex: 1 0 30%;
  margin: 5px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  input {
    margin-right: 5px;
    @include md {
      margin-right: 10px;
    }
  }
  @include md {
    flex: 1 0 21%;
  }
}
h2 {
  text-align: left;
  font-size: 22px;
}

[type="checkbox"] {
  width: 15px;
  height: 15px;
  color: $blue;
  vertical-align: middle;
  -webkit-appearance: none;
  background: none;
  border: 0;
  outline: 0;
  flex-grow: 0;
  border-radius: 50%;
  background-color: $white;
  transition: background 300ms;
  cursor: pointer;
}

/* Pseudo element for check styling */
[type="checkbox"]::before {
  content: "";
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  background-color: transparent;
  background-size: contain;
  box-shadow: inset 0 0 0 1px $lightgrey;
}

/* Checked */
[type="checkbox"]:checked {
  background-color: currentcolor;
}
[type="checkbox"]:checked::before {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
}

/* Disabled */
[type="checkbox"]:disabled {
  background-color: $lightgrey;
  opacity: 0.84;
  cursor: not-allowed;
}

/* IE */
[type="checkbox"]::-ms-check {
  content: "";
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  background-color: transparent;
  background-size: contain;
  box-shadow: inset 0 0 0 1px $lightgrey;
}

[type="checkbox"]:checked::-ms-check {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
}
</style>
