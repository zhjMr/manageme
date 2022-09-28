<template>
    <div>
        <el-form :inline="true" :model="value" ref="MeForm" >
            <template v-for="item in queryFrom">
                <el-form-item :prop="item.prop" v-if="item.type=='input'">
                    <el-input v-model="value[item.prop]" :placeholder="item.placeholder"></el-input>
                </el-form-item>
                <el-form-item :prop="item.prop" v-else-if="item.type=='select'">
                    <el-select v-model="value[item.prop]" :placeholder="item.placeholder" style="width:160px">
                        <el-option v-for="(item,index) in proTypeList" :key="index" :label="item" :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.type==='date'" :prop="item.prop">
                    <el-date-picker :type="item.type" :placeholder="item.placeholder" v-model="value[item.prop]"
                        style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :prop="item.prop">
                    <slot :name="item.name"></slot>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        proTypeList: {
            type: Object,
            default: () => { }
        },
        value: {
            type: Object,
            default: () => { }
        },
        queryFrom: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        };
    },
    methods: {
        handleFrom() {
            this.$refs['MeForm'].resetFields()
        }
    }
}
</script>
<style scoped lang="scss">

</style>