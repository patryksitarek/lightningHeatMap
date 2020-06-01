<template>
  <div class="page-wrapper">
    <div class="content-wrapper">
     <p class="top-text">Map controls can be found below the map.</p>
     <heatmap class="map"
              :points="this.$store.state.strikes"
            />
    </div>
  </div>
</template>

<script>
import heatmap from '../components/Heatmap.vue'

export default {
  name: 'Home',
  components: { heatmap },
  data: () => {
    return {
      from: null,
      to: null,
    }
  },
  created() {
    this.$store.dispatch('loadStrikes')
  },
}
</script>

<style scoped>
.page-wrapper {
  position: relative;
  width: 75%;
  height: 800px;
  margin: 50px auto 200px;
  background-color: var(--foreground-dark);
  border-radius: 5px;
  color: var(--text-dark);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
}

.content-wrapper {
  position: relative;
  text-align: left;
  height: 80%;
  width: 95%;
  margin: 50px auto auto;
}

.top-text {
  position: relative;
  color: inherit;
  font-family: inherit;
  font-size: 1.5rem;
  padding-top: 25px
}

.map {
  position: relative;
  border: 1px solid #999;
  text-align: center;
  line-height: 30px;
  background-color: var(--background-dark);
  height: 100%;
  width: 100%;
}
</style>
