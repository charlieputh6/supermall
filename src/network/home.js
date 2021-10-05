import { request } from "./request";

export function getHomeMultidata() {
  return request({
    //URL 不能大写
    url: '/home/multidata'
  })
}
