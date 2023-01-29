<template>
  <div>
    <van-tabbar  
    v-model="active"
    @change="onChange"
    inactive-color="#333"
    active-color="#56caff"
    route
    
    >
      <van-tabbar-item icon="chat-o" name="message" to="/message" :badge="num">
        信息
        <div class="before"></div>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/contacts">
        好友
        <div class="before"></div>
      </van-tabbar-item>
      <van-tabbar-item  to="/find" name="find" dot>
        <i class="iconfont icon-faxian"></i>
        发现
        <div class="before"></div>
      </van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine" >
        我的
        <div class="before"></div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'TabBar',
  data(){
    return {
      num:"5",
      active:"message"
    }
  },
  methods: {
    onChange() {
      if (this.active == "message") return (this.num = "");
    },
  },

}
</script>

<style lang="less" scoped>
/deep/ .van-tabbar {
  height: 1.8rem;
  // background-color: #ededed;
  background-color: transparent;
  font-size: 1rem;
  margin: 0;
  backdrop-filter: blur(15px);
}
/deep/ .van-tabbar-item--active {
     background-color: transparent; 
}
/deep/ .van-tabbar-item {
  cursor: pointer;
  margin:0 10px;
  line-height: 2em;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  letter-spacing: 5px;
  transition: 0.2s;
  text-align: center;
  position: relative;
  outline: none;
  box-shadow: inset 10px 10px 10px rgba(0,0,0,0.05),
  15px 25px 10px rgba(0,0,0,0.05),
  15px 20px 20px rgba(0,0,0,0.05),
  inset -10px -10px 15px rgba(255, 255, 255, 0.5);
  border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%; 
  .before {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.45;
  }
  i {
    font-size: 25px;
    display: block;
  }
}

/deep/ .van-tabbar-item:nth-child(2) {
  border-radius: 30% 70% 75% 25% / 52% 51% 49% 48%;
}

/deep/ .van-tabbar-item:nth-child(3) {
  border-radius: 29% 71% 49% 51% / 66% 61% 39% 34%;
}

/deep/ .van-tabbar-item:nth-child(4) {
  border-radius:74% 26% 49% 51% / 66% 61% 39% 34%;
}

/deep/ .van-tabbar-item:hover {
  border-radius: 50%;
}



</style>