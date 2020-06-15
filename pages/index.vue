<template>
  <div class="full-page">
    <div class="vertical-list">
      <div class="library-banner">
        <h3>Bibliothèque</h3>
        <Search style="height: 5%" />
        <Filters style="height: 5%" />
      </div>
      <h1 v-if="results.length == 0" class="hint">No results</h1>
      <div v-for="lesson in results">
        <Post
          v-if="checkFilter(lesson)"
          :title="lesson.title"
          :lessonStyle="lesson.style"
          :level="lesson.level"
          :postid="lesson.id"
        />
      </div>
    </div>
    <Details />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Filters from '@/components/Filters'
import Search from '@/components/Search'
import Post from '@/components/Post'
import Details from '@/components/Details'

export default {
  components: {
    Filters,
    Search,
    Post,
    Details
  },
  computed: {
    ...mapGetters({
      lessons: 'lessons',
      results: 'results',
      liked: 'liked',
      activePost: 'activePost',
      filter: 'filter'
    })
  },
  methods: {
    initLikes() {
      this.$store.commit('initLikes');
    },
    getPostById(searchedId) {
      for (const post in this.lessons)
        if (this.lessons[post].id == searchedId)
          return this.lessons[post]
      return null
    },
    handleResize() {
      this.$store.commit('updateWindowSize', window.innerWidth, window.innerHeight)
    },
    checkFilter(lesson) {
      if (this.filter == 'all')
        return true;
      if (this.filter == 'favorites' && lesson.liked == true)
        return true;
      if (this.filter == 'files')
        return true;
    }
  },
  mounted() {
    this.initLikes();
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
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
  background-color: #21242d;
}

.library-banner {
  background-color: #21242d;
  color: white;
  text-align: center;
  min-height: 50px;
}

.hint {
  color: #50576d;
  text-align: center;
}
</style>
