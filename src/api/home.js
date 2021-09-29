import axios from '@/libs/api.request'

export const getHomeData = () => {
  return axios.request({
    url: '/v1/latest',
    method: 'get'
  })
}
export const getDialog = (year,factory)=>{
  return axios.request({
    url:"/v1/statistics/product",
    params :{
      year,
      factory
    },
    method:"get"
  })
}
