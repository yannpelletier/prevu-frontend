<template>
  <div>
    <v-dialog
      v-model="visible"
      :activator="activator"
      :width="dialogWidth"
    >
      <template v-slot:activator>
        <div @click.stop="visible=true" class="d-inline-block">
          <slot name="activator"></slot>
        </div>
      </template>
      <v-card class="justify-center flex">
        <v-layout column align-center class="pa-2">
          <iframe ref="iframe" id="ytplayer" type="text/html" :width="videoWidth" :height="videoHeight"
                  src="https://www.youtube.com/embed/8T4BWMcs8Ns?enablejsapi=1&version=3&playerapiid=ytplayer&rel=0"
                  allowfullscreen
                  frameborder="0"
                  allowscriptaccess="always"
          ></iframe>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  const MAX_WIDTH = 1280;

  export default {
    name: "DemoVideoDialog",
    props: {
      activator: {
        type: [Node, Object]
      },

    },
    data() {
      return {
        visible: false
      }
    },
    watch: {
      visible: function () {
        let iframe = this.$refs.iframe;
        if (this.visible) {
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'startVideo'
          }), '*');
        } else {
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'stopVideo'
          }), '*');
          console.log('hidden')
        }
      }
    },
    computed: {
      dialogWidth() {
        return this.videoWidth + 15;
      },
      videoWidth() {
        return Math.min(MAX_WIDTH, window.innerWidth * 0.8);
      },
      videoHeight() {
        return this.videoWidth * 9 / 16;
      }
    }
  }
</script>

<style scoped>

</style>
