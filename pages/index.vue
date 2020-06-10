<template>
  <div class="full-page">
    <div class="vertical-list">
      <div class="library-banner">
        <h1>Bibliothèque</h1>
      </div>
      <Search />
      <div v-for="lesson in lessons" :key="lesson">
        <Post
          :title="lesson.title"
          :lessonstyle="lesson.style"
          :level="lesson.level"
        />
      </div>
    </div>
    <div class="details">DETAILS THINGY</div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Post from '@/components/Post'
export default {
  components: {
    Search,
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
  color: white;
  border: 2px solid #21242d;
  background-color: #4a4e5e;
  padding: 2px;
}

.full-page {
  margin: 0 auto;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
}

.library-banner {
  background-color: #21242d;
  color: white;
  padding: 1em;
  display: flow-root;
  text-decoration: none;
  min-height: 10%;
}
</style>
