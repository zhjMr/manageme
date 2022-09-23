<template>
    <div>
        <div class="block">
            <el-pagination 
            @size-change="handleSizeChange"
             @current-change="handleCurrentChange" :current-page="page"
                :page-sizes="[10, 20, 30, 40,50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        total: Number,
        page: Number,
        size: Number
    },
    data() {
        return {

        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(val,'aaa');
            this.$emit('PageNum', val)
        },
        handleCurrentChange(val) {
            console.log(val,'2');
            this.$emit('PageSize', val)
        }
    }
}
</script>
<style scoped lang="scss">

</style>