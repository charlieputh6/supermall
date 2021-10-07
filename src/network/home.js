import { request } from "./request";

export function getHomeMultidata() {
  return request({
    //URL 不能大写
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
