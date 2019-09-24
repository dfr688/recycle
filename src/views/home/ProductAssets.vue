<template>
  <div class="productAssets">
      <HeaderTop title="产品估价"/>
      <div class="progress" v-if="this.problemList.length !==0">
          <van-progress :percentage="percent" :show-pivot="false"/>
          <div class="question_number">{{ current_number }}/{{ sum_number }}</div>
      </div>
      <div class="prompt">
          <p>{{ productName }}</p>
          <span>选择结果和实际情况相符，将以最快速度收款</span>
      </div>
      <div class="questions">
        <Swiper>
            <transition-group name="fade">
                <div class="item" v-for="(problem,index) in problemList" :key="index"  v-if="problem.isShow">
                    <p>{{ index + 1 }}. {{ problem.name }}</p>
                    <van-radio-group v-model="radio[index]">
                        <van-radio :name="option.name" v-for="(option,arrIndex) in problem.operations" :key="arrIndex">{{ option.name }}</van-radio>
                    </van-radio-group>
                </div>
            </transition-group>
        </Swiper>    
      </div>
      <transition name="fade">
        <div class="assets_btn" @click="goPlaceOrder" v-if="isEnd">马上估价</div>
      </transition>
  </div>
</template>

<script>
import HeaderTop from '../common/HeaderTop'
import Swiper from '../common/Swiper'
export default {
 name: "",
  data () {
    return {
        current_number: 0,
        sum_number: "",
        radio: [],
        radioList:[],
        amount:[],
        modelId: "",
        productName: "",
        problemList: [],
        answerList: [],
        isEnd: false,
        basePrice: "",
        amountAll: 0
    }
  },
  components: {
      HeaderTop,
      Swiper
  },
  watch: {
      radio(newV,oldV){
        if(newV.length === this.sum_number){
            this.radioList = newV;
            this.amount = [];//选择的答案动态变化时候amount值也动态变化
            this.amountAll = 0;
            for(var j=0;j<newV.length;j++){
                let arr = this.answerList[j];
                for(var k=0;k<arr.length;k++){
                    if(newV[j] === arr[k].name){
                        this.amount.push(arr[k].amount);
                    }
                }
            }
        };
        for(var i=0;i<newV.length;i++){
            if(i>=this.problemList.length-1) {
                this.current_number = this.sum_number;
                this.isEnd = true; //当题目全部答完，显示马上估价的按钮
                return;
            };
            this.current_number = i+1;
            this.problemList[i+1].isShow = true; //答完一题显示下一题
        }
      }
  },
  computed: {
    //进度条值
    percent: function() {
        return (this.current_number/this.sum_number)*100;
    },
    // 估价值
    assessMoney() {
        for(var m=0;m<this.amount.length;m++){
            let num = parseInt(this.amount[m]);
            this.amountAll = this.amountAll + num;
        }
        return this.basePrice - this.amountAll;
    }
  },
  methods: {
    //马上估价
    goPlaceOrder() {
        this.$router.push({name: "placeorder",query:{nameV:this.productName,price:this.assessMoney,infoList:this.radioList,id:this.modelId}});
    }
  },
  created () {
      this.modelId = this.$route.query.modelId;
      this.baseJs.httpReq("/phone/model",{},this.modelId,"label","get","")
      .then(res => {
        //   console.log(res);
          if(res.code === 20000){
              let labelList = res.data.labelList;
              this.sum_number = labelList.length;
              this.productName = res.data.modelInfo.name;
              this.basePrice = res.data.modelInfo.basePrice;
              for(var i=0;i<labelList.length;i++){
                labelList[i].isShow = false;
                this.answerList.push(labelList[i].operations);//把答案数组直接拎出来
              }
              labelList[0].isShow = true;
              this.problemList = labelList;
          }
      })
      .catch(err => {
          console.log(err);
      });
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.productAssets{
    height: 100%;
    .progress{
        margin-top: .4rem;
        position: relative;
        .van-progress{
            height: .2rem;
            background: #f7f7f7;
            border-radius: 0;
        }
        .question_number{
            position: absolute;
            top: -.06rem;
            right: .3rem;
            font-size: $font-size-small;
            color: #999;
        }
    }
    .prompt{
        width: 6.7rem;
        margin: 0 auto;
        margin-top: .4rem;
        background: $background-image;
        border-radius: .1rem;
        font-size: $font-size-small;
        padding: .3rem 0 .3rem .4rem;
        color: #f1f1f1;
        p{
            color: #fff;
            font-size: .4rem;
            margin-bottom: .1rem;
        }
    }
    .questions{
        height: 70%;
        padding-bottom: 1rem;
        margin: 0 .4rem;
        .item{
            font-size: $font-size-middle;
            margin: .4rem 0;
            p{
                font-size: $font-size-large;
                margin-bottom: .3rem;
            }
            .van-radio{
                margin-bottom: .2rem;
                
            }
        }
    }
    .assets_btn{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: .4rem;
        color: #fff;
        background-image: $background-image;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
}
</style>