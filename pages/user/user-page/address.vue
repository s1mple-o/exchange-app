<template>
	<view class="container">
		<view class="address-list">
			<view class="a-address" v-for="(item,index) in addressList" :key="index">
				<view class="left-text" :class="item.isDefault? 'active':''" @tap="selectTap(item.id)">
					<view class="name-tel">
						{{item.linkMan}}
					</view>
					<view class="address-box">
						{{item.address}}
					</view>
				</view>
				<view class="right-icon">
					<view class="right-edit" @tap="editAddess(item.id)"></view>
					<view class="right-del" @tap="delAddess(item.id)"></view>
				</view>
			</view>
		</view>
		<view class="bottom-box">
			<view class="add-btn" @tap="addAddess">新增收货地址</view>
		</view>

		<!-- 编辑地址弹框 -->
		<uni-popup ref="edit" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="editClose"
				:value="currentAddress" :addressName="currentName" :currentId='currentId' @confirm="confirm" >
			</uni-popup-dialog>

		</uni-popup>
		<!-- 设为默认弹出框 -->
		<uni-popup ref="def" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" content='确认设为默认地址' :duration="2000" :before-close="true"
				@close="defClose" @confirm="defconfirm">
			</uni-popup-dialog>

		</uni-popup>

		<!-- 删除弹出框 -->
		<uni-popup ref="del" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" content='确认设为默认地址' :duration="2000" :before-close="true"
				@close="delClose" @confirm="delconfirm">
			</uni-popup-dialog>

		</uni-popup>

		<!-- 新增地址 -->
		<uni-popup ref="add" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="addClose"
				:currentId='newId' @confirm="addConfirm">
			</uni-popup-dialog>

		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultID: 0,
				delId: null,
				currentAddress: '',
				currentName: '',
				currentId: '',
				newId: '',
				addressSum: 4,
				addressList: [],
				userInfo: null
			}
		},
		onLoad() {
			var _self = this
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_self.userInfo = JSON.parse(res.data);
					// console.log('onload'+'----'+'addressData' + _self.userInfo.user_id)
					uni.getStorage({
						key: 'addressData' + _self.userInfo.user_id,
						success: function(res) {
							var addressData = JSON.parse(res.data)
							_self.defaultID = addressData.defaultID;
							_self.addressList = addressData.addressList

						}
					})

				}
			});

		},
		onShow() {
			var _self = this
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_self.userInfo = JSON.parse(res.data);
					// console.log('onshow'+'----'+'addressData' + _self.userInfo.user_id)
					uni.getStorage({
						key: 'addressData' + _self.userInfo.user_id,
						success: function(res) {
							var addressData = JSON.parse(res.data)
							_self.defaultID = addressData.defaultID;
							_self.addressList = addressData.addressList

						}
					})

				}
			});
		},
		onUnload() {
			var _self = this;
			// console.log('onunload'+'----'+'addressData' + _self.userInfo.user_id)
			uni.setStorage({
				key: 'addressData' + _self.userInfo.user_id,
				data: JSON.stringify({
					addressList: _self.addressList
				}),
				success: (res) => {
					// console.log(res)
				}
			})
		},
		methods: {
			findById(arr, id) {
				var cur = null;
				try {
					arr.forEach(function(item, index) {
						if (item.id == id) {
							cur = index;
							throw Error();
						}
					})
				} catch (e) {

				}
				return cur;
			},
			getId() { //获取随机数id
				let date = Date.now();
				let rund = Math.ceil(Math.random() * 1000)
				let id = date + '' + rund;
				return id;
			},
			selectTap(id) {
				this.defOpen(id)

			},
			editAddess(id) {
				this.currentAddress = this.addressList[this.findById(this.addressList, id)].address;
				this.currentName = this.addressList[this.findById(this.addressList, id)].linkMan;
				this.currentId = id;
				this.editOpen();
			},
			delAddess(id) {
				this.delOpen(id);
			},
			addAddess() {
				this.addOpen();
				this.newId = Number(this.getId());
			},

			// 设为默认方法
			defOpen(id) {
				this.$refs.def.open()
				this.$refs.def.id = id
			},
			defClose() {

				this.$refs.def.close()
			},
			defconfirm() {
				var _self = this;
				_self.defaultID = this.$refs.def.id;
				this.addressList.forEach(function(item, index) {
					// console.log(item)
					if (item.id == _self.defaultID) {
						uni.getStorage({
							key: 'userInfo',
							success: function(res) {
								_self.userInfo = JSON.parse(res.data);
								uni.request({
									url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.Wallet',
									method: 'POST',
									dataType: 'json',
									data: {
										user_id: _self.userInfo.user_id,
										token: _self.userInfo.token,
										wallet_address: _self.addressList[index].address
									},
									success: function(res) {
										if (res.data.ret == 200) {
											_self.addressList[index].isDefault = true;
										} else {
											uni.showToast({
												title: '地址错误',
												icon: 'none'
											});
										}
									}
								})
							},
							fail: (res) => {
								uni.navigateTo({
									url: '../login'
								})
							}
						})

						return true;
					}
					_self.addressList[index].isDefault = false;
				})
				this.$refs.def.close()
			},

			// 删除方法
			delOpen(id) {
				this.$refs.del.open()
				this.$refs.del.id = id
			},
			delClose() {

				this.$refs.del.close()
			},
			delconfirm() {
				var _self = this;
				_self.addressList.splice(_self.findById(_self.addressList, this.$refs.del.id), 1);
				uni.setStorage({
					key: 'addressData' + _self.userInfo.user_id,
					data: JSON.stringify({
						addressList: _self.addressList
					}),
					success: (res) => {
						console.log(res)
					}
				})
				this.$refs.del.close()
			},

			// 编辑方法
			editOpen() {
				this.$refs.edit.open()
			},
			editClose() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.edit.close()
			},
			confirm(value, addressName, id) {

				var _self = this;
				this.addressList[this.findById(this.addressList, id)].linkMan = addressName;
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.CanUse',
					method: 'POST',
					dataType: 'json',
					data: {
						wallet_address: value
					},
					success: function(res) {
						if (res.data.ret == 200) {
							_self.addressList[_self.findById(_self.addressList, id)].address = value;
							uni.setStorage({
								key: 'addressData' + _self.userInfo.user_id,
								data: JSON.stringify({
									addressList: _self.addressList
								}),
								success: (res) => {
									console.log(res)
								}
							})
						} else {
							uni.showToast({
								title: '地址错误',
								icon: 'none'
							});
						}
					}
				})
				this.$refs.edit.close()
			},

			// 添加地址方法

			addOpen() {
				this.$refs.add.open()
			},
			addClose() {

				this.$refs.add.close()
			},
			addConfirm(value, addressName, id) {
				var _self = this;
				let newAddress = {
					id: id,
					linkMan: addressName ? addressName : '钱包地址',
					address: value,
					isDefault: _self.addressList.length == 0 ? true : false
				}
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.CanUse',
					method: 'POST',
					dataType: 'json',
					data: {
						wallet_address: newAddress.address
					},
					success: function(res) {
						if (res.data.ret == 200) {
							
							if (_self.addressList.length == 0) {
								uni.request({
									url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.Wallet',
									method: 'POST',
									dataType: 'json',
									data: {
										user_id: _self.userInfo.user_id,
										token: _self.userInfo.token,
										wallet_address: newAddress.address
									},
									success: function(res) {
										if (res.data.ret == 200) {
											_self.addressList.push(newAddress);
											console.log(_self.addressList)
										} else {
											uni.showToast({
												title: '地址错误',
												icon: 'none'
											});
										}
									}
								})
							}else{
								_self.addressList.push(newAddress);
							}
							uni.setStorage({
								key: 'addressData' + _self.userInfo.user_id,
								data: JSON.stringify({
									addressList: _self.addressList
								}),
								success: (res) => {
									console.log(res)
								}
							})

						} else {
							uni.showToast({
								title: '地址错误',
								icon: 'none'
							});
						}
					}
				})
				this.$refs.add.close()
			}
		}
	}
</script>

<style scoped>
	.container {
		background-color: #F2f2f2;
	}

	.address-list {
		width: 100%;
		background-color: #fff;
		margin-top: 20upx;
		padding-bottom: 100upx;
	}

	.address-list .a-address {
		width: 720upx;
		margin-left: 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx 0;
		border-bottom: 1upx solid #eee;
	}

	.a-address .left-text {
		width: 610upx;
		box-sizing: border-box;
		padding-left: 58upx;
	}

	.a-address .left-text.active {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAACrUDmFAAAAAXNSR0IArs4c6QAABTFJREFUaAXtmW9MHEUUwN8b7oAColQId2ia2qb9YEwa0g/6ocT7ywXi1Q8CFdMEohaDaKNo1CYmEhP/pzFREmttLEbTpsG2SKVnODjQEGNSrYlJrY2mxkS55U/BPz0L3O2ObzCL273d7V054a7pfZmZ92bevt/M2zdvAeEa+v0RCKyNyQvdyHmQI56zlZW78Frhmwi4tygyHOOcb1CZbMxezdRBLreS39Msy/ClFg4Az1XYbGdtuQzGGxvzpJkLrymK8pSWAxF+5vkYwJOh+ZwN0T+DwfLY3xePcOAeHdxP+fY17ptDoV+FPCcBx2vdW0GBY8D5Oi2cCEs7s3kqwuFxVZ5z72DU62oBmY/p4RDw+7xidrcWLqdOkLe12aXzP+6lRPK4ejpqS3DfQX6hzxkKTakytc2JEJ3Y7q2UY3IvOV2jOr7UInxbwvP8pcPDF5Zkmk7Wh6hU675TjinfkM9JcJQtTxUVFHvN4ARnVgPS/fawosAXAPwWzaEsdgnuqwKw+W8aGJjV67TjrAxRut/yo7PT3ZRIdmmdXeojjNmLSusr+vv/WpKZdLIOcMrvr0rw+FHO4S4jn+nkRpHl3+MYHIwZ6fWyrArRSZ9vW0JJnDaDo1t7yFFWUZ8qnIDNGsCo39Uh80SEKpNK/SmIMZ3cZ85b1wext/eSkd5MtuohyltbC6XfftnHFd5i6iTCpw77mgYMhebN5pjJVxVwxudbNweyKLm2mjlI8uPOjZt34P79cYs5pqpVC9FowOueh8TXVnCI2OuscTVdLZygXgQUZdBEnWcj7+paEeBxr7sTZCVMyaTCdOsRDznKypuxqythOicFBVLmqpYhMUAPc9KOnWeI7ZXhyGAKa9OewoPBouiliwfo1JqtFtN70+OocT1EcIrVvFR0OO5znQYO1drJBHqwsOTGzrK+vt+18uX0pdra2xQ5fpyqki1XsHOAwvKRTMCJ5xCgO0Y7WqR/KKXlKFXp7Y6hkU/0unTHEz53QAY4RM9Za7WWNvYdRzjSQS23mpeOjlE4HDFaIEJW4byPvr8OR+vqzN8Vo8UameTzPEdxdvJKcMDwLefQyKOZhBNuIK+rK5Dic+KvUfUav/TdacbYbtrdw3qF2XiysbFEnp3uIbv3mc1R5Qhsr3M48rQ6zmS7eA+K4laane4lZ7ZbGafd7behrV3/1axfM+n3b5KVRB9VJbfrdUljhFerhkb3JMkzJFi8Fqj8WXBs2NRAAEet7IoNiCvxM5LP/aDZvGitt4FKrlOpwNE7/uL/CSd8vKySoXvQJo19/hGB7DADUOXk3Blk/D3k+IOCMEfZ8Q56b++njLxNnWPZIjxPcC9ZzsmA8jJAYU/8rXFiZqqHEsPODNg3NIEMn3WGR143VGZYmFS5ULjKlTWuFgrXgxl+1r/mEDtXCk48MOkEVSgKU4z6PfsovbepsuW09CAOyHY7hyLdy7GT7lpTQGFIQNI99jYljI50DWvnCzjOoL0qPPquVr4SfUtA1QEq596k/X9CHafTUqhTDoJdVBG9n866TM1NegeNDFO2e5IcfcNIZyWjNTL9n651teCEbykBiolURj3DkKWc1unUEsjYzqpw5EOxfrV+KYWo1rmoz/UC3XddWpm+T0bjkJf3gHNw+GO9bqXHaQMKByWve48C/GVDZxEXKCyaMvEVYmg/TWHKIaq16xgeeQUZPEYyqmD++9En1hRwdm+2wAnPruoEVaQpr3dzHHkTXQLrqWw7W1x4wwelJ05Mq/rr7fUdWP4O/AP2Ss0GlCgUhgAAAABJRU5ErkJggg==) no-repeat left center;
		background-size: 28upx auto;
	}

	.a-address .left-text .name-tel {
		margin-bottom: 20upx;
	}

	.a-address .left-text .address-box {
		font-size: 24upx;
		color: #888888;
		line-height: 36upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.a-address .right-icon {
		width: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.a-address .right-edit {
		width: 50upx;
		height: 50upx;
		padding: 25upx 0 25px 25upx;
		box-sizing: border-box;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABPhJREFUeAHtnE1oE0EUx80HQW39SCvYgBVBqhUU+l1FD1ZFPIgnQdDiRfGmh168eBDR4k1B8OLHSVTQg6gnUQ+CaNLWQGu8lSqtrZQKgk1jkzb1/zSzvKyTIO0mM7uZgc28eftm571fZnaTzGR8y4qkRCJRPTMzswsmG3HULiwsBIqYO3bK5/PNoa1oR0fHG8cuWuBCIyMjyycnJy+hzW6YIPPdr6uru1BfX5+iKj57PTjm6+vrOwz9WchdyIN2mzKWL3R2dl4pVXujo6MrJiYmniHO/bwNQLqFN+cM6fIA9ff3b85ms7dRYS+voFCehqNr4HDWaR8KwaF20F4mHA6vamhomLV6RzQabZufn3+B82GnnVnC9RaWULdg1WJwcpWCYBGC/BcQ4GxB4RWO1TkDLTK8k71O957/gEOxv25sbPxJQhDDyR+Lxe5ALgRnEE4OwG7Y7/enqVIZ0hzaiLW3t791si2CMz4+/hzX3FfkumPBYPCUOB/EDfkgCnuEQuSAMoSjB06+FDo356LnIIaicAKBwN6WlpYvIlbqQSdFQeQAk4C+CzfI70Ln5lzAQUx5TytbTGMEp62tbZjrg4DRiopctwxD6RQMKx4OQfEDDn0ItBKAzba2tsYshYuFpfQcEbYfwnJRyOUpQMrvUjYDNxSdgENxEiDPJafgEBjPAXISjucAOQ3HU4BKAcczgEoFxxOASgnH9YBKDcfVgMoBx7WAygWHAFk/mFHBDYng/M9PFrIvnouJz1UfFMsNh4C6BpAKOK4BpAqOKwCphKM9INVwtAakAxxtAekCR0tAOsHRDpBucLQCpCMcbQDpCocAKf8upgOcoaGh9VgHdRrzgTSRehcTpqMEh5LSrxq0eKmcXzz/hpz/Go/H1wJOP7SXsfTnIvI41irUCSulgKampsihfcIZSS6dDpbYLVqVyWRosdgGcQH0oFrMCx4VZaWA4Mxx4YgkLzmcXJu19rbRk9YJnVJAcKLQDG654AgOBXOlgNCD7kk80wYO+aYUUE1NzSU8OW7Aj18Y97QO8QV+CdxtX4JCjqpKSh/ztEgSgZ9DT+oZGBgIAcyMKhCF2lUKSDiF3kNL7ujQLikdYtrRkDhkAEmgcJUBxGlIZANIAoWrDCBOQyIbQBIoXGUAcRoS2QCSQOEqA4jTkMgGkAQKVxlAnIZENoAkULjKAOI0JLIBJIHCVQYQpyGRDSAJFK4ygDgNiWwASaBwlQHEaUhkA0gChav8uekWS4cZhoqChngDVvA5gTMhGN9sBqsHBwd12p7C5p6zRcDI+1Nz7uo/RCv0r+e8/4nTiVQq1S0MKiDfbo8RTCaEjobYU1FgeW9uPw+m8p6IXSe2IiraAigvgcl7ofCHQqEHUNAMJ0/VKDzBdjmNXOklGZtHhdBTruOw33M/5S2gampq+orAr0mC34YtYj6gJ53nC4okdq5T0eiYnp6mjZUO2Z3HWoGbXPdngyXaiiuZTL5DhX/GozBGL0tCzoiyi3PqOStl/iPG4UgkskNsz0U21g5UWIq2KZ1O09hbL6vsdR3g0Jt/AMPrDY/VGn/Nzc2fcT/aCcOP3KBC5Hn0qhN2OBS7BYgKBKmqqmoXIF1F8c8ucKT3cqJhhWM/NpN7JIvTGmL2k3iCRUD1GNbrHcG5BhwRHP986rTX070MGBnENQ4/E7ghP8SWgI/5Pcfu/2//c4lF4CDN7wAAAABJRU5ErkJggg==) no-repeat center center;
		background-size: 50upx;
	}

	.a-address .right-del {
		width: 50upx;
		height: 50upx;
		padding: 25upx 0 25px 25upx;
		box-sizing: border-box;
		background: url(../../../static/shanchu.png) no-repeat center center;
		background-size: 50upx;
	}

	.bottom-box {
		position: fixed;
		width: 100%;
		bottom: 0;
		font-size: 28upx;
		color: #000000;
		border-top: 1upx solid #eee;
		height: 100upx;
		line-height: 100upx;
		background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAAXNSR0IArs4c6QAAAj1JREFUOBGVVE1LHEEQ7e4EkRBjiBL9AQqCQmB32d3xEMgxp6CCssEFFUMiBA+e9pKTgeBBBRGChEBCPAghISgiiEhu87Gzq/4Df4Yf292+Wulx2llXbRiq+1W9N9VVNcMYltaau2741fOqU3S+zxIUDOIKzAdIfXPdygRhd10ChCUQPxIBmQjO2XcIFu8sANox51wbAokA++H74VuDNbOcnAieRhnWLslRuORcjOfzqY0IabCpCxBOb1SK/cT2YSxOCsEKuVzmdwyztpEAob5fGdKabSCTllhUjTE+5jjpvzEs2loChLpu9TVjioJbTRQKe45nFJn8M5ixCQFyeF74CjXZRDEfR4EQEYKPZLPpLYORbShADt+vOlqrHVypnc600K0zNGwYmWxfIk0EKCAMw1StxnYh0mEIoJziGXKc1A5hN2ZgCEFw2C+l3Md1nhsM9gQ1eZPPZ3broxxzJLZayy6Qn1xzoNWijbCmAkFQfYmWUtGijmBPA1bEgP0hgfjQ0DlaQXAwKKWiYj0yIIqocOvJ+HQ2zKBcPswqJVGkeBvpe+HvQP5lBMkmiuh5lTTwPaT+1ATSx4aizeRy6TWDGWtlgN6/ABFtuyJTIMizjcjkiwTK5aMBDM4esGfkMAvTNwfyqjlft3UBDEyflOdIm3XaAaIE8rKN2acHnnfQq5T+D3K37RKfMG1fbCx5ErhvD2DrzbjzPMifk+FJpN4FFK8AoXU8Aj+QBXwspWToLQh+Ju/xV1q8JSzhvgCBx9kzUoIj2gAAAABJRU5ErkJggg==) no-repeat 705upx center;
		background-size: 15upx auto;
	}

	.bottom-box .add-btn {
		margin-left: 30upx;
		padding-left: 70upx;
		background: url(data:image/png;base64,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) no-repeat left center;
		background-size: 40upx auto;
	}
</style>
