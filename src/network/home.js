import {request} from './request'
export function getHomeMultisata(){
  return request({
    url:'/home/multidata'
  })
}