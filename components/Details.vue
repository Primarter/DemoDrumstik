<template>
  <div class="details-container">
    <div v-if="activePost != null" class="details-active-wrapper">
      <div class="top-banner">
        <h3 style="width: 100%">Détails
        </h3>
        <i @click="likeItem(activePost.id)" :class="heartClass" style="margin: auto" />
      </div>
      <iframe
        frameBorder="0"
        width="100%"
        height="40%"
        :src="activePost.videoUrl"
        class="video-player"
      />
      <div style="">
        <Stars :level="activePost.level" :scale="36" style="float: right" />
        <h1>{{ activePost.title }}</h1>
        <b style="float: right">{{ activePost.style.toUpperCase() }}</b>
        <p style="font-size: 15px">
          <i class="fa fa-clock-o"></i> {{ formatTime(activePost.duration) + formatSkills(activePost.skills) }}
        </p>
      </div>
      <div class="description-wrapper">
        <p v-html="activePost.resume">{{ activePost.resume }}</p><br />
        <p v-html="activePost.description">{{ activePost.description }}</p>
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
      heartClass: "fa fa-heart-o fa-2x"
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
    })
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
        this.heartClass = "fa fa-heart-o fa-2x"
      } else {
        this.$store.commit('addLike');
        this.heartClass = "fa fa-heart fa-2x"
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
  border: 2px solid #21242d;
  background-color: #4a4e5e;
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
  display: flex;
  height: 7.5%;
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