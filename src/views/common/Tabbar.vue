<template>
  <div class="tabbar">
      <ul>
          <li class="home" @click="goHome">
              <span :class={selected:isSelected}></span>
              <p :class={selected:isSelected}>首页</p>
          </li>
          <li class="my" @click="goMy">
              <span :class={selected:!isSelected}></span>
              <p :class={selected:!isSelected}>我的</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
 name: "Tabbar",
  data () {
    return {
    }
  },
  props: [
      "isSelected"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
    //去首页
    goHome() {
        this.$router.push("/home");
    },
    // 去我的页面
    goMy() {
        this.$router.push("/my");
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
    .tabbar{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #fff;
        ul{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                color: #999;
                font-size: .36rem;
                padding: .12rem 0;
                span{
                    display: inline-block;
                    width: .36rem;
                    height: .44rem;
                }
                &.home span{
                    background: url(../../assets/images/tabbar/home.png) no-repeat left top;
                    background-size: 100%;
                    &.selected{
                        background: url(../../assets/images/tabbar/home_selected.png) no-repeat left top;
                        background-size: 100%;
                    }
                }
                &.my span{
                    background: url(../../assets/images/tabbar/my.png) no-repeat left top;
                    background-size: 100%;
                    &.selected{
                        background: url(../../assets/images/tabbar/my_selected.png) no-repeat left top;
                        background-size: 100%;
                    }
                }
                .selected{
                    color: #097962;
                }
            }
        }
    }
</style>