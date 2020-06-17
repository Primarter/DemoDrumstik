<template>
  <div class="full-page">
    <div class="library-banner">
      <h3 style="height: 34%; margin: 0;">Bibliothèque</h3>
      <Search style="height: 26%" />
      <Filters style="height: 40%" />
    </div>
    <div class="vertical-list">
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
    <Details v-if="page == 'Details'" style="margin-bottom: 7.5vh"/>
    <div v-else class="dummy-page">
      <h1 style="margin-bottom: 5%">Development in progress</h1>
      <div style="position: relative; height: 50%; width: 70%;">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          class="video-player"
        />
      </div>
    </div>
    <Footer style="left: 30%; width: 70%"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '@/components/Footer'
import Filters from '@/components/Filters'
import Search from '@/components/Search'
import Post from '@/components/Post'
import Details from '@/components/Details'

export default {
  components: {
    Filters,
    Search,
    Post,
    Details,
    Footer
  },
  computed: {
    ...mapGetters({
      lessons: 'lessons',
      results: 'results',
      liked: 'liked',
      activePost: 'activePost',
      filter: 'filter',
      page: 'page'
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
.full-page {
  margin: 0;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  background-color: #21242d;
}

.library-banner {
  background-color: #21242d;
  color: white;
  text-align: center;
  min-height: 20vh;
  height: 20vh;
  position: absolute;
  z-index: 2;
  width: 30%;
  min-width: 30%;
  border-bottom: solid #60dfe8 3px;
}

.dummy-page {
  padding: 2.5%;
  align-content: center;
  align-items: center;
  text-align: center;
  min-width: 70%;
  background-color: #21242d;
  color: white;
}

.hint {
  color: #50576d;
  text-align: center;
}
</style>
