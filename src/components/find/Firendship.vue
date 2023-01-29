<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  loading-text=" " loosing-text=" ">
    <div class="title">
      <van-icon name="arrow-left" class="goblack" @click="goblack" />
      <i class="iconfont icon-xiangji"></i>
      <div class="picBox">
        <img src="@/assets/images/userPic.jpg" alt="" />
      </div>
    </div>
    <div class="list">
      <div class="info" v-for="(item,index) in 9" :key="index">
        <div class="userpic">
          <img src="@/assets/images/userPic.jpg" alt="" />
        </div>
        <div class="message">
          <div class="username">用户1</div>
          <div class="tip">
            发表了朋友圈
          </div>
        </div>
        <div class="wall">
          <div class="pic" v-for="(item,index) in 9" :key="index">
            <img src="@/assets/images/pic1.png" alt="">
          </div>
        </div>
          <div class="time">2天前</div>
          <div class="tips">
            <van-icon name="more-o" />
          </div>
          <div class="dis">
            <van-icon name="like-o"  class="like"/>
            <van-icon name="comment-o"  class="comment"/>
          </div>
      </div>
    </div>
  </van-pull-refresh>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "firendship.vue",
  data(){
    return{
      isLoading: false,
    }
  },
  methods: {
    goblack() {
      this.$router.go(-1);
    },
    onRefresh(){
      this.$router.go(0)
    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-pull-refresh {
    overflow: visible;
}
.title {
  position: relative;
  top: -4rem;
  width: 100%;
  height: 10rem;
  background: url(@/assets/images/background.jpg) no-repeat;
  background-size: 100%;
  position: relative;
  i {
    position: absolute;
    font-size: 25px;
    // font-weight: 600;
    color: #fff;
    top: 4.5rem;
    right: 0.5rem;
  }
  .goblack {
    left: 0.5rem;
  }
  .picBox {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    right: 0.5rem;
    bottom: -1rem;
  }
}
.list {
  margin-top: -4rem;
  .info {
    width: 100%;
    height: 7.5rem;
    // max-height: 6rem;
    margin-top: 1rem;
    // max-height: 6rem;
    position: relative;
    border-bottom: 1px solid #c4c4c4;
    .userpic {
      position: absolute;
      left: 0.2rem;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 8px;
      overflow: hidden;
    }
    .message {
      width: 60%;
      max-height: 2rem;
      margin-left: 2.2rem;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      .username {
        font-weight: 600;
      }
    }
    .wall {
      margin-top: .2rem;
      position: absolute;
      left: 20%;
      // max-width: 10rem;
      display: flex;
      flex-flow: row wrap;
     
      .pic {
      width: 2rem;
      height: 2rem;
      margin-bottom: -.5rem;
      margin-left: .1rem;
      }
    }
    .time {
      position: absolute;
      bottom: .5rem;
      margin-left: 2.2rem;
      font-size: 15px;
      color: #c4c4c4;
    }
    .tips {
      position: absolute;
      // right: .5rem;
      right: 0;
      bottom: .2rem;
      font-size: 20px;
      width: 2rem;
      height: 1rem;
      background-color: #ffffff;
      z-index: 999;
      i {
        // text-align: center;
        line-height: 1rem;
     }
    }
    .dis {
      position: absolute;
      right: .5rem;
      bottom: .3rem;
      font-size: 20px;
      width: .5rem;
      height: .8rem;
      border-radius: 5px;
      background-color: #444444;
      transition: width .2s linear 0s;
      i {
        display: none;
        line-height: .8rem;
        text-align: center;
        margin-right: .5rem;
        color: #fff;
      }
      .like {
        margin-left: .4rem;
      }
    }
    .tips:hover + .dis {
      width: 4rem;
    }
    .tips:hover + .dis>i {
     display: inline-block;
    }
    .dis:hover {
      width: 4rem;
    }
    .dis:hover>i {
      display: inline-block;
    }
  }
}
</style>