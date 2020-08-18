<template>
  <section v-if="activePost == null || activePost.id != postid" class="post" @click="changeActive(postid)">
    <h4>{{ title }}</h4>
    <p>{{ capitalizeFLetter(lessonStyle) }}</p>
    <Stars :level="level" :scale="22" style="float: right" />
  </section>
  <section v-else class="active-post">
    <h4>{{ title }}</h4>
    <p>{{ capitalizeFLetter(lessonStyle) }}</p>
    <Stars :level="level" :scale="22" style="float: right" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '~/components/LineChart'
import Stars from '~/components/Stars'

export default {
  components: {
    Stars
  },
  props: ['title', 'lessonStyle', 'level', 'postid'],
  computed: {
    ...mapGetters({
      activePost: 'activePost',
    })
  },
  methods: {
    capitalizeFLetter(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase()
    },
    changeActive(postid) {
      this.$store.commit('updateActive', postid);
    }
  }
}
</script>

<style lang="less">

  @import '~/assets/css/devices.less';

  .post {
    font-size: 11px;
    background-color: @dark-background;
    color: white;
    padding: 0;
    text-decoration: none;
    display: flow-root;
    height: 80px;
    border-bottom: solid @neon-blue 1px;
    padding-top: 3px;
  }

  .post:hover {
    cursor: pointer;
    background-color: #4d5261;
    animation-name: post-click;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes post-click {
    from { background-color: @dark-background; padding: 3px 0 0 0; }
    to { background-color: #4d5261; padding: 3px 0 0 5px; }
  }

  .active-post {
    background-color: #4d5261;
    color: white;
    padding: 0;
    text-decoration: none;
    display: flow-root;
    height: 80px;
    border-bottom: solid @neon-blue 1px;
    animation-name: post-click;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  .post h4, p {
    margin: 0;
  }

  .active-post h4, p {
    margin: 0;
  }
</style>