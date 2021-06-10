<template>
    <div id="app11">
        <div id="nav">
            <div>ids:{{getCheckedIds}}</div>
            <g-select
                :onOverLimitMaxPrompt="onOverLimitMaxPrompt"
                :onOverLimitMinPrompt="onOverLimitMinPrompt"
                :select-data="selectData"
                :valueTypeObject="checkedData"
                canSearch
                maxCheckedNum="5"
                minCheckedNum="0"
                setCheckedTop
                textKey="label"
                v-model="getCheckedIds"
            />
            <about />

            <!-- <input
                :placeholder="placeholder"
                @blur="onBlur"
                @change="onChange"
                @focus="onFocus"
                type="text"
                v-model="searchVal"
            />
            {{searchVal}}
            <div>{{searchValBak}}</div>-->
        </div>
    </div>
</template>
<script>
import about from './views/About';
export default {
    components: {
        about,
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

            searchVal: '你好你好',
            searchValBak: this.searchVal,
            placeholder: '',
            placeholderDefault: '请选择',
        };
    },
    watch: {
        searchVal: {
            handler(nVal) {
                if (nVal) {
                    this.searchValBak = nVal;
                }
            },
            immediate: true,
        },
    },
    computed: {
        //选中的id
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
                    id: 3,
                    label: '邮箱',
                },
                {
                    id: 5,
                    label: '扩展字段1',
                },
            ];
            this.sort();
        }, 1000);
    },
    methods: {
        sort() {
            this.selectData.forEach((item, index, arr) => {
                if (this.getCheckedIds.indexOf(item.id) > -1) {
                    arr.splice(index, 1);
                }
            });
            this.selectData.unshift(...this.checkedData);
        },
        onOverLimitMaxPrompt() {
            alert('最多可选择5个');
        },
        onOverLimitMinPrompt() {
            alert('至少选择1个');
        },

        onChange(e) {
            console.log('e:', e.target.value);
        },
        onFocus() {
            console.log('focus');
            this.placeholder = this.searchVal;
            this.searchVal = '';
        },
        onBlur() {
            console.log('blur');
            this.searchVal = this.searchValBak;
            this.placeholder = this.placeholderDefault;
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
input {
    height: 30px;
    color: red;
}
</style>
