import store from './store'
import goods from './goods'
import orders from './orders'
const json = {
	store,
	goods,
	orders
}

// @ts-ignore
export default (name:any) => new Promise(resolve => (resolve(json[name]), 500))
