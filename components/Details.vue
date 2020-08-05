<template>
  <div class="details-container">
    <div v-if="activePost != null" class="details-active-wrapper">
      <div class="top-banner">
        <h3>Détails</h3>
        <i @click="likeItem(activePost.id)" :class="heartClass" />
      </div>
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
    </div>
    <div v-else class="awaiting-selection">
      <div class="centered-items">
        <img src="https://www.drumstik.fr/website/pics/dsk_logo.png" alt="Drumstik" />
        <h1>
          <i class="fa fa-arrow-left" /> Sélectionnez un cours sur le panneau de gauche
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stars from '@/components/Stars'
import Footer from '@/components/Footer'

export default {
  head () {
    return {
      script: [{ src: 'formatting.js' }],
    }
  },
  data() {
    return {
    }
  },
  components: {
    Stars,
    Footer
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

  .details-container {
    display: flex;
    color: white;
    background-color: @light-background;

    .details-active-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      -ms-overflow-style: none;
    }

    .centered-items {
      height: 100%;
      width: 100%;
      text-align: center;

      img { margin: auto; }
      h1 { display: block; }
    }

    .top-banner {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color:  @banner-color;
      display: flex;
      height: 68px;
      width: 100%;
      padding: 0.5em;
      justify-content: center;
      text-align: center;

      h3 { width: 100%; }
      i { margin: auto; }
    }

    .details-content {
      position: relative;
      height: 50%;

      div { padding: 1%; }
      b { float: right; }
      p { font-size: 15px; }
    }

    .details-active-wrapper::-webkit-scrollbar {
      display: none;
    }

    .awaiting-selection {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .video-positioning {
      max-width: 70%;
      margin-left: auto;
      margin-right: auto;

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