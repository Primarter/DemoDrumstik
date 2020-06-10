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
        <h1>{{ activePost.title }}</h1>
        <p><i class="fa fa-clock-o"></i> {{ activePost.duration }}</p>
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
export default {
  props: ['activePost']
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