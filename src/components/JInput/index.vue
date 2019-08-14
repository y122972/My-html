<template>
    <div class="j-input">
        <input
            spellcheck="false"
            class="j-input__inner"
            :type="type"
            :value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="$emit('change', $event.target.value)"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        mounted () {
            this.disabled && this.$el.classList.add('is-disabled')
        },
        props: {
            type: String,
            value: [String, Number],
            placeholder: String,
            disabled: Boolean,
            name: String,
            clearable: Boolean,
        },
        model: {
            prop: 'value',
            event: 'change',
        }
    }
</script>

<style scoped>
    .j-input {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    .j-input__inner {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #dcdfe6;
        outline: none;
        padding: 0 13px;
        font-size: 14px;
        color: #666;
    }
    .j-input__inner::placeholder {
        color: #bbb;
    }
    .j-input.is-disabled .j-input__inner {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
    }
</style>