
export function getRandomCode(num:any) {
  const data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let nums = "";
  const timestamp = parseInt(String(new Date().getTime() / 1000)) + ''
  for (let i = 0; i < num; i++) {
    const r = parseInt(String(Math.random() * 61));
    nums += data[r];
  }
  return timestamp + nums;
}
