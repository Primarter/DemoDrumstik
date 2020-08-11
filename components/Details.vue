<template>
  <div class="details-content">
    <div class="video-positioning">
      <div class="video-wrapper">
        <iframe
          frameBorder="0"
          width="100%"
          height="100%"
          :src="activePost.videoUrl"
          allowfullscreen
        />
      </div>
    </div>
    <div>
      <Stars :level="activePost.level" :scale="30" style="float: right;"/>
      <h1>{{ activePost.title }}</h1>
      <b>{{ activePost.style.toUpperCase() }}</b>
      <p>
        <i class="fa fa-clock-o"></i> {{ formatTime(activePost.duration) + formatSkills(activePost.skills) }}
      </p>
    </div>
    <div>
      <p v-html="activePost.resume">{{ activePost.resume }}</p><br />
      <p v-html="activePost.description">{{ activePost.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stars from '@/components/Stars';
import Formatting from '@/mixins/formatting'

export default {
  mixins: [Formatting],
  data() {
    return {
    }
  },
  components: {
    Stars
  },
  computed: {
    ...mapGetters({
      activePost: 'activePost',
      lessons: 'lessons',
      results: 'results',
      liked: 'liked',
      heartClass: 'heartClass'
    }),
  },
  methods: {
    formatTime(mins) {
      return formatTimeStr(mins);
    },
    formatSkills(skills) {
      return formatSkillStr(skills);
    },
    likeItem(item) {
      if (this.activePost.liked) {
        this.$store.commit('removeLike');
      } else {
        this.$store.commit('addLike');
      }
    },
  }
}
</script>

<style lang="less">

  @import '~/assets/css/devices.less';


  .details-content {
    position: relative;

    div { padding: 1%; }
    b { float: right; }
    p { font-size: 15px; }

    .video-positioning {
      width: 70% !important;
      max-width: 70% !important;
      margin-left: auto !important;
      margin-right: auto !important;

      .video-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25% !important;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-top-width: 0px;
          border-right-width: 0px;
          border-bottom-width: 3px;
          border-left-width: 0px;
          border-style: inset;
          border-color: @neon-blue;
          border-image: initial;
        }
      }
    }
  }

  @media screen and (min-width: 850px) {
    .details-container .details-content Stars { float: right; }
  }

</style>