import { createStore } from 'vuex'
import api from '@/api'
// 创建新的存储实例。
const store = createStore({
	state () {
		return {
			store: {},
			cart: [],
			orderType: 'takein',
			address: {},
			member: {},
			order: {}
		}
	},
	getters:{
		//是否登录
		isLogin:(state:any)=>Object.keys(state.member).length > 0
	},
	mutations: {
		SET_ORDER_TYPE(state :any, type) {
			state.orderType = type
		},
		SET_MEMBER(state :any, member) {
			state.member = member
		},
		SET_ADDRESS(state :any, address) {
			state.address = address
		},
		SET_STORE(state :any, store) {
			state.store = store
		},
		SET_CART(state :any, cart) {
			state.cart = cart
		},
		REMOVE_CART(state) {
			state.cart = []
		},
		SET_ORDER(state :any, order) {
			state.order = order
		}
	},
	actions:{
		async getStore({commit}){
			const store = await api('store')
			commit('SET_STORE', store)
		}
	}
})

export default store
