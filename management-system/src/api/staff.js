
import request from "@/utlis/request";

const staffList = (page, size, data) => {
    return request({
        url: `/staff/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}
const staffDel = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "DELETE"
    })
}
const staffAdd = (data) => {
    return request({
        url: "/staff",
        method: "POST",
        data
    })
}
const staffOne = (id) => {
    return request({
        url: `staff/${id}`,
        method: "GET"
    })
}
const staffEdit = (id, data) => {
    return request({
        url: `staff/${id}`,
        method: "PUT",
        data,
    })
}
export default {
    staffList,//列表
    staffDel,//删除
    staffAdd,//添加
    staffEdit,//编辑
    staffOne,//单行数据回填
}