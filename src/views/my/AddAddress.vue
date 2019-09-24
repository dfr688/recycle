<template>
  <div class="addAddress">
      <Swiper>
        <HeaderTop title="添加地址"/>
        <van-address-edit
            :area-list="areaList"
            @save="onSave"
        />
      </Swiper>
  </div>
</template>

<script>
import areaList from '../../assets/js/area.js'
import Swiper from '../common/Swiper'
import HeaderTop from '../common/HeaderTop'
export default {
 name: "",
  data () {
    return {
        areaList,
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
    onSave(content) {
      let province = content.province;
      let city = content.city;
      let district = content.county;
      let receiver = content.name;
      let receiptPhone = content.tel;
      let address = content.addressDetail;
      let token = localStorage.getItem("token");
      let data = {
        province: province,
        city: city,
        district: district,
        receiver: receiver,
        receiptPhone: receiptPhone,
        address: address
      }
      this.baseJs.ajaxReq("/phone/user/address",data,"post",token)
      .then(res => {
        // console.log(res);
        if(res.code === 20000){
          this.$toast.success({
              message: res.msg,
              duration: 1000
          });
          this.$router.push("/address");
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
.addAddress{
    height: 100%;
    .van-address-edit{
        margin-top: .4rem;
        position: relative;
    }
}
</style>