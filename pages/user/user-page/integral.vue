<template>
	<view class="container">
		<view class="box">
			<uni-title type="h1" title="积分兑换规则："></uni-title>
			<uni-title type="h2" title="1、积分与AGNI按1：1兑换。"></uni-title>
			<text class="t1">积分兑换的AGNI的释放规则：<br></text>
			<text>1、每次兑换的AGNI一次性到达兑换人钱包地址，为锁仓状态，按已上链的智能合约内容，分24个月逐步释放为可流动资产。每月释放比例如下图所示。</text>
			<uni-table stripe emptyText="暂无更多数据" style="margin-top: 30upx;">
				<uni-tr>
					<uni-th align="center">月份</uni-th>
					<uni-th align="center">释放比例</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td>1</uni-td>
					<uni-td>1%</uni-td>
				</uni-tr>
			
				<uni-tr>
					<uni-td>2</uni-td>
					<uni-td>1%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>3</uni-td>
					<uni-td>1%</uni-td>
				</uni-tr>
				
				<uni-tr>
					<uni-td>4</uni-td>
					<uni-td>3%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>5</uni-td>
					<uni-td>3%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>6</uni-td>
					<uni-td>3%</uni-td>
				</uni-tr>

				<uni-tr>
					<uni-td>7</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>8</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>9</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>10</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>11</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>12</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>13</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>14</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>15</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>16</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>17</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>18</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>19</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>20</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>21</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>22</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>23</uni-td>
					<uni-td>5%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>24</uni-td>
					<uni-td>3%</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>合计</uni-td>
					<uni-td>100%</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},

	}
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
	}

	.box {
		width: 92%;
		padding-top: 30upx;
		word-break: break-all;
	}
	.uni-table-td{
		text-align: center !important;
	}
	
</style>
