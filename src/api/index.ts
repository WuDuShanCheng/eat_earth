import store from './store'
import goods from './goods'
const json = {
	store,
	goods
}

// @ts-ignore
export default (name:any) => new Promise(resolve => (resolve(json[name]), 500))
