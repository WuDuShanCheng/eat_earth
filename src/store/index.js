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
		isLogin:state=>Object.keys(state.member).length > 0
	},
	mutations: {
		SET_ORDER_TYPE(state, type) {
			state.orderType = type
		},
		SET_MEMBER(state, member) {
			state.member = member
		},
		SET_ADDRESS(state, address) {
			state.address = address
		},
		SET_STORE(state, store) {
			state.store = store
		},
		SET_CART(state, cart) {
			state.cart = cart
		},
		REMOVE_CART(state) {
			state.cart = []
		},
		SET_ORDER(state, order) {
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
