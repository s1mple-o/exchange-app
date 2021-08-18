<template>
  <view class="page-wrap">
    <scroll-list ref="list" :option="option" @load="load" @refresh="refresh">
      <view class="list-item" v-for="(item, index) in list" :key="index">
      </view>
    </scroll-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      option: {
		  page:1,
        size: 5,
        auto: true,
		refresherThreshold:30,
		safeArea:false
      },
      list: [],
    };
  },
  onLoad() {},
  methods: {
    // 加载数据
    load(paging) {
		console.log('load')
      setTimeout(() => {
        let list = [];
        for (var i = 0; i < paging.size; i++) {
          list.push(i);
        }
        this.list = [...this.list, ...list];
        this.$refs.list.loadSuccess({ list: this.list, total: 50 });
        // this.$refs.list.loadFail({ list: this.list, total: 10 })
      },600);
    },
    // 刷新刷剧
    refresh(paging) {
		console.log('refrsh')
      setTimeout(() => {
        let list = [];
        for (var i = 0; i < paging.size; i++) {
          list.push(i);
        }
        this.list= list;
        this.$refs.list.refreshSuccess({ list: this.list, total: 50 });
        // this.$refs.list.refreshFail({ list: this.list, total: 50 })
      },600);
    }
  }
};
</script>
<style scoped>
	.page-wrap{
		padding-top: 30px;
		background-color: #f1f1f1;
	}
	.coin-title{
		/* height: 15rpx; */
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 10%;
		background-color: #fff;
	}
	.coin-title-type{
		width: 60%;
		
	}
	.coin-title-price{
		width: 40%;
		
	}
	.list-item{
		width: 92%;
		margin: 30rpx auto ;
		height: 10.5vh;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 10%;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 5px rgb(0 0 0 / 10%);
	}
	/* .list-item:nth-child(2n){
		
	} */
	.coin-name{
		width: 60%;
		
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.coin-price{
		width: 40%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.coin-name image{
		width: 60rpx;
		height: 60rpx;
		margin-right: 30rpx;
	}
</style>