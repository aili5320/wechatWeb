<template>
  <div class="center">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  loading-text=" " loosing-text=" ">
    <div class="title">
      <div class="ioc">
        <p>发现</p>
      </div>
    </div>
    <div class="centent">
      <div class="firendBox">
        <div class="firends">
          <router-link to="/firendship">
          <div class="tip">
            <i class="iconfont icon-pengyouquan"></i>
            <span>朋友圈</span>
          </div>
        </router-link>
        </div>
      </div>
      </div>
    </van-pull-refresh>
    </div>
</template>

<script>
export default {
   // eslint-disable-next-line vue/multi-word-component-names
   name:"find",
   data(){
    return{
      isLoading: false,
    }
  },
  methods: {
    onRefresh(){
      this.$router.go(0)
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-pull-refresh {
    overflow: visible;
}
   .center {
   background-color: #fff;
  .title {
    position: fixed;
    margin-top: 0;
    margin-left: 0;
    top: 0;
    width: 100%;
    height: 1.5rem;
    // background-color: #ededed;
    background-color: #fff;
    z-index: 99;
    backdrop-filter: blur(15px);
    .ioc {
      position: relative;
      p {
        position: absolute;
        left: 40%;
        width: 50px;
        height: 50px;
        font-weight: 600;
        line-height: 60px;
        color: #111;
        font-size: 20px;
        text-align: center;
        letter-spacing: 2px;
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
          border-radius: 29% 71% 49% 51% / 66% 61% 39% 34%;
      }
      p::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 10px;
        width: 10px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.45;
      }
      p:hover {
        border-radius: 50%;
      }
    }
  }
  .centent {
    width: 100%;
    // margin-bottom: 2rem;
    min-height: 20rem;
    .firendBox {
      margin-top: 1.45rem;
      height: 1.2rem;
      .firends {
        margin: 0 auto;
        width: 98%;
        height: 1.5rem;
        border-radius: 5px;
        position: relative;
        background-color: transparent;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        .tip {
          text-align: left;
          font-size: 25px;
          font-weight: 600;
          line-height: 1.5rem;
          span {
            margin-left: 0.2rem;
            font-weight: 600;
          }
          i {
            margin-left: 0.4rem;
            font-size: 25px;
            font-weight: 400;
          }
        }
      }
      .firends::before {
        content: "";
        position: absolute;
        top: 7px;
        left: 50%;
        transform: translateX(-50%);
        width: 65%;
        height: 7px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
      }
    }
  }
}
</style>