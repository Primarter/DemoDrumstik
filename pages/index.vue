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
        <div v-for="(lesson, key) in results" :key="key">
          <Post
            v-if="checkFilter(lesson)"
            :title="lesson.title"
            :lessonStyle="lesson.style"
            :level="lesson.level"
            :postid="lesson.id"
          />
        </div>
      </div>
      <Footer class="footer-positioning" />
    </div>
    <BaseHighlight v-if="activePost.title" :title="tradTitle(page)" :showLike="page == 'Details'">
      <Details v-if="page == 'Details'" />
      <Graph v-else-if="page == 'Graphics'" />
      <div v-else class="dummy-page">
        <h1>Development in progress</h1>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          class="video-player"
        />
        </div>
    </BaseHighlight>
    <div v-else class="awaiting-selection">
      <div class="centered-items">
        <img src="https://drumstik.com/wp-content/themes/Drumstik_Theme/img/logo-text.png" alt="Drumstik" width="500px"/>
        <h1><i class="fa fa-arrow-left" /> Sélectionnez un cours sur le panneau de gauche</h1>
      </div>
    </div>
  </div>
</template>

<!--<script lang="ts">
import Footer from '@/components/Footer.vue'
import Filters from '@/components/Filters.vue'
import Search from '@/components/Search.vue'
import Post from '@/components/Post.vue'
import BaseHighlight from '@/components/BaseHighlight.vue'
import Details from '@/components/Details.vue'
import Graph from '@/components/Graph.vue'
import { Vue, Component, Getter } from 'nuxt-property-decorator'
@Component({
  components: {
    Footer,
    Filters,
    Search,
    Post,
    BaseHighlight,
    Details,
    Graph
  },
})
export default class Index extends Vue {
  @Getter('lessons') lessons
  @Getter('results') results
  @Getter('liked') liked
  @Getter('activePost') activePost
  @Getter('filter') filter
  @Getter('page') page

  initLikes() {
    this.$store.commit('initLikes');
  }
  getPostById(searchedId: number) {
    for (const post in this.lessons)
      if (this.lessons[post].id == searchedId)
        return this.lessons[post]
    return null
  }
  checkFilter(lesson: any) {
    if (this.page == 'Graphics' && (!lesson.performances && !lesson.stopwatches))
      return false;
    if (this.filter == 'all')
      return true;
    if (this.filter == 'favorites' && lesson.liked == true)
      return true;
    if (this.filter == 'files')
      return true;
    return false;
  }
  tradTitle(title: string) {
    switch (title) {
      case 'Details':
        return 'Détails';
      case 'Graphics':
        return 'Statistiques';
      default:
        return 'En développement';
    }
  }
}
</script>-->

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Footer from '~/components/Footer.vue'
import Filters from '~/components/Filters.vue'
import Search from '~/components/Search.vue'
import Post from '~/components/Post.vue'
import BaseHighlight from '~/components/BaseHighlight.vue'
import Details from '~/components/Details.vue'
import Graph from '~/components/Graph.vue'
import extractWasm from '~/mixins/extractWasm'

export default Vue.extend({
  data() {
    return({
      Wasm: undefined
    })
  },
  components: {
    Footer,
    Filters,
    Search,
    Post,
    BaseHighlight,
    Details,
    Graph
  },
  mixins: [extractWasm],
  computed: {
    ...mapGetters({
      lessons: 'getLessons',
      results: 'getResults',
      liked: 'getLiked',
      activePost: 'getActivePost',
      filter: 'getFilter',
      page: 'getPage'
    })
  },
  methods: {
    initLikes() {
      this.$store.commit('initLikes');
    },
    getPostById(searchedId: number): any {
      for (const post in this.lessons)
        if (this.lessons[post].id == searchedId)
          return this.lessons[post]
      return null
    },
    checkFilter(lesson: any): boolean {
      if (this.page == 'Graphics' && (!lesson.performances && !lesson.stopwatches))
        return false;
      if (this.filter == 'all')
        return true;
      if (this.filter == 'favorites' && lesson.liked == true)
        return true;
      if (this.filter == 'files')
        return true;
      return false;
    },
    tradTitle(title: string): string {
      switch (title) {
        case 'Details':
          return 'Détails';
        case 'Graphics':
          return 'Statistiques';
        default:
          return 'En développement';
      }
    }
  },
  mounted() {
    //this.Wasm = this.extractModule();
    this.initLikes();
  }
})
</script>