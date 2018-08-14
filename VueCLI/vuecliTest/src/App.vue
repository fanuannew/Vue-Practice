<template>
  <div id="app">
    <img src="./assets/logo.png">
    
    <div>
    <router-link to="/">首頁</router-link>
    <router-link to="/Hi">HI頁面</router-link>
    <router-link to="/Hi/Hi1">HI頁面1</router-link>
    <router-link to="/Hi/Hi2">HI頁面2</router-link>
  </div>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
