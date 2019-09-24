<template>
  <div class="com">
          <div class="contain">
              <div class="back" @click="goBack"></div>
              <p class="title">{{ tit }}</p>
              <slot></slot>
          </div>
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
      "tit"
  ],
  components: {

  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.go(-1);
      }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
    .com{
        height: 100%;
        .contain{
            width: 100%;
            @include background_img("~@/assets/images/login/background.png",right,top,66%);
        }
        .back{
            display: inline-block;
            width: .4rem;
            height: .4rem;
            @include background_img("~@/assets/images/home/back.png");
            margin-top: .9rem;
            margin-left: .3rem;
        }
        .title{
            font-size: .52rem;
            margin-left: .5rem;
            margin-top: .3rem;
        }
    }
</style>