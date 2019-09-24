<template>
  <div class="suggest">
      <Swiper>
          <HeaderTop title="意见反馈"/>
          <div class="word">
               <textarea name="" id="" placeholder="请输入您的意见和建议，工作人员将在第一时间评估处理，感谢您的反馈。" v-model="write"></textarea>
          </div>
          <Btn text="提交" @suggest="suggest"/>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
import HeaderTop from '../common/HeaderTop'
import Btn from '../common/Btn'
export default {
 name: "",
  data () {
    return {
        write: ""
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Btn
  },
  computed: {},
  watch: {},
  methods: {
    suggest() {
        if(this.write === ""){
            this.$toast.fail({
                message: "请填写您的意见或反馈",
                duration: 1000
		    });
        }else{
            this.$toast.success({
                message: "感谢您的反馈",
                duration: 1000
            });
            this.$router.push("/my");
        }
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
    .suggest{
        height: 100%;
        .word{
            width: 6.7rem;
            height: 4rem;
            margin: 0 auto;
            margin-top: .6rem;
            margin-bottom: .8rem;
            border-radius: .1rem;
            box-shadow: $box-shadow2;
            padding: .4rem;
            font-size: .3rem;
            textarea{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>