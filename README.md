## tab切换-uniapp 使用说明

简介：tab切换，自定义位置、颜色、数据

#### 更新日志

- tab切换，自定义位置、颜色、数据        2021/3/24

#### 安装方式


```
//导入组件
import Tab from '../../components/Tab.vue';

//定义组件
components:{
			Tab
		}
		
//页面调用
<tab :lists="lists" :tab_color="tab_color" @switchover="switchover" :gauge="gauge"></tab>
```


**属性说明：**

|属性名|类型|默认值	|说明|
|---|----|---|---|
|lists|Array|[]|tab切换数组|
				lists:[
					{id:1,name:'普法文章'},
					{id:2,name:'测试数据1'},
					{id:3,name:'测试数据测试数据'},
					{id:4,name:'测试数据阿萨德'},
					{id:5,name:'测试数据阿萨德'},
					{id:6,name:'测试数据大声道'},
					{id:7,name:'测试数据fff'},
					{id:8,name:'测试数据1'},
				
				]
|tab_color|String|''|tab切换选中的颜色|
				tab_color:'#3b87f6'
|gauge|Number|0|tab组件position: fixed布局距离头部的位置大小（rpx）|
				gauge:120

**事件说明：**

|事件称名|说明|返回参数|
|---|----|---|
|switchover|获取组件选中的tabid|




