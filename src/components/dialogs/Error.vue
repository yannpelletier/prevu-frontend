<template>
  <v-dialog ref="error" v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="ok">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import Vue from 'vue'

    export default {
        data: () => ({
            dialog: false,
            resolve: null,
            reject: null,
            message: null,
            title: null,
            options: {
                color: 'error',
                width: 290,
                zIndex: 200
            }
        }),
        mounted() {
            Vue.prototype.$error = this.open;
        },
        methods: {
            open(title, message, options) {
                this.dialog = true;
                this.title = title;
                this.message = message;
                this.options = Object.assign(this.options, options);
            },
            ok() {
                this.dialog = false
            },
        }
    }
</script>
