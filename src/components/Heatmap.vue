<template>
  <div
    ref="heatmap"
  />
</template>

<script>
// import axios from 'axios'

export default {
  name: 'c-heat-map',
  props: {
    lat: {
      type: Number,
      default: () => 52,
    },
    lng: {
      type: Number,
      default: () => 19.5,
    },
    initialZoom: {
      type: Number,
      default: () => 7,
    },
    mapType: {
      type: String,
      default: () => 'roadmap',
    },
    points: {
      type: Array,
      required: true,
    },
    width: {
      type: [String, Number],
      default: () => '100%',
    },
    height: {
      type: [String, Number],
      default: () => '100%',
    },
    opacity: {
      type: Number,
      default: () => 1,
    },
    maxIntensity: {
      type: Number,
      default: () => 15,
    },
    radius: {
      type: Number,
      default: () => 9,
    },
  },
  computed: {
    mapWidth() {
      if (typeof this.width === 'string') {
        return this.width
      } else {
        return `${this.width}px`
      }
    },
    mapHeight() {
      if (typeof this.height === 'string') {
        return this.height
      } else {
        return `${this.height}px`
      }
    },
    mapCenter() {
      // eslint-disable-next-line
      return new google.maps.LatLng(this.lat, this.lng)
    },
    heatmapPoints() {
      return this.points.map(
          // eslint-disable-next-line
        point => new google.maps.LatLng(point.LATITUDE, point.LONGITUDE)
      )
    },
  },
  mounted() {
    // const url = `/api/latest/10000`
    // axios
    //     .get(url)
    //     .then((response) => {
    //       // console.log(response)
    //       const data = response.data.data
    //       if (data) {
    //         this.points = data
    //       }
    //     })
    //     .then(() => {
    return this.$gmapApiPromiseLazy().then(() => {
      // eslint-disable-next-line
      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: this.mapCenter,
        mapTypeId: this.mapType,
      })
      // eslint-disable-next-line
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject,
        opacity: this.opacity,
        // maxIntensity: this.maxIntensity,
        radius: this.radius,
      })

      this.$heatmap.setMap(this.$mapObject)
    })
    // })
  },
}
</script>

