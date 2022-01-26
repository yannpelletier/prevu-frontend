<template>
  <v-snackbar
    v-model="value"
    :color="options.color"
    :timeout="options.timeout"
    right
  >
    {{message}}
  </v-snackbar>
</template>

<script>
    import Vue from 'vue'

    export default {
        data: () => ({
            value: false,
            message: "",
            options: {
                color: 'gray',
                timeout: 5000,
            }
        }),
        mounted() {
            Vue.prototype.$alert = this.alert;
        },
        methods: {
            alert(message, options) {
                this.value = true;
                this.message = message;
                this.options = Object.assign(this.options, options);
            },
        },
    }
</script>
