<template>
  <div
    ref="pinmap"
  />
</template>

<script>
// import axios from 'axios'

export default {
  name: 'c-pin-map',
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
    pinmapMarkers() {
      return this.points.map(
          // eslint-disable-next-line
          point => new google.maps.Marker({
            // eslint-disable-next-line
            position: new google.maps.LatLng(point.LATITUDE, point.LONGITUDE),
            clickable: true,
            cursor: 'pointer',
            draggable: false,
            title: point.DATE.substring(0, 19),
            opacity: 0.85,
          }))
    },
  },
  mounted() {
    return this.$gmapApiPromiseLazy().then(() => {
      // eslint-disable-next-line
        this.$mapObject = new google.maps.Map(this.$refs.pinmap, {
        zoom: this.initialZoom,
        center: this.mapCenter,
        mapTypeId: this.mapType,
      })

      this.$pins = this.pinmapMarkers

      this.$pins.forEach((pin) => {
        pin.setMap(this.$mapObject)
      })
    })
  },
}
</script>

