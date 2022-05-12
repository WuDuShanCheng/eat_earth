import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import { Button, Tabbar, TabbarItem, Form, Field, Icon, NavBar, Cell, CellGroup, Popup, List, PullRefresh, DatetimePicker, NumberKeyboard, Dialog, Progress, Rate, Divider,Col, Row ,Image as VanImage } from 'vant';
// 全局样式
import '@/scss/index.scss'
// 框架引入样式
import 'vant/lib/index.css';

const app = createApp(App)
app.use(router)
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

app.mount('#app')
