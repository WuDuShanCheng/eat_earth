import store from './store'
import goods from './goods'
const json = {
	store,
	goods
}

export default (name) => new Promise(resolve => resolve(json[name]), 500)
