import service from '@/utils/service'

export default getWeather = (data) => {
    return request({
        url:'/simpleWeather/query',
        method:'GET',
        data
    })
}