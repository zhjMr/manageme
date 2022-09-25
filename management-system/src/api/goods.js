
import request from "@/utlis/request";

const goodsList = (page, size, data) => {
    return request({
        url: `/goods/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}
const goodsDel = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "DELETE"
    })
}
const goodsAdd = (data) => {
    return request({
        url: "/goods",
        method: "POST",
        data
    })
}
const goodsOne = (id) => {
    return request({
        url: `goods/${id}`,
        method: "GET"
    })
}
const goodsEdit = (id, data) => {
    return request({
        url: `goods/${id}`,
        method: "PUT",
        data,
    })
}
export default {
    goodsList,//列表
    goodsDel,//删除
    goodsAdd,//添加
    goodsEdit,//编辑
    goodsOne,//单行数据回填
}