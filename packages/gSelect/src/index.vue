<template>
    <section :class="{'active':isShowList}" class="g-select-wrap">
        <div class="g-select-input-wrap">
            <!-- @click.stop="toggleList" -->
            <div
                :class="{'g-select-focused':selectFocus}"
                @click.stop="toggleSelectFocus"
                class="g-select-selection-selected-value"
            >{{checkedText}}</div>
            <input
                :disabled="!canSearch"
                :placeholder="placeholderText"
                @focus="onFocus"
                class="g-select-input g-text-ellipsis"
                ref="searchInput"
                type="text"
                v-model.trim="searchVal"
            />
            <!-- v-model.trim="checkedText" -->
        </div>
        <div class="g-select-list-wrap">
            <ul class="g-select-list">
                <li v-if="renderListData.length ==0">No data</li>
                <li :key="index" @click="onSelect(item[originKey])" v-else v-for="(item,index) in renderListData">
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
        //输入框placeholderDefault
        placeholderDefault: {
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
        //带搜索
        canSearch: {
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
            iconSrc: require('Assets/icon/icon-checked.png'), //选中的节点图标
            isShowList: false, //是否显示list
            placeholderInput: '',
            selectFocus: false, //文字区域是否获取焦点
            searchVal: null,
        };
    },
    watch: {
        selectFocus(nVal) {
            if (nVal) {
                this.$refs.searchInput.focus();
            } else {
            }
        },
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
        checkedText: {
            get() {
                return (
                    this.selectData
                        .filter((item) => this.checkedArray.includes(item[this.originKey]))
                        .map((item) => item[this.textKey])
                        .join('/') || ''
                );
            },
            set(val) {
                console.log('val:', val);
                /*this.checkedText = val;
                 let _val = val.toLowerCase();
                this.selectData = this.selectData.filter((item) => {
                    return item[this.textKey].indexOf(_val) > -1;
                }); */
            },
        },
        //是否选中,控制勾选图标
        hasChecked() {
            return function (key) {
                return this.checkedArray.includes(key);
            };
        },
        renderListData() {
            let list = this.selectData;
            if (this.canSearch) {
                return [];
            } else {
                return list;
            }
        },
        //输入框placeholder
        placeholderText() {
            if (this.checkedArray.length == 0) {
                return this.placeholderDefault;
            } else {
                return this.placeholderInput;
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            document.addEventListener('click', this.onOtherEleSelectBlur, false);
            this.$once('hook:beforeDestory', function () {
                document.removeEventListener('click', this.onOtherEleSelectBlur, false);
            });
        },
        //点击其他元素时，隐藏list
        onOtherEleSelectBlur(e) {
            if (!this.$el.contains(e.target)) {
                this.isShowList = false;
                this.selectFocus = false;
            }
        },
        //输入框获取焦点
        onFocus() {
            this.selectFocus = true;
            this.isShowList = true;
        },
        //输入框失去焦点
        // onBlur(e) {
        //     console.log('222');
        //     this.isShowList = false;
        //     this.selectFocus = false;
        // },
        //单选：切换显示list，多选：显示list
        toggleList(e) {
            this.selectFocus = true;
            // console.log('e:', e, e.target);
            this.isShowList = !this.isShowList;
        },
        //点击显示文字区域，切换列表显示和文字颜色
        toggleSelectFocus() {
            this.selectFocus = this.selectFocus ? false : !this.selectFocus;
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

            // console.log('this.checkedArray:', this.checkedArray);
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
        padding-right: 10px;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
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
        .g-select-focused {
            opacity: 0.4;
        }
        .g-select-input {
            position: absolute;
            right: -200px;
            box-sizing: border-box;
            height: 100%;
            font-size: 14px;
            background: #ff000033;
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
        .g-select-search-input {
            width: 90%;
            height: 25px;
            margin: 0 auto;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
        }
        .g-select-list {
            width: 100%;
            height: auto;
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #dddddd;
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