<template>
  <div class="search-container">
    <div style="float: left">
      <i class="fa fa-search" style="font-size: 1.5em" />
    </div>
    <span class="in-wrapper">
      <input
        type="search"
        onkeyup="onChange();"
        placeholder="Votre recherche"
      />
    </span>
  </div>
</template>

<style>
.search-container {
  float: left;
  margin: auto;
  min-width: 100%;
  padding: 2%;
  color: black;
  background-color: #ffffff;
  display: block;
}
.search-container input {
  width: 100%;
  font-size: 20px;
}
.in-wrapper {
  display: block;
  overflow: hidden;
  padding: 0 5px;
}
</style>

<script>
export default {
  props: []
}
</script>
