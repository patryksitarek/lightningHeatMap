// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {
//     strikes: [],
//     error: null,
//   },
//   mutations: {
//     resetStrikes(state) {
//       state.strikes = []
//     },
//     setError(state, error) {
//       state.error = error
//     },
//     resetError(state) {
//       state.error = null
//     },
//     updateStrikes(state, newStrikes) {
//       state.strikes = newStrikes
//     },
//     addStrikes(state, newStrikes) {
//       // eslint-disable-next-line prefer-const
//       for (let strike of newStrikes) {
//         state.strikes.push(strike)
//       }
//     },
//   },
//   actions: {
//     resetStrikes({ context }) {
//       context.commit('resetError')
//       context.commit('resetStrikes')
//     },
//     updateStrikes({ context }, newStrikes) {
//       console.log('updating strikes')
//       context.commit('resetError')
//       context.commit('updateStrikes', newStrikes)
//     },
//     addStrikes({ context }, newStrikes) {
//       context.commit('resetError')
//       context.commit('addStrikes', newStrikes)
//     },
//     loadStrikes({ context }, amount = '10000') {
//       const url = `/api/latest/${amount}`
//       axios
//           .get(url)
//           .then((response) => {
//             console.log(response)
//             const data = response.data.data
//             if (data) {
//               console.log('dispatching')
//               console.log(data)
//               context.dispatch('updateStrikes', data)
//             }
//           })
//     },
//   },
//   modules: {
//   },
// })
