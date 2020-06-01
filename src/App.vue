<template>
  <div id="app">
    <div class="navbar">
      <div class="nav-item">
        <h1 id="navbar-title">BlitzStat</h1>
        <div id="navbar-logo">
          <svg aria-hidden="true" focusable="false" data-prefix="fas"
               data-icon="bolt" role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 320 512" class="svg-inline--fa fa-bolt fa-w-10 fa-2x">
            <path class=""
                  d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"
                  fill="currentColor">
            </path>
          </svg>
        </div>
      </div>
      <div class="nav-item">Heatmap</div>
      <div class="nav-item">Pins</div>
      <div class="nav-item">About</div>
      <div class="nav-item" id="navbar-right">
        <label class="nav-switch">
          <input type="checkbox" class="nav-switch-input">
          <span class="nav-switch-slider round"></span>
        </label>
      </div>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
:root {
  --background-dark: #152231;
  --foreground-dark: #213146;
  --text-dark: #a0b1c5;
  --text-secondary-dark: #d3d5f3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--background-dark);
}

/* NAVBAR */

.fa-bolt {
  color: inherit;
  vertical-align: text-top;
  border-style: none;
  box-sizing: border-box;
  cursor: pointer;
  height: 50px;
  margin-top: 5px;
}

#navbar-logo {
  color: darkgoldenrod;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  width: 65px;
  box-sizing: border-box;
}

#navbar-title {
  color: var(--text-secondary-dark);
}

.nav-item {
  font-family: inherit;
  padding: 18px 16px;
  box-sizing: border-box;
  align-items: center;
  display: inline-flex;
  font-size: 1.4rem;
  font-weight: 600;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 100ms;
}

.nav-item:hover {
  color: var(--text-secondary-dark);
}

.nav-item:last-child {
  margin-left: auto;
}

.nav-switch {
  display: inline-flex;
  width: 60px;
  height: 100%;
  background-color: white;
}

.nav-switch-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.nav-switch-slider {
  cursor: pointer;
  -webkit-transition: .4s;
  transition: .4s;
}

.nav-switch-slider:before {
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

/* SWITCH */
input:checked, .nav-switch-slider {
  background-color: #2196F3;
}

input:focus + .nav-switch-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  transform: translateX(26px);
  -ms-transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.navbar {
  font-family: inherit;
  height: 75px;
  display: flex;
  background-color: var(--foreground-dark);
  color: var(--text-dark);
  justify-content: left;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  box-sizing: border-box;
}
</style>
