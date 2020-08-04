<template>
  <div class="details-container">
    <div v-if="activePost != null" class="details-active-wrapper">
      <div class="top-banner">
        <h3>Détails</h3>
        <i @click="likeItem(activePost.id)" :class="heartClass" />
      </div>
      <div class="details-content">
        <iframe
          frameBorder="0"
          width="100%"
          height="100%"
          :src="activePost.videoUrl"
          class="video-player"
          allowfullscreen
        />
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

<style>
  .details-container {
    display: flex;
    color: white;
    background-color: #2c303c;
  }

  .details-container .details-active-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
  }

  .details-container .centered-items {
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .details-container .centered-items img { margin: auto; }
  .details-container .centered-items h1 { display: block; }

  .details-container .top-banner {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color:  #4a4e5e;
    display: flex;
    height: 10%;
    min-height: 50px;
    width: 100%;
    padding: 0.5em;
    justify-content: center;
    text-align: center;
  }

  .details-container .top-banner h3 { width: 100%; }
  .details-container .top-banner i { margin: auto; }

  .details-container .details-content { position: relative; height: 50%; }
  .details-container .details-content div { padding: 1%; }
  .details-container .details-content b { float: right; }
  .details-container .details-content p { font-size: 15px; }
  @media screen and (min-width: 850px) {
    .details-container .details-content Stars { float: right; }
  }

  .details-container .details-active-wrapper::-webkit-scrollbar {
    display: none;
  }

  .details-container .awaiting-selection {
    display: flex;
  }

  .details-container .video-player {
    min-height: 200px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 3px;
    border-left-width: 0px;
    border-style: inset;
    border-color: #60dfe8;
    border-image: initial;
  }
</style>