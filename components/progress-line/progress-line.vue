<template>
	<view>
		<view class="box" id="preBox" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<progress :percent="percentData" :stroke-width="strokeWidth" border-radius="60" :activeColor="activeColor" :backgroundColor="backgroundColor" class="ovh"/>
			<view class="cicle-dot" :style="{'left':this.dotX + 'px','background':activeColor}"  v-if="isDotX"></view>
		</view>	
	</view>
</template>

<script>
export default {
	data() {
		return {
			begX:0,
			startX:0,
			endX:750,
			percentData:this.percent,
			
			endShu:0,
			dotX:0,
			endCount:this.levlEnd,
			nowCount:this.levlNow,
		};
	},
	
	props:{
		// 已选择的进度条的颜色
		activeColor:{
			type:String,
			default(){
				return '#09BB07'
			}
		},
		// 未选择进度条颜色
		backgroundColor:{
			type:String,
			default(){
				return '#EBEBEB'
			}
		},
		// 进度条线的宽度，单位px
		strokeWidth:{
			type:Number,
			default(){
				return 6
			},
		},
		
		// 是否显示圆球
		isDotX:{
			type:Boolean,
			default(){
				return true
			}
		},
		// 百分比0~100
		percent:{
			type:Number,
			default(){
				return 100
			}
		},
		// 现在杠杆倍数
		levlNow:{
			type:Number,
			default(){
				return 0
			}
		},
		// 杠杆总倍数
		levlEnd:{
			type:Number,
			default(){
				
				return 1000
			}
		}
		
	},
	
	watch:{
		percentData(newVal,oldVal){
			// console.log(newVal)
		}
	},
	methods:{
		touchstart(e){
			// console.log(e)
		},
		touchmove(e){
			if(e.changedTouches[0].clientX - this.begX >=this.endX){
				this.endShu = this.endX
			}else if(e.changedTouches[0].clientX<=this.begX){
				this.endShu = this.startX
			}else{
				this.endShu = e.changedTouches[0].clientX - this.begX
			}
			this.dotX = this.endShu
			this.percentData = (this.endShu/this.endX*100).toFixed(2)
			this.percentData = Number(this.percentData)
			this.gangCount()
		},
		touchend(e){
			
		},
		
		// 杠杆计算
		gangCount(){
			this.nowCount = (this.percentData/100 * this.endCount).toFixed(0)
			this.nowCount = Number(this.nowCount)
			this.$emit('moveEvent',Number(this.percentData.toFixed(0)),this.nowCount)
		}
	},
	
	onLoad() {
		
	},

	created() {
		
	},
	mounted() {
		const query = uni.createSelectorQuery()
		query.select('#preBox').boundingClientRect(data=>{
			this.begX = data.left
			this.startX = 0
			this.endX = data.right - data.left
		}).exec()
		if(this.nowCount && this.nowCount>0 && this.endCount && this.endCount>0 ){
			this.percentData = this.nowCount/this.endCount*100
		}
		this.dotX = this.endX*this.percentData/100
		var _self =this;
		uni.getStorage({
			key:'userInfo',
			success:function(res){
				let userInfo = JSON.parse(res.data);
				uni.request({
					url:'https://www.agnitoken.com/api/app.php?s=App.Agni.PointInfo',
					method:'POST',
					dataType:'json',
					data:{
						user_id:userInfo.user_id,
						token:userInfo.token
					},
					success:function(res){
						if(res.data.ret==200){
							_self.endCount = parseInt(res.data.data.pmctt);
							// _self.$forceUpdate();
						}
						else{
							uni.showToast({ title: '未登录',icon:'none' });
						}
					}
				})
			},fail: (res) => {
				// console.log("请求错误")
			}
		})
	}
};
</script>

<style lang="scss" scoped>
	.box{
		width: 100%;
		position: relative;
		.cicle-dot{
			position: absolute;
			left: 0;
			top: -15rpx;
			width: 36rpx;
			height: 36rpx;
			border-radius: 50%;
			background: #0A52C1;
			box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(10, 82, 193, 0.5);
			border: 4rpx solid #F6FAFF;
		}
	}
	.ovh{
		overflow: hidden;
		border-radius: 10rpx;
	}
</style>
