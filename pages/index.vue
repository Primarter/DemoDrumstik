<template>
  <div class="full-page">
    <div class="library-wrapper">
      <div class="library-banner">
        <h3>Bibliothèque</h3>
        <Search />
        <Filters />
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
      <Footer />
    </div>
    <Details v-if="page == 'Details'" />
    <div v-else class="dummy-page">
      <h1>Development in progress</h1>
      <div>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          class="video-player"
        />
      </div>
    </div>
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
