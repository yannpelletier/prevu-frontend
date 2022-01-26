<template>
    <v-menu absolute :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-row no-gutters class="align-center">
          <v-col cols="2">
            <v-card
              class="transition-swing"
              :color="value"
              tile
              width="100%"
              height="45"
            />
          </v-col>
          <v-col cols="10">
            <v-btn
              v-on="on"
              tile
              width="100%"
              height="45"
              class="caption"
            >
              {{value}}
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <sketch :preset-colors="[]" :value="value" @input="onChange"/>
    </v-menu>
</template>

<script>
    import { Sketch } from 'vue-color'

    export default {
        name: "ColorField",
        components: {Sketch},
        props: {
            label: {
                type: String,
                default: 'Color',
            },
            value: String,
            removable: Boolean,
            alpha: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            formatColor({r,g,b,a}, alpha) {
                if(alpha){
                    return `rgba(${r},${g},${b},${a})`;
                } else{
                    return `rgb(${r},${g},${b})`;
                }
            },
            onChange({rgba}) {
                this.$emit('input', this.formatColor(rgba, this.alpha));
            },
        },
    }
</script>

<style scoped>

</style>
