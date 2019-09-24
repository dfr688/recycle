<template>
  <div class="address">
      <Swiper>
        <HeaderTop title="地址"/>
        <div class="addressDetail">
            <van-address-list
            v-model="chosenAddressId"
            :list="list"
            />
        </div>
        <Btn text="新增地址" @goAddAddress="goAddAddress" v-if="hasAddress"/>
      </Swiper>
  </div>
</template>

<script>
import HeaderTop from '../common/HeaderTop'
import Btn from '../common/Btn'
import Swiper from '../common/Swiper'
export default {
 name: "",
  data () {
    return {
        chosenAddressId: '1',
         list: [
            {
            id: '',
            name: '',
            tel: '',
            address: ''
            }
        ],
        hasAddress: false
    }
  },
  components: {
      HeaderTop,
      Btn,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
     goAddAddress() {
         this.$router.push("/addaddress");
     }
  },
  created () {
      let token = localStorage.getItem("token");
      this.baseJs.ajaxReq("/phone/user/address",{},"get",token)
      .then(res => {
        //   console.log(res);
          if(res.code === 20000){
              let address = res.data;
              let addressValue = Object.keys(address);
              if(addressValue.length === 0){
                  this.hasAddress = true;
              }else{
                  this.hasAddress = false;
              }
              let detail = res.data;
              this.list = [
                  {
                    id: '1',
                    name: detail.receiver,
                    tel: detail.receiptPhone,
                    address: detail.province + detail.city + detail.district + detail.address
                  }
              ]
          }
      })
      .catch(err => {
          console.log(err);
      })
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
    .address{
        height: 100%;
        .addressDetail{
            margin: 0 .3rem;
            margin-top: .6rem;
            .van-address-item__value{
                padding-right: 0;
            }
            .van-address-item__name{
                font-size: $font-size-middle;
            }
            .van-address-item__address{
                font-size: $font-size-small;
            }
            .van-address-item__edit{
                display: none;
            }
            .van-address-list__add{
                display: none;
            }
        }
    }
</style>