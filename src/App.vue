<template>
    <div id="app11">
        <div id="nav">
            <g-select
                :onOverLimitMaxPrompt="onOverLimitMaxPrompt"
                :onOverLimitMinPrompt="onOverLimitMinPrompt"
                :select-data="selectData"
                :valueTypeObject="checkedData"
                maxCheckedNum="5"
                minCheckedNum="1"
                multiple
                setCheckedTop
                textKey="label"
                v-model="getCheckedIds"
            />
            {{getCheckedIds}}
            <!-- {{ids}} -->
            <about />
            <!-- <img :src="img_bg" alt /> -->
            <!-- <FunctionalButton name="click me"></FunctionalButton> -->
        </div>
    </div>
</template>
<script>
import FunctionalButton from '@/components/ComFunctional.vue';
import about from './views/About';
// import gSelect from 'Views/g-select';
export default {
    components: {
        about,
        // gSelect,
        // FunctionalButton,
    },
    data() {
        return {
            // default: require(`@/assets/logo.png`),
            img_bg: require('@/assets/bg.jpg'),
            selectData: [
                {
                    id: 1,
                    label: '手机号',
                },
                {
                    id: 2,
                    label: '昵称',
                },
                {
                    id: 3,
                    label: '邮箱',
                },
                {
                    id: 4,
                    label: '姓名',
                },
                {
                    id: 5,
                    label: '扩展字段1',
                },
                {
                    id: 6,
                    label: '扩展字段2',
                },
            ], //所有数据
            checkedData: [], //选中的
            ids: '', //传递的id值
            rersult: [],
        };
    },
    computed: {
        getCheckedIds: {
            get() {
                return this.checkedData.length > 0 ? this.checkedData.map((item) => item.id).join(',') : '';
            },
            set(val) {
                let _ids = val.split(',').map(Number);
                this.ids = val;
                this.checkedData = this.selectData.filter((item) => _ids.includes(item.id));
            },
        },
    },
    mounted() {
        setTimeout(() => {
            this.checkedData = [
                {
                    id: 1,
                    label: '手机号',
                },
                {
                    id: 3,
                    label: '邮箱',
                },
            ];
            this.sort();
        }, 1000);
    },
    methods: {
        sort() {
            // this.result = result;
            // console.log(result);
        },
        onOverLimitMaxPrompt() {
            alert('最多可选择5个');
        },
        onOverLimitMinPrompt() {
            alert('至少选择1个');
        },
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
