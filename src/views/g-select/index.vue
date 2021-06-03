<template>
    <section class="g-select-wrap">
        <div :class="'g-select-open'" class="g-select-input-wrap">
            <input
                :placeholder="placeholder"
                class="g-select-input g-text-ellipsis"
                disabled
                type="text"
                v-model="checkedText"
            />
        </div>
        <div class="g-select-list-wrap">
            <ul class="g-select-list">
                <li :key="item.text" @click="onSelect(item.id)" v-for="item in selectData">{{item.text}}</li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'g-select',
    props: {
        //数据源
        selectData: {
            type: Array,
            default() {
                return [];
            },
        },
        //输入框placeholder
        placeholder: {
            type: String,
            default: '请选择',
        },
        //单选/多选
        multiple: {
            type: Boolean,
            default: false,
        },
        //最多可选个数
        maxCheckedNum: {
            type: Number,
            default: 5,
        },
        //v-model映射，选择的结果值
        ids: {
            type: [Number, String, Array],
            default() {
                return this.multiple ? [] : null;
            },
        },
    },
    model: {
        prop: 'ids',
        event: 'change',
    },
    data() {
        return {
            //选中的节点
            checkedArray: [],
        };
    },
    watch: {
        ids: {
            handler(_ids) {
                //多选
                if (this.multiple) {
                    if (_ids == '' || _ids == null || _ids == undefined) {
                        this.checkedArray = [];
                    } else if (typeof _ids === 'string') {
                        this.checkedArray = _ids.split(',').map(Number);
                    } else if (Array.isArray(_ids)) {
                        this.checkedArray = _ids;
                    } else {
                        this.checkedArray = [_ids];
                    }
                } else {
                }
            },
            immediate: true,
        },
    },
    computed: {
        //输入框文字
        checkedText() {
            return (
                this.selectData
                    .filter((item) => this.checkedArray.includes(item.id))
                    .map((item) => item.text)
                    .join('/') || ''
            );
        },
    },
    mounted() {
        // console.log('checkedArray:', this.checkedArray);
    },
    methods: {
        //选择节点
        onSelect(key) {
            let _checkedArray = this.checkedArray;
            let _index = _checkedArray.indexOf(key);
            //多选
            if (this.multiple) {
                if (_index >= 0) {
                    this.checkedArray.splice(_index, 1);
                } else {
                    this.checkedArray.push(key);
                }
            } else {
                //单选
            }
        },
        //返回选中的数据
        returnData() {
            this.$emit('change');
        },
    },
};
</script>

<style lang="less" scoped>
.g-select-wrap {
    display: inline-block;
    width: 300px;
    height: auto;
    min-height: 100px;
    padding: 20px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    .g-select-input-wrap {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
        padding-right: 30px;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 0;
        outline: none;
        cursor: pointer;
        &:hover {
            border-color: #40a9ff;
        }
        &:active {
            border-color: #40a9ff;
            border-right-width: 1px !important;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
        &.g-select-open::before {
            content: '111';
            display: inline-block;
            position: absolute;
            right: 8px;
            top: 0;
            width: 20px;
            height: 20px;
        }
        .g-select-input {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            border: none;
            outline: none;
            cursor: pointer;
        }
    }
    .g-select-list-wrap {
        width: 100%;
        height: auto;
        min-height: 20px;
        background: #ffff0014;
        margin-top: 10px;
        .g-select-list {
            width: 100%;
            height: auto;
            & > li {
                height: 20px;
                line-height: 20px;
                cursor: pointer;
                &:hover {
                    background: red;
                }
            }
        }
    }
}
</style>