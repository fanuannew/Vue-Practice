<template>
  <div>
    <h2>{{msg}}</h2><hr/>
    <h3>{{$store.state.count}}--{{count}}</h3>
    <p>
      <button @click="$store.commit('add')">+</button>
      <button @click="$store.commit('reduce')">-</button>
    </p>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "Hello Vuex"
    };
  },
  // computed: { //第一種方法
  //   count() {
  //     return this.$store.state.count;
  //   }
  // },
  //computed: mapState(["count"]), //第二種方法
  // computed: mapState({
  //   //第三種方法
  //   count: function(state) {
  //     return state.count;
  //   }
  // }),
  computed: {
    ...mapState(["count"]),
    // count() {
    //   return this.$store.getters.count;
    // }
    ...mapGetters(["count"])
  },
  methods: mapMutations(["add", "reduce"]),
  store
};
</script>

