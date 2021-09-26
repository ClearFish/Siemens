import axios from '@/libs/api.request'

export const getHomeData = () => {
  return axios.request({
    url: ' /latest',
    method: 'get'
  })
}
