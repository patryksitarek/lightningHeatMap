<template>
  <div class="page-wrapper">
    <div class="content-wrapper">
     <p class="top-text">Map controls can be found below the map.</p>
     <heatmap class="map"
              v-if="loaded"
              :key="reloadCounter"
              :radius="radius"
              :opacity="opacity"
              :points="this.points"
            />
      <div class="settings-wrapper">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="radius-slider" class="settings-label">Radius</label>
            <input id="radius-slider" class="setting-slider"
                   type="range" step="1" min="5" max="20"
                   v-model="radius"
                 />
            <p class="setting-value">Value: {{ radius }}</p>
          </div>
          <div class="input-group">
          <label for="opacity-slider" class="settings-label">Opacity</label>
          <input id="opacity-slider" class="setting-slider"
                 type="range" step="0.05" min="0" max="1"
                 v-model="opacity"
               />
          <p class="setting-value">Value: {{ opacity }}</p>
        </div>
        </div>
        <button v-on:click="reloadMap">Apply settings</button>
      </div>
    </div>
  </div>
</template>

<script>
import heatmap from '../components/Heatmap.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: { heatmap },
  data: () => {
    return {
      points: [],
      from: null,
      to: null,
      loaded: false,
      radius: 9,
      opacity: 1,
      reloadCounter: 0,
    }
  },
  methods: {
    loadData(amount = '30000') {
      const url = `/api/latest/${amount}`
      axios
          .get(url)
          .then((response) => {
            console.log(response.data.status)
            const data = response.data.data
            if (data) {
              this.points = data
              this.loaded = true
            }
          })
          .catch((err) => {
            console.error(err)
          })
    },
    reloadMap() {
      this.reloadCounter += 1
    },
  },
  mounted() {
    this.loadData()
  },
}
</script>

<style scoped>
.page-wrapper {
  position: relative;
  width: 75%;
  height: 1200px;
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

.input-wrapper {
  display: flex;
}

.settings-wrapper {
  margin-top: 20px;
}

.input-group {
  display: grid;
}

.setting-value {
  color: var(--text-dark);
  font-family: Avenir, Helvetica, Arial, sans-serif
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
