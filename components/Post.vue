<template>
  <section v-if="$parent.active != postid" class="post" @click="$parent.active = postid">
    <h3>{{ title }}</h3>
    <p>{{ capitalizeFLetter(lessonStyle) }}</p>
    <Stars :level="level" :scale="18" style="float: right" />
  </section>
  <section v-else class="active-post" @click="$parent.active = postid">
    <h3>{{ title }}</h3>
    <p>{{ capitalizeFLetter(lessonStyle) }}</p>
    <Stars :level="level" :scale="18" style="float: right" />
  </section>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  components: {
    Stars
  },
  props: ['title', 'lessonStyle', 'level', 'postid'],
  methods: {
    capitalizeFLetter(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }
  }
}
</script>

<style>
.post {
  background-color: #21242d;
  color: white;
  padding: 12px;
  text-decoration: none;
  display: flow-root;
  min-height: 10vh;
  border-bottom: solid #60dfe8 1px;
}

.post:hover {
  background-color: #4d5261;
}

.active-post {
  border-left: solid #60dfe8 3px;
  background-color: #4d5261;
  color: white;
  padding: 12px;
  text-decoration: none;
  display: flow-root;
  min-height: 10vh;
  border-bottom: solid #60dfe8 1px;
}
</style>
