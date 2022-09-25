import request from "@/utlis/request";
//列表
const MenmberList = (page, size, data) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}
// 删除
const MenmberDel = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "DELETE"
    })
}
//新增
const MenmberAdd = (data) => {
    return request({
        url: "/member",
        method: "POST",
        data
    })
}
//编辑
const MenmberEdit = (id, data) => {
    return request({
        url: `/member/${id}`,
        method: 'PUT',
        data
    })
}
//单行会员参数
const GetmenById = (id) => {
  return request({
        url: `member/${id}`,
        method: 'GET',
    })
}
export default {
    MenmberList,
    MenmberDel,
    MenmberAdd,
    MenmberEdit,
    GetmenById
}