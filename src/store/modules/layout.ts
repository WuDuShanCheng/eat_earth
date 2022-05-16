import { defineStore } from 'pinia'
import api from '@/api'
export const useLayoutStore = defineStore({
    id: 'layout',
    state: () => {
        return {
            store: {},
            cart: [],
            orderType: 'takein',
            address: {},
            member: {},
            order: {}
        }
    },
    getters: {
        getOrderType():string {
            return this.orderType
        },
    },
    actions: {
        async updateName() {
            const store = await api('store')
            this.SET_STORE(store)
        },
        SET_ORDER_TYPE(type: any) {
            this.orderType = type
        },
        SET_MEMBER(member: any) {
            this.member = member
        },
        SET_ADDRESS(address: any) {
            this.address = address
        },
        SET_STORE(store: any) {
            this.store = store
        },
        SET_CART(cart: any) {
            this.cart = cart
        },
        REMOVE_CART() {
            this.cart = []
        },
        SET_ORDER(order: any) {
            this.order = order
        }
    }
})
