import request from "@/utlis/request";

const MenmberList = (page, size, data) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}
const MenmberDel = (id) => {
    request({
        url: `/supplier/${id}`,
        method: "DELETE"
    })
}
export default {
    MenmberList,
    MenmberDel,
}