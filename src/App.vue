<template>
    <div id="app11">
        <div id="nav">
            <g-select :select-data="selectData" multiple v-model="ids" />
            <about />
            <!-- <img :src="img_bg" alt /> -->
            <!-- <FunctionalButton name="click me"></FunctionalButton> -->
        </div>
    </div>
</template>
<script>
import FunctionalButton from '@/components/ComFunctional.vue';
import about from './views/About';
import gSelect from 'Views/g-select';
export default {
    components: {
        about,
        gSelect,
        // FunctionalButton,
    },
    data() {
        return {
            // default: require(`@/assets/logo.png`),
            img_bg: require('@/assets/bg.jpg'),
            selectData: [
                {
                    id: 1,
                    text: '手机号',
                },
                {
                    id: 2,
                    text: '昵称',
                },
                {
                    id: 3,
                    text: '邮箱',
                },
            ],
            ids: '1,3',
        };
    },
};
</script>
<style lang="less">
@import './assets/css/mixin.less';
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
    .img-wrap {
        width: 100px;
        height: 100px;
    }
}

.text {
    // .textColor(rgb(10 25 136));
    color: @blue;
}
</style>
