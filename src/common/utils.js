export function  
debounce(func,delay){
  //防抖函数  减少refresh操作
  let timer =null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer=setTimeout(() => {
      func.apply(this,args)
    }, delay);
  }
}
