<template>
    <div>
        <AppLink v-if="ShowLink" />
        <router-view />
    </div>
</template>
<script>
import AppLink from './Link.vue'
export default {
    components: {
        AppLink,
    },
    data() {
        return {

        };
    },
    created() {

    },
    computed: {
        ShowLink() {
            return !(this.$route.path == '/index')
        }
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">

</style>