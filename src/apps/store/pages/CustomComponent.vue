<!-- CustomComponent.vue -->
<template>
  <div :id="id" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide previous"/>
      <div class="swiper-slide">
        <slot/>
      </div>
      <div class="swiper-slide next"/>
    </div>
  </div>
</template>

<script>
  import 'swiper/css/swiper.css'
  import { Swiper } from 'swiper/js/swiper.esm.js'

  export default {
    props: ['id'],
    mounted () {
      const self = this;
      const el = '#' + this.id;

      // Initialize Swiper
      const swiper = new Swiper(el, {
        initialSlide: 1,
        resistanceRatio: 0,
        speed: 150
      });

      // Event will be fired after transition
      swiper.on('transitionEnd', function () {
        if (this.activeIndex === 0) {
          self.$emit('transitionEnd');
          // Destroy slider instance and detach all events listeners
          this.destroy()
        }
      })
    }
  }
</script>
