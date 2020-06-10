<template>
  <section>
    <h3>{{ title }}</h3>
    <p>{{ capitalizeFLetter(lessonstyle) }}</p>
    <Stars :level="level" class="stars" />
  </section>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  props: ['title', 'lessonstyle', 'level'],
  methods: {
    capitalizeFLetter(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }
  }
}
</script>

<style>
.stars {
  float: right;
}
</style>
