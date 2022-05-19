import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import { Button, Tabbar, TabbarItem, Form, Field, Icon, NavBar, Cell, CellGroup, Popup, List, PullRefresh, DatetimePicker,
    NumberKeyboard, Dialog, Progress, Rate, Divider,Col, Row ,Image as VanImage,NoticeBar,Sticky,Tabs,Tab,
    Sidebar, SidebarItem,Swipe, SwipeItem,ConfigProvider   } from 'vant';


// 全局样式
import '@/scss/index.scss'
// 框架引入样式
import 'vant/lib/index.css';
//引入图标
import '@/scss/iconfont/iconfont'
//引入pinia
import { pinia } from '@/store'
// 全局方法注册
import {getRandomCode} from '@/utils/globalMethods'
import api from '@/api'


const app = createApp(App)
app.config.globalProperties.getRandomCode=getRandomCode
app.config.globalProperties.$api=api

app.use(router)

app.use(pinia)

app.use(Tabbar);
app.use(TabbarItem);
app.use(Form)
app.use(Field)
app.use(Button) // 注册组件
app.use(Icon)
app.use(NavBar)
app.use(CellGroup)
app.use(Cell)
app.use(Popup)
app.use(List)
app.use(PullRefresh)
app.use(DatetimePicker)
app.use(NumberKeyboard)
app.use(Dialog)
app.use(Progress)
app.use(Rate)
app.use(Divider)
app.use(Col)
app.use(Row)
app.use(VanImage)
app.use(NoticeBar)
app.use(Sticky)
app.use(Tabs)
app.use(Tab)
app.use(Tab)
app.use(Sidebar)
app.use(SidebarItem);
app.use(Swipe);
app.use(SwipeItem);
app.use(ConfigProvider);




app.mount('#app')
