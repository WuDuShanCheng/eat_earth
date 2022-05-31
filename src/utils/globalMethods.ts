export function getRandomCode(num: any) {
    const data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let nums = "";
    const timestamp = parseInt(String(new Date().getTime() / 1000)) + ''
    for (let i = 0; i < num; i++) {
        const r = parseInt(String(Math.random() * 61));
        nums += data[r];
    }
    return timestamp + nums;
}


export function formatDateTime(date: any, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!date) {
        return ''
    }
    if (typeof (date) === 'number') {
        date = new Date(date * 1000)
    }
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            { // @ts-ignore
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            }
    return fmt
}
