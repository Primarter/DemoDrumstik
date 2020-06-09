<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ lessonstyle }}</p>
    <div class="stars"><Stars :level="level" /></div>
  </div>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  props: ['title', 'lessonstyle', 'level']
}
</script>
