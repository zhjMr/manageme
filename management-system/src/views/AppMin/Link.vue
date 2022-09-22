<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="Active" :to="{ path: '/' }">
                    {{MetaTitle}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    computed: {
        MetaTitle() {
            return this.$route.meta?.title
        }
    }
}
</script>
<style scoped lang="scss">
.Active {
    border-left: 3px solid goldenrod;
    padding-left: 10px;
}
</style>