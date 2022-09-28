<template>
    <div>
        <el-dialog :title="dialogConfig.title" :visible.sync="visible" :width="dialogConfig.width">
            <el-form :rules="rules" ref="form" :model="value" :label-width="dialogConfig.labeWidth">
                <template v-for="item in DialogFrom">
                    <el-form-item :label="item.label" v-if="item.type=='input'" :prop="item.prop">
                        <el-input v-model="value[item.prop]"></el-input>
                    </el-form-item>
                    <el-form-item :label="item.label" v-else-if="item.type=='date'" :prop="item.prop">
                        <el-date-picker :type="item.type" :placeholder="item.placeholder" v-model="value[item.prop]"
                            style="width: 50%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="item.label" v-else-if="item.type=='select'" :prop="item.prop">
                        <el-select v-model="value[item.prop]" :placeholder="item.placeholder">
                            <el-option v-for="(ele,index) in proTypeList" :key="index" :label="ele" :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.label" v-else-if="item.type=='textarea'" :prop="item.prop">
                        <el-input :type="item.type" v-model="value[item.prop]"></el-input>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            default: () => { }
        },
        DialogFrom: {
            type: Array,
            default: () => []
        },
        proTypeList: {
            type: Object,
            default: () => { }
        },
        rules: {
            type: Object,
            default: () => { }
        },
        dialogConfig: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {

        };
    },
    computed: {
        visible: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                console.log(val);
                this.$emit("update:dialogVisible", val)
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs['form'].validate(valid => {
                if (!valid) return
                this.$emit('Oksubmit')
            })
        },
        menit() {
            this.$refs['form'].resetFields()
        }
    },
}
</script>
<style scoped lang="scss">

</style>