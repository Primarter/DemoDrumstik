<template>
  <div class="details-container">
    <div v-if="activePost != null" class="details-active-wrapper">
      <div class="top-banner">
          <h3>Détails</h3>
      </div>
      <iframe
        width="100%"
        height="40%"
        :src="activePost.videoUrl"
      />
      <div>
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
        <h1 style="display: inline-block">
          <i class="fa fa-arrow-left" /> Sélectionnez un cours sur le panneau de gauche
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from '@/components/Stars'
export default {
  head () {
    return {
      script: [
        { src: 'formatting.js' }
      ],
    }
  },
  components: {
    Stars
  },
  props: ['activePost'],
  methods: {
    formatTime(mins) {
      return formatTimeStr(mins)
    },
    formatSkills(skills) {
      return formatSkillStr(skills)
    }
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
  padding: 2px;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-banner {
  display: flex;
  height: 10%;
  min-height: 10%;
  width: 100%;
  justify-content: center;
  text-align: center;
}

.details-active-wrapper::-webkit-scrollbar {
  display: none;
}

.awaiting-selection {
  background-image: url("https://www.drumstik.fr/website/pics/dsk_logo.png");
  background-repeat: no-repeat;
  background-position: center 20%;
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>