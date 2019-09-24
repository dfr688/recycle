<template>
  <div class="Vcode">
		<button class="getmodBtn" @click="getCode()" :disabled="!login.canGet">
			 <span v-show="!login.canGet">{{login.waitTime+"s后重新获取"}}</span>
			 <span v-show="login.canGet">获取验证码</span>
		</button>
  </div>
</template>

<script>
	function timeCountdown(obj) { //obj包括timer、waitTime 、canGet 
    const TIME_COUNT = 60; //默认倒计时秒数
    if (!obj.timer) {
        obj.waitTime = TIME_COUNT;
        obj.canGet = false;
        obj.timer = setInterval(() => {
            if (obj.waitTime>0 && obj.waitTime<=TIME_COUNT) {
                obj.waitTime--;
            }else{
                obj.canGet = true;
                clearInterval(obj.timer); //清空定时器
                obj.timer = null;
            }
        }, 1000)
    }
    return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
    }
}
	
	
export default {
  name: '',
  data (){
  return{            
    tempLogin:{ //定义一个临时对象
      canGet: true,
      timer: null,
      waitTime: 60
      },
    }
},
props: [
	"phone"
],
computed: {
	login(){ //最终对象
  if(!this.tempLogin.canGet){
    return timeCountdown(this.tempLogin);
  }else{
    return this.tempLogin;
  }
}
},
methods:{
    getCode(){
    		//倒计时开始
    		timeCountdown(this.login);  //参数为最终对象
    }
},
created() {
    this.getCode();
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.Vcode .getmodBtn{
		width: 100%;
		height: .6rem;
		line-height: .6rem;
		text-align: center;
		color: #999;
		font-size: .32rem;
	}
</style>
