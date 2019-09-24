<template>
  <div class="home">
      <Swiper>
        <div class="bg_img">
          <div class="search">
            <i></i>
            <input type="text" placeholder="搜索您想要回收的品牌、机型型号" readonly onfocus="this.blur()" @click="goSearch"/>
          </div>
          <div class="recycle_main" @click="goProductAssets">
            <div class="left">
              <div class="img">
                <img src="../../assets/images/home/phone.jpg" alt=""/>
              </div>
              <div class="intro">
                <p>iPhone X</p>
                <div>最高回收价：<span>¥ 5820</span></div>
              </div>
            </div>
            <div class="right">
              <div>
                热门回收
              </div>
            </div>
          </div>
          <div class="advantage">
            <ul>
              <li>
                <i></i><span>便捷回收</span>
              </li>
              <li>
                <i></i><span>专业质检</span>
              </li>
              <li>
                <i></i><span>保护隐私</span>
              </li>
              <li>
                <i></i><span>急速放款</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="list">
          <ul>
            <li>
              <span class="icon_1"></span>
              <p>旧机评估</p>
              <i></i>
            </li>
            <li>
              <span class="icon_2"></span>
              <p>在线下单</p>
              <i></i>
            </li>
            <li>
              <span class="icon_3"></span>
              <p>质检入库</p>
              <i></i>
            </li>
            <li>
              <span class="icon_4"></span>
              <p>极速收款</p>
            </li>
          </ul>
        </div>
        <Btn text="免费估价" @goAssets="goAssets"/>
      </Swiper>
      <Tabbar isSelected=true></Tabbar>
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
import Tabbar from '../common/Tabbar'
import Btn from '../common/Btn'
export default {
 name: "",
  data () {
    return {
    }
  },
  components: {
    Swiper,
    Tabbar,
    Btn
  },
  computed: {},
  watch: {},
  methods: {
    goAssets() {
      this.$router.push("/assets");
    },
    // 搜索
    goSearch() {
      this.$router.push("/search");
    },
    goProductAssets() {
      this.$router.push({name:"productassets",query:{modelId:2}});
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/home.scss';
</style>