<template>
  <div class="btn" @click="handle">
      <van-button type="primary">{{ text }}</van-button>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
    }
  },
  props: [
      "text"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
      handle() {
        //免费估计
        this.$emit("goAssets");
        // 立即下单
        this.$emit("placeOrder");
        // 提交
        this.$emit("goCard");
        // 意见反馈提交
          this.$emit("suggest");
          this.$emit("goNextStep");
          this.$emit("goStep");
        //注册
        this.$emit("goRegister");
        // 登录
        this.$emit("goLogin");
        // 退出登录
        this.$emit("signOut");
        // 确认发货
        this.$emit("goSure");
        // 新增地址
        this.$emit("goAddAddress");
      }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
    .btn{
        width: 6.7rem;
        height: 1rem;
        margin: 0 auto;
        margin-bottom: .4rem;
        font-size: .4rem;
        .van-button--normal{
            font-size: .4rem;
        }
        .van-button{
            width: 6.7rem;
            height: 1rem;
            line-height: 1rem;
            border-radius: .5rem;
        }
        .van-button--primary{
            border: none;
            background-image: $background-image;
        }
    }
</style>