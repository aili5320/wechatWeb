<template>
  <div class="center">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      loading-text=""
      loosing-text=""
    >
      <div class="title">
        <div class="ioc">
          <p>信息</p>
          <van-icon name="add-o" />
        </div>
      </div>
      <div class="centent">
        <div class="searchBox">
          <div class="search">
            <div class="tip">
              <van-icon name="search" />
              <span>搜索</span>
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in msgIonfo"
          :key="index"
          @click="diaLog(item)"
        >
          <van-swipe-cell>
            <van-card
              :price="item.time | splitTime"
              :title="item | splictName"
              :desc="item | splitContent"
              class="goods-card"
              :thumb="item | splictPic  "
            />
            <template #right>
              <van-button
                square
                text="标为未读"
                type="danger"
                class="delete-button"
                @click="unreadBtn"
              />
              <van-button
                square
                text="不显示"
                type="danger"
                class="delete-button"
                @click="blankBtn"
              />
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteBtn(item)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "message",
  props:['project'],
  watch: {    
    project: function () {
      for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.length == "32") {
        let result = JSON.parse(localStorage.getItem(key));
        this.data = result[result.length - 1];
        this.msgIonfo=[];
        this.msgIonfo.push(this.data);
      }
    }
  }
    },
  data() {
    return {
      msgIonfo: [],
      userInfo:{},
      isLoading: true,
      data:{},
    };
  },
  filters: {
    splitTime: function (e) {
    let startTime = new Date(e); 
    let endTime = new Date(); 
    let usedTime = endTime - startTime; // 相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
    let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
    let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
    let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
    let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
    if(days>90) return "半年前"
    if(days>60) return "两个月前"
    if(days>30) return "一个月前"
    if(days>0) return days + '天前'
    if(hours>0) return hours + '小时前'
    if(minutes>0) return minutes + '分钟前'
    return '0分钟前'
    },
    splitContent: function(e){
      if(e.content) return e.content
      if(e.voice) return "语音"
      if(e.sendPic) return "图片"
    },
    splictPic:function(e){
      if(e.type) {
        return e.friPic
      } else  {
        return e.userPic
      }
    },
    splictName :function(e){
      if(e.type) {
        return e.friRealname
      } else  {
        return e.realName
      }
    },
  },
  methods: {
    diaLog(item) {
      let query =null;
      if(item.type){
         query = {
          sendId:item.sendId,
          friRealname: item.friRealname,
          friPic: item.friPic,
        }
      }else {
        query = {
          sendId:item.userId,
          friRealname: item.realName,
          friPic: item.userPic,
        }
      }


      this.$router.push({
        path: "/diaLog",
        query: query
      });
    },
    onRefresh() {
      this.$router.go(0);
    },
    unreadBtn() {
      console.log("标记为未读");
    },
    blankBtn() {
      console.log("不显示");
    },
    deleteBtn(e) {
      if(e.userId==this.userInfo.userId) {
        localStorage.removeItem(e.sendId)
      } else  {
        localStorage.removeItem(e.userId)
      }
      this.$router.go(0)
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.length == "32") {
        let result = JSON.parse(localStorage.getItem(key));
        this.data = result[result.length - 1];
        this.msgIonfo.push(this.data);
      }
    }
   
  },
};
</script>

<style lang="less" scoped>
.center {
  // background-color: #ededed;
  background-color: #fff;

  /deep/ .van-pull-refresh {
    overflow: visible;
  }
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
        font-size: 18px;
        font-weight: 600;
        line-height: 60px;
        color: #111;
        letter-spacing: 0.1em;
        font-size: 20px;
        text-align: center;
        letter-spacing: 2px;
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
        border-radius: 50%;
      }
      // p::before {
      //   content: "";
      //   position: absolute;
      //   top: 10px;
      //   left: 10px;
      //   width: 10px;
      //   height: 8px;
      //   border-radius: 50%;
      //   background-color: #fff;
      //   opacity: 0.45;
      // }
      // p:hover {
      //   border-radius: 50%;
      // }
      i {
        position: absolute;
        font-weight: 600;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 55px;
        right: 0.4rem;
        font-size: 20px;
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        border-radius: 50% 50% 49% 51% / 66% 61% 39% 34%;
      }
      // i:hover {
      //   border-radius: 50%;
      // }
    }
  }
  .centent {
    width: 100%;
    margin-bottom: 2rem;
    min-height: 10rem;
    .searchBox {
      margin-top: 1.5rem;
      height: 1.2rem;
      .search {
        margin: 0 auto;
        width: 98%;
        border-radius: 5px;
        height: 1rem;
        border-radius: 5px;
        position: relative;
        // background: #e0e0e0;
        background-color: transparent;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        .tip {
          text-align: center;
          font-size: 16px;
          line-height: 1rem;
          color: #c4c4c4;
          span {
            margin-left: 0.2rem;
          }
        }
      }
    }
    .goods-card {
      height: 1.5rem;
      padding: 0.2rem;
      margin: 8px;
      border-radius: 8px;
      font-size: 20px;
      position: relative;
      background-color: transparent;
      box-shadow: inset 6px 15px 15px rgba(0, 0, 0, 0.1),
        inset -12px -15px 10px rgba(255, 255, 255, 1),
        15px 20px 15px rgba(0, 0, 0, 0.05), 15px 15px 20px rgba(0, 0, 0, 0.025);
      .van-card__thumb {
        height: 1.2rem;
        width: 1.2rem;
        margin: 0 0.2rem;
      }
      .van-card__desc {
        color: #ccc;
        margin-top: 0.2rem;
      }
      .van-card__price-integer {
        font-size: 12px;
        color: #ccc;
      }
      .van-card__bottom {
        position: absolute;
        right: 0.2rem;
      }
      .van-card__price-currency {
        display: none;
      }
    }
    .delete-button {
      height: 100%;
      border: none;
      font-weight: 600;
      letter-spacing: 4px;
    }
    .delete-button:nth-child(1) {
      background-color: #3786ed;
    }
    .delete-button:nth-child(2) {
      background-color: #f29c47;
    }
    .delete-button:nth-child(2) {
      background-color: #f75855;
    }
  }
}
</style>