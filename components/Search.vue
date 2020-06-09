<template>
  <div class="containerDiv">
    <input type="text" onkeyup="onChange();" />
    <div id="nameContainer"></div>
  </div>
</template>

<style>
.containerDiv {
  display: block;
  margin: auto;
  width: 300px;
}
#nameContainer > p {
  display: inline-block;
  margin: 20px;
}
input {
  width: 200px;
  font-size: 20px;
}
</style>

<script>
export default {
  props: []
}
</script>
