<template>
  <v-card elevation="0" :loading="loading">
    <v-stage ref="stage" :config="stageConfig">
      <v-layer ref="layer">
        <v-image ref="image" :config="baseLayer"/>
        <v-image ref="watermark" :config="watermarkLayer"/>
      </v-layer>
    </v-stage>
  </v-card>
</template>

<script>
  import '@/plugins/konva';
  import Watermark from "@/store/database/Watermark";

  export default {
    name: 'LiveProductPreview',
    data() {
      return {
        imageLoading: true,
        watermarkLoading: false,
        maxImageWidth: 1000,
        maxImageHeight: 1000,
        //Ratio between the max image dimension and the loaded image
        imageMaxRatio: 1,
        stageConfig: {
          width: 1,
          height: 1,
          scaleX: 1,
          scaleY: 1,
        },
        baseLayer: {
          image: null,
          filters: [
            Konva.Filters.Pixelate,
            Konva.Filters.Blur,
          ],
          width: 1,
          height: 1,
          pixelSize: 1,
          blurRadius: this.blur,
        },
        watermarkLayer: {
          image: null,
          opacity: 0,
          width: 1,
          height: 1,
          x: 0,
          y: 0,
          offsetX: 0,
          offsetY: 0,
        },
      };
    },
    props: {
      src: String,
      pixelSize: {
        default: 0,
        type: Number,
      },
      blur: {
        default: 0,
        type: Number,
      },
      watermarkId: {
        default: null,
        type: [Number, null],
      },
      canvasMaxHeight: {
        default: 400,
        type: Number,
      }
    },
    mounted() {
      this.baseLayer.image = new Image();
      this.baseLayer.image.setAttribute('crossOrigin', 'use-credentials');
      this.baseLayer.image.onload = () => {
        this.fitStageSize();
        this.fitWatermark();
        this.drawCanvas();
        this.imageLoading = false;
      };

      this.watermarkLayer.image = new Image();
      this.watermarkLayer.image.setAttribute('crossOrigin', 'use-credentials');
      this.watermarkLayer.image.onload = () => {
        this.fitStageSize();
        this.fitWatermark();
        this.drawCanvas();
        this.watermarkLoading = false;
      };

      this.loadImage();
      this.loadWatermark();
    },
    computed: {
      loading() {
        return this.imageLoading || this.watermarkLoading;
      },
      overlayWatermark() {
        return this.watermarkId ? Watermark.getters('watermarkById')(this.watermarkId) : null;
      },
    },
    watch: {
      src() {
        this.loadImage();
      },
      'overlayWatermark.link'() {
        this.loadWatermark();
      },
      'overlayWatermark.position'() {
        this.fitWatermark();
        this.drawCanvas();
      },
      'overlayWatermark.dimension'() {
        this.fitWatermark();
        this.drawCanvas();
      },
      pixelSize() {
        this.drawCanvas();
      },
      blur() {
        this.drawCanvas();
      },
    },
    methods: {
      loadImage() {
        this.imageLoading = true;
        this.baseLayer.image.src = this.src;
      },
      loadWatermark() {
        if (this.overlayWatermark) {
          this.watermarkLoading = true;

          this.watermarkLayer.opacity = 1;
          this.watermarkLayer.image.src = this.overlayWatermark.link;
        } else {
          this.watermarkLayer.opacity = 0;
          this.drawCanvas();
        }
      },
      drawCanvas() {
        this.baseLayer.pixelSize = this.pixelSize > 0 ? this.pixelSize * (Math.max(this.baseLayer.width, this.baseLayer.height) / 100) : 1;
        this.baseLayer.blurRadius = this.blur * (Math.max(this.baseLayer.width, this.baseLayer.height) / 250);

        this.$nextTick(() => {
          this.$refs.image.getNode().cache();
          this.$refs.layer.getNode().batchDraw();
        });

      },
      fitStageSize() {
        let computedStyle = getComputedStyle(this.$el);

        //Set the canvas size (the place it physically occupies) based on the container dimensions
        let srcWidth = this.baseLayer.image.width;
        let srcHeight = this.baseLayer.image.height;
        let parentWidth = parseInt(computedStyle.width);
        let ratio = Math.min(parentWidth / srcWidth, this.canvasMaxHeight / srcHeight);

        let width = srcWidth * ratio;
        let height = srcHeight * ratio;

        this.stageConfig.width = width;
        this.stageConfig.height = height;

        //Set the actual image
        this.imageMaxRatio = Math.min(this.maxImageWidth / srcWidth, this.maxImageHeight / srcHeight);

        this.baseLayer.width = srcWidth * this.imageMaxRatio;
        this.baseLayer.height = srcHeight * this.imageMaxRatio;
        this.stageConfig.scaleX = this.stageConfig.width / this.baseLayer.width;
        this.stageConfig.scaleY = this.stageConfig.height / this.baseLayer.height;
      },
      fitWatermark() {
        if (this.overlayWatermark) {
          this.fitWatermarkDimension();
          this.fitWatermarkPosition();
        }
      },
      fitWatermarkDimension() {
        let srcWidth = this.watermarkLayer.image.width;
        let srcHeight = this.watermarkLayer.image.height;

        let ratio = 0;

        switch (this.overlayWatermark.dimension) {
          case 'same':
            this.watermarkLayer.width = srcWidth;
            this.watermarkLayer.height = srcHeight;
            this.watermarkLayer.scaleX = this.imageMaxRatio;
            this.watermarkLayer.scaleY = this.imageMaxRatio;
            break;
          case 'fill-width':
            ratio = this.baseLayer.width / srcWidth;
            this.watermarkLayer.width = srcWidth * ratio;
            this.watermarkLayer.height = srcHeight * ratio;
            this.watermarkLayer.scaleX = 1;
            this.watermarkLayer.scaleY = 1;
            break;
          case 'fill-height':
            ratio = this.baseLayer.height / srcHeight;
            this.watermarkLayer.width = srcWidth * ratio;
            this.watermarkLayer.height = srcHeight * ratio;
            this.watermarkLayer.scaleX = 1;
            this.watermarkLayer.scaleY = 1;
            break;
          case 'fill-both':
            ratio = Math.max(this.baseLayer.width / srcWidth, this.baseLayer.height / srcHeight);
            this.watermarkLayer.width = srcWidth * ratio;
            this.watermarkLayer.height = srcHeight * ratio;
            this.watermarkLayer.scaleX = 1;
            this.watermarkLayer.scaleY = 1;
            break;
        }
      },
      fitWatermarkPosition() {
        switch (this.overlayWatermark.position) {
          case 'top-left':
            this.watermarkLayer.offsetX = 0;
            this.watermarkLayer.offsetY = 0;
            this.watermarkLayer.x = 0;
            this.watermarkLayer.y = 0;
            break;
          case 'top-right':
            this.watermarkLayer.offsetX = this.watermarkLayer.width;
            this.watermarkLayer.offsetY = 0;
            this.watermarkLayer.x = this.baseLayer.width;
            this.watermarkLayer.y = 0;
            break;
          case 'bottom-left':
            this.watermarkLayer.offsetX = 0;
            this.watermarkLayer.offsetY = this.watermarkLayer.height;
            this.watermarkLayer.x = 0;
            this.watermarkLayer.y = this.baseLayer.height;
            break;
          case 'bottom-right':
            this.watermarkLayer.offsetX = this.watermarkLayer.width;
            this.watermarkLayer.offsetY = this.watermarkLayer.height;
            this.watermarkLayer.x = this.baseLayer.width;
            this.watermarkLayer.y = this.baseLayer.height;
            break;
          case 'center':
            this.watermarkLayer.offsetX = this.watermarkLayer.width / 2;
            this.watermarkLayer.offsetY = this.watermarkLayer.height / 2;
            this.watermarkLayer.x = this.baseLayer.width / 2;
            this.watermarkLayer.y = this.baseLayer.height / 2;
            break;
        }
      }
    },
  };
</script>

<style scoped>

</style>
