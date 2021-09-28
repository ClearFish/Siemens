import axios from '@/libs/api.request'

export const getHomeData = () => {
  return axios.request({
    url: ' /latest',
    method: 'get'
  })
}
export const getDialog = (year,factory)=>{
  return axios.request({
    url:"/statistics/product",
    params :{
      year,
      factory
    },
    method:"get"
  })
}
