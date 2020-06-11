<template>
  <div class="full-page">
    <div class="vertical-list">
      <div class="library-banner">
        <h3>Bibliothèque</h3>
      </div>
      <Search />
      <div v-for="lesson in results">
        <Post
          :title="lesson.title"
          :lessonStyle="lesson.style"
          :level="lesson.level"
          :postid="lesson.id"
        />
      </div>
    </div>
    <Details :activePost="getPostById(active)"/>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Post from '@/components/Post'
import Details from '@/components/Details'
export default {
  components: {
    Search,
    Post,
    Details
  },
  data() {
    return {
      lessons: require('~/data.json'),
      results: require('~/data.json'),
      active: -1
    }
  },
  methods: {
    getPostById(searchedId) {
      for (const post in this.lessons)
        if (this.lessons[post].id == searchedId)
          return this.lessons[post]
      return null
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
  min-height: 10%;
}
</style>
