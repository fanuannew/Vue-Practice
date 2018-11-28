<template>
  <div id="app">
    <img src="./assets/logo.png">
    
    <div>
    <router-link to="/">首頁</router-link>
    <router-link to="/Hi">HI頁面</router-link>
    <router-link to="/Hi/Hi1">HI頁面1</router-link>
    <router-link to="/Hi/Hi2">HI頁面2</router-link>
    <router-link to="/Count">Vuex Count</router-link>
  </div>
  <router-view/>
  </div>
</template>

<script>
import { setSonicStatus, initImgArr } from './vuex/data'
export default {
  name: "App",
  // setSonicStatus: setSonicStatus(dispatch), // set sonic status
  // initImgArr: initImgArr(dispatch), // initialize image array
  mounted() {
    // handle the response from mobile client which include Sonic response code and diff data.
    this.getSonicData((status, sonicUpdateData) => {
      switch (status) {
          // only data updates
          case 3: {
              // update the Redux store based on changes coming from the mobile client
              let initState = sonicUpdateData['{initState}'] || '';
              initState.replace(/<!--sonicdiff-initState-->\s*<script>\s*__NEXT_DATA__\s*=([\s\S]+?)module=/ig, function(matched, $1) {
                  window.__NEXT_DATA__ = JSON.parse($1);
              });
              initImgArr(window.__NEXT_DATA__.props.initialState.gameArea);
              console.log("完成轉譯");
              break;
          }
          default:
              break;
      }
      // display sonic status
      console.log("status: "+ status);
      setSonicStatus(status);
    });
  },
  methods:{
    /**
     * Handle the response from mobile client which include Sonic response code and diff data
     *
     * @param callback {function} It executes until it receives an asynchronous callback from the mobile client.
     */
    getSonicData(callback) {
      let sonicHadExecute = 0;   // whether the callback is triggered
      const timeout = 3000;      // a timeout value of 3 seconds is specified to trigger callback

      // Interacts with mobile client by JavaScript interface to get Sonic diff data.
      window.sonic && window.sonic.getDiffData();

      function sonicCallback(data) {
          if (sonicHadExecute === 0) {
              sonicHadExecute = 1;
              callback(data['sonicStatus'], data['sonicUpdateData']);
          }
      }

      setTimeout(function() {
          if (sonicHadExecute === 0) {
              sonicHadExecute = 1;
              callback(0, {});
          }
      }, timeout);

      // the mobile client will invoke method getDiffDataCallback which can send Sonic response code and diff data to websites.
      window['getDiffDataCallback'] = function(sonicData) {
          /**
           * Sonic status:
           * 0: It fails to get any data from mobile client.
           * 1: It is first time for mobile client to use Sonic.
           * 2: Mobile client reload the whole websites.
           * 3: Websites will be updated dynamically with local refresh.
           * 4: The Sonic request of mobile client receives a 304 response code and nothing has been modified.
           */
          let sonicStatus = 0;
          let sonicUpdateData = {};  // sonic diff data
          sonicData = JSON.parse(sonicData);
          switch (parseInt(sonicData['srcCode'], 10)) {
              case 1000:
                  sonicStatus = 1;
                  break;
              case 2000:
                  sonicStatus = 2;
                  break;
              case 200:
                  sonicStatus = 3;
                  sonicUpdateData = JSON.parse(sonicData['result'] || '{}');
                  break;
              case 304:
                  sonicStatus = 4;
                  break;
          }
          sonicCallback({ sonicStatus: sonicStatus, sonicUpdateData: sonicUpdateData });
      };
      const mapDispatchToProps = (dispatch) => {
        return {
            setSonicStatus: bindActionCreators(setSonicStatus, dispatch), // set sonic status
            initImgArr: bindActionCreators(initImgArr, dispatch) // initialize image array
        };
    };
    }
  }
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
