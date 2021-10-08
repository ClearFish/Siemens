import axios from '@/libs/api.request'

export const getHomeData = () => {
  return axios.request({
    url: '/v1/latest',
    method: 'get'
  })
}
export const getChartData = (query)=>{
  return axios.request({
    url:"/v1/statistics/product",
    params :query,
    method:"get"
  })
}
export const getHistory = (query)=>{
  return axios.request({
    url:"/history",
    params :query,
    method:"get"
  })
}


export const getDetails = (query)=>{
  return axios.request({
    url:"/history/details",
    params :query,
    method:"get"
  })
}

export const getDetailBom = (query)=>{
  return axios.request({
    url:"/history/details/bom",
    params :query,
    method:"get"
  })
}
