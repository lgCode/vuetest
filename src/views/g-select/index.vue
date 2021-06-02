<template>
    <section class="g-select-wrap">
        <div :class="'g-select-open'" class="g-select-input-wrap">
            <input
                :placeholder="placeholder"
                :value="checkedText"
                class="g-select-input g-text-ellipsis"
                disabled
                type="text"
            />
        </div>
        <div class="g-select-list-wrap">
            <ul class="g-select-list">
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
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
        ids: {
            type: [String, Array],
            default() {
                return [];
            },
        },
    },
    model: {
        prop: 'ids',
        event: 'change',
    },
    data() {
        return {
            //点击选择的下拉节点
            selectedNode: {},
        };
    },
    computed: {
        //v-mode映射字段，保存当前选中的id
        checkedKeySet() {
            let _ids = this.ids;
            if (_ids == '' || _ids == null || _ids == undefined) {
                return new Set([]);
            } else if (typeof _ids === 'string') {
                return new Set(_ids.split(','));
            } else if (Array.isArray(_ids)) {
                return new Set(_ids);
            } else {
                return new Set([_ids]);
            }
        },
        //输入框文字
        checkedText() {
            return '';
        },
    },
    mounted() {
        console.log(this.checkedKeySet);
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