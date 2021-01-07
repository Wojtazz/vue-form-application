<template>
  <div id="app">
    <div class="titleHeader">
      <h1>New event</h1>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(235, 235, 235);
  height: 980px;
}
.titleHeader {
  height: 90px;
  background: linear-gradient(to top, rgb(18, 58, 179) 80%, rgb(9, 29, 90) 20%);
  margin-top: -20px;
}
h1 {
  position: relative;
  color: white;
  left: -14%;
  top: 40%;
}
</style>
