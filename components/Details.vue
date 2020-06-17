<template>
  <div class="details-container">
    <div v-if="activePost != null" class="details-active-wrapper">
      <div class="top-banner">
        <h3 style="width: 100%">Détails</h3>
        <i @click="likeItem(activePost.id)" :class="heartClass" style="margin: auto" />
      </div>
      <div style="position: relative; height: 50%">
        <iframe
          frameBorder="0"
          width="100%"
          height="100%"
          :src="activePost.videoUrl"
          class="video-player"
          allowfullscreen
        />
        <div style="padding: 1%">
          <Stars :level="activePost.level" :scale="36" style="float: right" />
          <h1>{{ activePost.title }}</h1>
          <b style="float: right">{{ activePost.style.toUpperCase() }}</b>
          <p style="font-size: 15px">
            <i class="fa fa-clock-o"></i> {{ formatTime(activePost.duration) + formatSkills(activePost.skills) }}
          </p>
        </div>
        <div style="padding: 1%">
          <p v-html="activePost.resume">{{ activePost.resume }}</p><br />
          <p v-html="activePost.description">{{ activePost.description }}</p>
        </div>
      </div>
    </div>
    <div v-else class="awaiting-selection">
      <div class="centered-items">
        <img src="https://www.drumstik.fr/website/pics/dsk_logo.png" alt="Drumstik" style="margin: auto" />
        <h1 style="display: block">
          <i class="fa fa-arrow-left" /> Sélectionnez un cours sur le panneau de gauche
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stars from '@/components/Stars'

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

<style>
.details-container {
  float: left;
  margin: 0 auto;
  display: flex;
  width: 75%;
  min-height: 100%;
  color: white;
  background-color: #2c303c;
  display: flex;
}

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
}

.top-banner {
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

.details-active-wrapper::-webkit-scrollbar {
  display: none;
}

.awaiting-selection {
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
}

.video-player {
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