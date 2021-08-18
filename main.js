import Vue from 'vue'
import App from './App'
import tabBar from "@/components/tabBar.vue"
           


Vue.config.productionTip = false
 Vue.component('tabBar', tabBar);
App.mpType = 'app'



const app = new Vue({
    ...App
})

app.$mount()
