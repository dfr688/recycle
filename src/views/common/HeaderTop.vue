<template>
  <div class="headerTop">
      {{ title }}
      <span @click="goBack"></span>
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
      "title"
  ],
  components: {},
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
.headerTop{
    text-align: center;
    font-size: .4rem;
    padding-top: .8rem;
    position: relative;
    span{
        position: absolute;
        left: .4rem;
        top: .9rem;
        width: .4rem;
        height: .4rem;
        @include background_img("~@/assets/images/home/back.png");
    }
}
</style>