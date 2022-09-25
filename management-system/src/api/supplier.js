import request from "@/utlis/request";

const SuppList = (page, size, data) => {
    return request({
        url: `/supplier/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}
const SuppDel = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "DELETE"
    })
}
const SuppAdd = (data) => {
    return request({
        url: "/supplier",
        method: "POST",
        data
    })
}
const SuppOne = (id) => {
    return request({
        url: `supplier/${id}`,
        method: "GET"
    })
}
const SuppEdit = (id, data) => {
    return request({
        url: `supplier/${id}`,
        method: "PUT",
        data,
    })
}
export default {
    SuppList,//列表
    SuppDel,//删除
    SuppAdd,//添加
    SuppEdit,//编辑
    SuppOne,//单行数据回填
}