  <template>
    <div class="hi">
        <p>{{msg}}</p>

    
    </div>
</template>

<script>
export default {
  name: "hi2",
  data() {
    return {
      msg: "Hi. I'm Hi2"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
