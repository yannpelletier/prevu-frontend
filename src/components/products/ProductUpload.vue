<template>
  <v-card class="product-upload" :loading="loading">
    <template v-slot:progress>
      <v-progress-linear v-model="progress"></v-progress-linear>
    </template>
    <v-card-text>
      <v-layout align-center justify-center column class="file-input">
        <input multiple @change="onUpload" type="file"/>
        <span class="file-input-text">Drag and drop your files or click</span>
        <span class="file-input-max-info ma-8">Up to {{MAX_NUMBER_FILES}} files at once</span>
        <v-icon x-large class="ma-10">mdi-cloud-upload</v-icon>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'ProductUpload',
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            progress: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                MAX_NUMBER_FILES: 10
            }
        },
        methods: {
            async onUpload(event) {
                if(event.target.files.length){
                    this.$emit('file-uploaded', Array.from(event.target.files).slice(0, this.MAX_NUMBER_FILES));
                    event.target.value = null;
                }
            },
        }
    };
</script>

<style scoped>
  .file-input {
    width: 100%;
    min-height: 500px;
    border: 3px dashed gray;
    background-color: #e7e4e1;
    border-radius: 5px;
    transition: all .25s;
  }

  .file-input:hover {
    border: 3px dashed #36acd1;
    background-color: #d7d6d3;
    transition: all .25s;
  }

  .file-input-text {
    font-size: 22pt;
    text-align: center;
    line-height: 30pt;
  }

  .file-input-max-info {
    font-size: 16pt;
    color: grey;
    font-weight: 300;
  }

  input {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    zoom: 1; /* Fix for IE7 */
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
