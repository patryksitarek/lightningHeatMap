<template>
  <div class="page-wrapper">
    <div class="content-wrapper">
     <p class="top-text">Map controls can be found below the map.</p>
     <heatmap class="map"
              v-if="loaded && isHeatmap"
              :key="reloadCounter"
              :radius="radius"
              :opacity="opacity"
              :points="this.points"
            />
      <pinmap class="map"
              v-else-if="loaded && !isHeatmap"
              :key="reloadCounter"
              :points="this.points"
            />
      <div class="settings-wrapper">
        <div class="input-wrapper">
          <div v-if="isHeatmap" class="input-group">
            <label for="radius-slider" class="settings-label">Radius</label>
            <input id="radius-slider" class="setting-slider"
                   type="range" step="1" min="5" max="20"
                   v-model="radius"
                 />
            <p class="setting-value">Value: {{ radius }}</p>
          </div>
          <div v-if="isHeatmap" class="input-group">
            <label for="opacity-slider" class="settings-label">Opacity</label>
            <input id="opacity-slider" class="setting-slider"
                   type="range" step="0.05" min="0" max="1"
                   v-model="opacity"
            />
            <p class="setting-value">Value: {{ opacity }}</p>
          </div>
          <div class="input-group">
            <label for="strikes-slider" class="settings-label">Strikes to load</label>
            <input id="strikes-slider" class="setting-slider"
                   type="range" :step="Math.floor(maxStrikes / 1000)" min="100" :max="maxStrikes"
                   v-model="strikes"
            />
            <label v-if="isHeatmap" class="settings-label" for="select-all">
              Show all <input v-model="loadAll" id="select-all" type="checkbox">
            </label>
            <p v-if="isHeatmap && loadAll" class="setting-value">Showing all strikes</p>
            <p v-else class="setting-value">Value: {{ strikes }}</p>
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
import pinmap from '../components/Pinmap.vue'

export default {
  name: 'Home',
  components: { pinmap, heatmap },
  data: () => {
    return {
      points: [],
      from: null,
      to: null,
      loaded: false,
      radius: 9,
      opacity: 1,
      strikes: 1000,
      reloadCounter: 0,
      retrieved: 0,
      loadAll: true,
      dbCount: 0,
    }
  },
  methods: {
    loadData(amount = 'all') {
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
    getCount() {
      axios
          .get('/api/count')
          .then((response) => {
            this.dbCount = response.data.data
          })
          .catch((err) => {
            console.error(err)
          })
    },
    reloadMap() {
      if (this.isHeatmap && this.loadAll) this.strikes = this.dbCount
      if (this.retrieved !== this.strikes) {
        this.loaded = false
        this.loadData(this.strikes)
        this.retrieved = this.strikes
      }
      this.reloadCounter += 1
    },
  },
  computed: {
    isHeatmap() {
      return this.$route.fullPath === '/'
    },
    maxStrikes() {
      return (this.isHeatmap) ? this.dbCount : 10000
    },
  },
  mounted() {
    if (!this.isHeatmap) {
      this.loadData(this.strikes)
    } else {
      this.loadData()
    }
    this.getCount()
  },
}
</script>

<style scoped>
.page-wrapper {
  position: relative;
  width: 75%;
  height: 1300px;
  margin: 50px auto 50px;
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
