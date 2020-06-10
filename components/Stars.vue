<template>
  <div>
    <div v-for="idx in 5" :key="idx" style="display: inline">
      <img v-if="idx <= level" src="../assets/fill-star.svg" alt="Star" />
      <img v-else src="../assets/empty-star.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['level']
}
</script>
