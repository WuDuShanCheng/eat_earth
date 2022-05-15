import store from './store'
import goods from './goods'
const json:any = {
	store,
	goods
}

export default (name:any) => new Promise((resolve:any) => (resolve(json[name]), 500))
