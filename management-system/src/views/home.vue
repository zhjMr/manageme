<template>
    <el-container>
        <el-header>
            <AppHeader />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <AppAside />
            </el-aside>
            <el-main>
                <AppMin />
            </el-main>
        </el-container>
    </el-container>

</template>
<script>
import AppAside from "./AppAside"
import AppMin from './AppMin'
import AppHeader from "./AppHeader"
export default {
    components: {
        AppHeader,
        AppMin,
        AppAside,
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {
        
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
.el-container {
    height: 100%;
}

.el-header {
    background-color: #2d3a4b;
    color: #333;
    padding: 0;
    height: 50px !important;
    line-height: 50px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;

}

.el-main {
    background-color: #E9EEF3;
    color: #333;

}
</style>