<template>
    <div class="j-select">
        <j-input
            type="text"
            @change="handleChange"
            @blur="handleBlur"
            @focus="handleFocus"
        />
        <div class="j-select__selections">
            <span class="selected-option" v-if="value.length && value.length > 0">
                <span>{{_value.filter(item => item.selected)[0].label}}</span>
                <i class="cancel" @click="hanleCancel">×</i>
            </span>
            <span class="selected-option" v-if="value.length && value.length > 1">+{{value.length - 1}}</span>
        </div>
        <transition name="show">
            <div class="drop-down-wrapper" v-show="optionsVisible">
                <j-scroll height="250">
                    <ul class="j-select__option-list" @mousedown="handleClick">
                        <li
                            :class="'j-select__option' + (item.selected ? ' selected' : '')"
                            v-for="(item, key) in _value"
                            :key="key"
                            :value="item.value ? item.value : item.label"
                        >
                            {{item.label ? item.label : item.value}}
                        </li>
                    </ul>
                </j-scroll>
            </div>
        </transition>
    </div>
</template>

<script>
    import JInput from '../JInput'
    import JScroll from '../JScroll'
    export default {
        data() {
            return {
                optionsVisible: false,
                _value: null,
                selectedCount: 0,
            }
        },
        methods: {
            handleChange (v) {
                this.$emit('change', v)
            },
            handleClick (e) {
                e.preventDefault()
                let target = e.target
                if([...target.classList].includes('j-select__option')) {
                    this.handleSelect(target.value)
                }
            },
            handleBlur () {
                this.optionsVisible = false
            },
            handleFocus () {
                this.optionsVisible = true
            },
            hanleCancel (v) {
                this.handleSelect(this._value.filter(item => item.selected)[0].value)
            },
            handleSelect (v) {
                if(this.multiple) {
                    let _value = []
                    this._value.forEach((item, key) => {
                        if(item.value === v) {
                            this._value[key].selected = !this._value[key].selected
                        }
                    })
                    _value = this._value.filter(item => item.selected).map(item => item.value)
                    this.$emit('change', _value)
                } else {
                    this.$emit('change', v)
                }
                this.$forceUpdate()
            }
        },
        created () {
            this._value = Array.isArray(this.value) ? this.options.map(item => this.value.includes(item.value) ? {...item, selected: true} : {...item, selected: false}) : this.options.map(item => this.value === item.value ? {...item, selected: true} : {...item, selected: false})
        },
        updated () {

        },
        mounted () {
            console.log('j-select get options: ',this.options)
        },
        components: {
            'j-input': JInput,
            'j-scroll': JScroll,
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: [Array, String, Object, Number],
            multiple: Boolean,
            options: Array,
        }
    }
</script>

<style scoped>
    .show-enter-active, .show-leave-active {
        transition: all .2s;
    }
    .show-enter, .show-leave-to {
        transform: scaleY(.5);
        opacity: 0;
    }
    .j-select {
        position: relative;
    }
    .drop-down-wrapper {
        position: absolute;
        top: 120%;
        width: 100%;
        display: flex;
        flex-direction: column;
        transform-origin: 0 0;
        z-index: 2;
    }
    .j-scroll {
        align-self: center;
    }
    .j-select__option-list {
        min-width: 250px;
        box-shadow: 0 0 10px #eee;
        background: #fff;
        box-sizing: border-box;
        position: relative;
    }
    .j-select__option-list::before {
        position: absolute;
        top: -10px;
        left: 20%;
        width: 0;
        height: 0;
        border: 5px solid #fff;
        border-color: transparent transparent #fff transparent;
        content: '';
    }
    .j-select__option {
        padding: 0 20px;
        line-height: 35px;
        cursor: pointer;
    }
    .j-select__option:hover {
        background: rgba(2, 133, 21, .1);
    }
    .j-select__option.selected {
        font-weight: bold;
        color: rgba(2, 133, 21, 1)
    }
    .j-select__option.selected::after {
        content: '✔';
        color: rgba(2, 133, 21, 1);
        float: right;
    }
    .j-select__selections {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .j-select__selections .selected-option {
        float: left;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        color: #909399;
        border: 1px solid #e9e9eb;
        background: #f4f4f5;
        margin-right: 10px;
        border-radius: 4px;
        font-size: 12px;
    }
    .j-select__selections .selected-option .cancel {
        background: #c0c4cc;
        cursor: pointer;
        border-radius: 50%;
        display: inline-block;
        width: 13px;
        height: 13px;
        text-align: center;
        line-height: 12px;
        margin-left: 5px;
    }
    .j-select__selections .selected-option .cancel:hover {
        background: #909399;
        color: #fff;
    }
</style>