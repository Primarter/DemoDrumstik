<template>
  <div class="stars-wrapper">
    <div v-for="idx in 5" :key="idx" class="star">
      <img v-if="idx <= level" src="../assets/fill-star.svg" alt="Star" :width="scale" />
      <img v-else src="../assets/empty-star.svg" alt=""  :width="scale" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['level', 'scale']
}
</script>

<style>
  .stars-wrapper { padding: 0 !important; }
  .star { display: inline; padding: 0 !important; }
</style>
