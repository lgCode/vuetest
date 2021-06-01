<template>
    <div class="about">
        <!-- <router-link :to="{name:'Home',params:{ userId:3333 }}">Home</router-link>| -->
        <!-- <router-link to="/about">About</router-link> -->
        <!-- <a @click="toHome">gotoHome</a> -->
        <!-- <B data-name="HHHH" msg="你好"></B> -->
        <!-- 111 -->
    </div>
</template>
<script>
export default {
    methods: {
        toHome() {
            this.$router.push({
                name: `Home`,
                params: {
                    paramsname: '333333',
                },
                query: {
                    queryname: 'Jack',
                },
            });
        },
    },
};
</script>
