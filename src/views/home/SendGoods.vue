<template>
  <div class="sendGoods">
      <Swiper>
        <HeaderTop title="确认发货"/>
        <div class="send_info">
            <p>寄件信息</p>
            <ul>
                <li @click="chooseCompany">
                    <input type="text" placeholder="请选择物流公司" readonly onfocus="this.blur()" v-model="company"/><i></i>
                </li>
                <li>
                    <input type="text" placeholder="填写快递单号" v-model="expressOrder"/>
                </li>
            </ul>
        </div>
        <div class="instruction">
            <span>说明：</span>
            <p>1.收到的手机将按照用户描述进行质检，如不符合回收标准，平台将退还手机，并承担相关快递费用。</p>
            <p>2.请确保机器来源合法，平台拒收脏机。</p>
        </div>
        <Btn text="确认发货" @goSure="goSure"/>
      </Swiper>  
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        :lazy-render="false"
        @select="onSelect"
        @cancel="onCancel"
        />  
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
        company: "",
        expressOrder: "",
        orderId: "",
        show: false,
        actions: [
        { name: '顺丰快递' },
        { name: '申通快递' },
        { name: '中通快递'},
        { name: '韵达快递'}
      ]
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
    //   选择物流公司
    chooseCompany() {
        this.show = true;
    },
    onSelect(item) {
        this.show = false;
        this.company = item.name;
    },
    onCancel() {
        this.show = false;
    },
    // 确认发货
    goSure() {
        if(this.company === ""){
            this.$toast.fail({
                message: "请选择物流公司",
                duration: 1000
            });
        }else if(this.expressOrder === ""){
            this.$toast.fail({
                message: "请填写快递单号",
                duration: 1000
            });
        }else{
            let token = localStorage.getItem("token");
            this.baseJs.httpReq("/phone/order",{},this.orderId,"express","post",token)
            .then(res => {
                // console.log(res);
                if(res.code === 20000){
                    this.$toast.success({
                        message: res.msg,
                        duration: 1000
                    });
                    this.$router.push("order");
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
  },
  created () {
      this.orderId = this.$route.query.orderId;
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.sendGoods{
    height: 100%;
    .send_info{
        width: 6.7rem;
        margin: 0 auto;
        margin-top: .4rem;
        font-size: $font-size-middle;
        background: #fff;
        border-radius: .1rem;
        box-shadow: $box-shadow2;
        padding: .3rem;
        p{
            font-size: .36rem;
            margin-bottom: .6rem;
        }
        ul{
            li{
                border-bottom: 1px solid #f1f1f1;
                padding-bottom: .3rem;
                margin-bottom: .3rem;
                input{
                    font-size: $font-size-middle;
                }
                &:first-child{
                    @include flex;
                }
                &:last-child{
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                i{
                    display: inline-block;
                    width: .32rem;
                    height: .32rem;
                    @include background_img("~@/assets/images/my/arrow.png");
                    margin-bottom: -.06rem;
                }
            }
        }
    }
    .instruction{
        color: #666;
        font-size: $font-size-small;
        margin: 0 .4rem;
        margin-top: .4rem;
        margin-bottom: .8rem;
        span{
            font-size: .36rem;
            color: #333;
            margin-bottom: .2rem;
            display: inline-block;
        }
        p{
            line-height: .5rem;
        }
    }
}
</style>