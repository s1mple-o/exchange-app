
<template>
    <view class="uni-tabbar">
        <view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
            <!-- <view class="icon" :class="[item.fontIcon , item.pagePath == pagePath?'uni-active':'']"></view> -->
            <!-- 上面使用的是字体图标，解决切换页面的时候图标会闪的效果，毕竟每切换一个页面都会闪一下不太好看，可以切换使用下面的图片方式 -->
            <view  class="uni-tabbar__bd">
                <view class="uni-tabbar__icon">
					<!-- <image :src="item.iconPath" mode=""></image> -->
                   <image v-if="item.pagePath == pagePath" class="uni-w-42 uni-h-42"  :src="item.selectedIconPath"></image>
                    <image v-else class="uni-w-42 uni-h-42" :src="item.iconPath"></image>
                </view>
            </view>
            <view class="uni-tabbar__label" >
                {{item.text}}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            pagePath: null
        },
        data() {
            return {
                page: 'contact',
                showPage: false,
				userInfo:{},
				showBar:false,
                containerHeight: 400,
                tabbar: [
                    {
                        "pagePath": "/pages/index/index",
                        "iconPath": "../../static/trend.png",
                        "selectedIconPath": "../../static/trendactive.png",
                        "text": "行情"
                    },{
                        "pagePath": "/pages/shop/detail",
                        "iconPath": "../../static/dh.png",
                        "selectedIconPath": "../../static/dhactive.png",
                        "text": "兑换"
                    }, 
                    {
                        "pagePath": "/pages/user/user",
                        "iconPath": "../../static/my.png",
                        "selectedIconPath": "../../static/myactive.png",
                        "text": "我的"
                    }
                ]
            };
        },
        mounted() {
			var _self = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_self.userInfo = JSON.parse(res.data);
			
					// console.log(_self.userInfo.access_token)
					// console.log(JSON.parse(res.data))
					if(_self.userInfo.access_token){
						_self.tabbar.splice(1,0,
						    {
						        "pagePath": "/pages/shop/kt",
						        "iconPath": "../../static/kt.png",
						        "selectedIconPath": "../../static/ktactive.png",
						        "text": "空投",
						        "fontIcon": "icon-guanli"
						    }
						)
					}else{
						// _self.tabbar.splice(1,0)
					}
					
				},
				fail: (res) => {
					// console.log("请求错误")
				}
			})
            // true为判断条件，根据实际的需求替换即可
            
        },
        methods: {
            changeTab(item) {
                this.page = item.pagePath;　　　　　　　　　　// 这里使用reLaunch关闭所有的页面，打开新的栏目页面
                uni.reLaunch({
                    url: this.page
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
	
    [nvue] uni-scroll-view, [nvue] uni-swiper-item, [nvue] uni-view {
        flex-direction: unset;
    }
    [nvue-dir-column] uni-swiper-item, [nvue-dir-column] uni-view {
        flex-direction: unset;
    }
	uni-image{
		width: 45upx !important;
		height: 45upx !important;
	}
    .uni-tabbar {
        position: fixed;
        bottom: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 130upx;
        padding: 16upx 0 36upx;
        box-sizing: border-box;
        border-top: solid 1upx #ccc;
        background-color: #fff;
        box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
        .uni-tabbar__item {
            display: block;
            line-height: 24upx;
            font-size: 20upx;
            text-align: center;
        }
        .uni-tabbar__icon {
            height: 42upx;
            line-height: 42upx;
            text-align: center;
        }
        .icon {
            display: inline-block;
        }
        .uni-tabbar__label {
            line-height: 42upx;
            font-size: 20upx;
            color: #999;
            &.active {
                color: #1ca6ec;
            }
        }
    }
	.icon-img{
		flex: 1;
	}
</style>