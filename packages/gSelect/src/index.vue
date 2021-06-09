<template>
    <section :class="{'active':isShowList}" class="g-select-wrap">
        <div @click.stop="toggleList" class="g-select-input-wrap">
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
                <li :key="item[textKey]" @click="onSelect(item[originKey])" v-for="item in listRenderData">
                    <img :src="iconSrc" class="icon-checked" v-show="hasChecked(item[originKey])" />
                    {{item[textKey]}}
                </li>
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
        //最少选择个数
        minCheckedNum: {
            type: [Number, String],
            default: null,
        },
        //最多可选个数
        maxCheckedNum: {
            type: [Number, String],
            default: null,
        },
        //超过最多个数提示
        onOverLimitMaxPrompt: {
            type: Function,
            default: null,
        },
        //超过最多个数提示
        onOverLimitMinPrompt: {
            type: Function,
            default: null,
        },
        //主键值key，默认id
        originKey: {
            type: String,
            default: 'id',
        },
        //文字显示key值，默认为text
        textKey: {
            type: String,
            default: 'text',
        },
        //v-model映射，选择的结果值
        ids: {
            type: [Number, String, Array],
            default() {
                return this.multiple ? [] : null;
            },
        },
        //是否置顶选中值
        setCheckedTop: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: 'ids',
        event: 'change',
    },
    data() {
        return {
            //选中的节点
            iconSrc: require('Assets/icon/icon-checked.png'),
            //是否显示list
            isShowList: false,
        };
    },
    computed: {
        //选中的节点数组
        checkedArray() {
            let _ids = this.ids;
            //多选
            if (this.multiple) {
                if (_ids.trim().length == 0 || _ids == null || _ids == undefined) {
                    return [];
                } else if (Array.isArray(_ids)) {
                    return _ids;
                } else if (typeof _ids === 'string') {
                    return _ids.split(',').map(Number);
                } else if (typeof _ids === 'number') {
                    return [_ids];
                }
            } else {
                //单选
                if (Array.isArray(_ids)) {
                    return [_ids[0]];
                } else if (typeof _ids === 'string') {
                    return [_ids.split(',').map(Number)[0]];
                } else if (typeof _ids === 'number') {
                    return [_ids];
                }
            }
            return [];
        },
        //输入框文字
        checkedText() {
            return (
                this.selectData
                    .filter((item) => this.checkedArray.includes(item[this.originKey]))
                    .map((item) => item[this.textKey])
                    .join('/') || ''
            );
        },
        //是否选中,控制勾选图标
        hasChecked() {
            return function (key) {
                return this.checkedArray.includes(key);
            };
        },
        //列表结果数据
        listRenderData() {
            if (this.setCheckedTop && this.$attrs.valueTypeObject && this.$attrs.valueTypeObject.length > 0) {
                let result = this.$attrs.valueTypeObject.slice();
                this.selectData.forEach((item, index, arr) => {
                    if (this.checkedArray.includes(item.id)) {
                        arr.splice(index, 1);
                    }
                });
                result.push(...this.selectData);
                return result;
            } else {
                return this.selectData;
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            document.addEventListener('click', this.onBlur, false);
            this.$once('hook:beforeDestory', function () {
                document.removeEventListener('click', this.onBlur, false);
            });
        },
        //点击其他元素时，隐藏list
        onBlur(e) {
            if (!this.$el.contains(e.target)) {
                this.isShowList = false;
            }
        },
        //单选：切换显示list，多选：显示list
        toggleList(e) {
            // console.log('e:', e, e.target);
            this.isShowList = !this.isShowList;
        },
        //选择节点
        onSelect(key) {
            // console.log('key:', key);
            let _checkedArray = this.checkedArray;
            let _index = _checkedArray.indexOf(key); //是否在选中的数组中
            let _maxCheckedNum = this.maxCheckedNum; //最多选择个数
            let _minCheckedNum = this.minCheckedNum; //最多选择个数

            // console.log('onOverLimitMaxPrompt:', this.onOverLimitMaxPrompt)
            //最多个数
            if (_maxCheckedNum && _checkedArray.length == _maxCheckedNum && _index < 0) {
                this.onOverLimitMaxPrompt ? this.onOverLimitMaxPrompt() : this.$emit('validate', 'maxCheckedNum');
                return;
            }
            //最少个数
            if (_minCheckedNum && _checkedArray.length == _minCheckedNum && _index >= 0) {
                this.onOverLimitMinPrompt ? this.onOverLimitMinPrompt() : this.$emit('validate', 'minCheckedNum');
                return;
            }

            if (_index >= 0) {
                _checkedArray.splice(_index, 1);
            } else {
                //多选，单选区分
                this.multiple ? _checkedArray.push(key) : _checkedArray.splice(_index, 1, key);
            }

            console.log('this.checkedArray:', this.checkedArray);
            this.returnChange(); //返回结果
        },
        //返回选中的数据
        returnChange() {
            // console.log('ids:', this.ids);
            let result = null;
            let _ids = this.ids;
            if (_ids == null || _ids == undefined || Array.isArray(_ids)) {
                result = Object.assign([], this.checkedArray);
            } else if (typeof _ids === 'string') {
                result = this.checkedArray.join();
            } else if (typeof _ids === 'number') {
                result = Object.assign([], this.checkedArray);
            }
            this.$emit('change', result);
        },
    },
};
</script>

<style lang="less" scoped>
@import '~Assets/css/mixin.less';
.g-select-wrap {
    box-sizing: border-box;
    display: inline-block;
    width: 200px;
    height: auto;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    &.active {
        .g-select-list-wrap {
            display: block;
        }
    }
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
        display: none;
        width: 100%;
        height: auto;
        min-height: 20px;
        margin-top: 10px;
        .g-select-list {
            width: 100%;
            height: auto;
            max-height: 200px;
            overflow-y: auto;
            & > li {
                position: relative;
                box-sizing: border-box;
                padding-left: 30px;
                height: 20px;
                line-height: 20px;
                cursor: pointer;
                &:hover {
                    background: #9cbfea;
                }
                .icon-checked {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
}
</style>