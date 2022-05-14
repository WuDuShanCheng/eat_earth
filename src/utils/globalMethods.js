import { computed } from 'vue'
import { mapState,mapActions, useStore } from 'vuex'

export function getRandomCode(num) {
  let data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let nums = "";
  let timestamp = parseInt(new Date().getTime() / 1000) + ''
  for (let i = 0; i < num; i++) {
    let r = parseInt(Math.random() * 61);
    nums += data[r];
  }
  return timestamp + nums;
}

export function useState(mapper) {
  // 拿到store
  const store = useStore()

  // 获取到对应的对象的functions
  const storeStateFns = mapState(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })
  return storeState
}


export function useAction(mapper) {
  // 拿到store
  const store = useStore()

  // 获取到对应的对象的functions
  const storeStateFns = mapActions(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })
  return storeState
}
