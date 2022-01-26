<template>
  <v-text-field @keydown="onKeydown" @focus="select" readonly :value="priceString"
                v-bind="$props"></v-text-field>
</template>

<script>
    export default {
        name: 'CurrencyField',
        data() {
            return {
                number: this.value.toString(),
                focused: false,
            };
        },
        props: {
            max: Number,
            min: Number,
            currency: String,
            value: Number,
            outlined: Boolean,
            label: String,
            appendIcon: String,
            appendOuterIcon: String,
            autofocus: Boolean,
            backgroundColor: String,
            clearIcon: String,
            clearable: Boolean,
            color: String,
            counter: [String, Boolean, Number],
            dark: Boolean,
            disabled: Boolean,
            error: Boolean,
            errorCount: [Number, String],
        },
        computed: {
            priceString() {
                return this.formatPrice(Number(this.number), this.currency);
            }
        },
        methods: {
            formatPrice(price, currency) {
                try {
                    let priceInDollar = Math.floor(price) / 100;
                    return (new Intl.NumberFormat(navigator.language, {
                        style: 'currency',
                        currency: currency
                    }).format(priceInDollar));
                } catch (err) {
                    return price + '';
                }
            },

            select() {
                this.focused = true;
            },

            onKeydown(input) {
                if (input.key.match(/\d/g)) {
                    if (this.focused) {
                        this.number = "0";
                    }
                    this.number = this.number + "" + input.key;
                    this.$emit('input', Number(this.number));
                    this.focused = false;
                } else if (input.key === "Backspace") {
                    if (this.focused) {
                        this.number = "0";
                    } else {
                        this.number = this.number.substring(0, this.number.length - 1);
                    }
                    this.$emit('input', Number(this.number));
                    this.focused = false;
                }
            }
        },
    };
</script>

<style scoped>

</style>
