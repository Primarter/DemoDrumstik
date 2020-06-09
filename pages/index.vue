<template>
  <div class="container">
    <div class="vertical-list">
      <section class="active">
        <h1>Bibliothèque</h1>
        <i class="fa fa-search" style="font-size: 1.5em"></i>
      </section>
      <section v-for="lesson in lessons" :key="lesson">
        <Post
          :title="lesson.title"
          :lessonstyle="lesson.style"
          :level="lesson.level"
        />
      </section>
    </div>
    <div class="details">DETAILS THINGY</div>
  </div>
</template>

<script>
import Post from '@/components/Post'
export default {
  components: {
    Post
  },
  data() {
    return {
      lessons: require('~/data.json')
    }
  }
}
</script>

<style>
.details {
  float: left;
  margin: 0 auto;
  display: flex;
  width: 75%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid #21242d;
  padding: 2px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
}
</style>
