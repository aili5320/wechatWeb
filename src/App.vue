<template>
  <div id="app" ref="app">
    <MediaTips v-if="mediaFlag" :media="media" @mediaFlag="getMediaFlag" ></MediaTips>
    <TabBar v-if="$route.meta.TabbarShow" ></TabBar>
    <router-view :project="project"  :resultFlg="resultFlg"></router-view>
    <audio v-show="false" src="@/assets/mp3/新消息.mp3" ref="newMp3"></audio>
  </div>
</template>

<script>
import { createWebSocket } from "@/utils/socket";
import TabBar from "@/components/TabBar.vue";
import MediaTips from "./components/MediaTips.vue";
export default {
  data() {
    return {
      project: [],
      nullList: [],
      media:{},
      mediaFlag:false,
      resultFlg:null,
    };
  },
  components: {
    TabBar,MediaTips
  },
  methods: {
    getMediaFlag(e){
      this.mediaFlag = e
    },
    init() {
      createWebSocket(this.global_callback);
    },
    global_callback(msg) {
      const result = JSON.parse(msg);
      if (result.mediaType != "video") {
        let sendId = result.userId;
        const list = localStorage.getItem(sendId);
        if (list) {
          result.type = false;
          this.project = JSON.parse(list);
          this.project.push(result);
          localStorage.setItem(sendId, JSON.stringify(this.project));
        } else {
          result.type = false;
          this.project[0] = result;
          localStorage.setItem(sendId, JSON.stringify(this.project));
        }
        this.$refs.newMp3.play();
      }
      if (result.mediaType == "video") {
        if(result.mediaFlag){
          this.media = result;
          this.mediaFlag=true;
        }else {
          this.resultFlg=result.mediaFlag
        }
        
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  width: 100%;
  color: #2c3e50;
}

</style>
