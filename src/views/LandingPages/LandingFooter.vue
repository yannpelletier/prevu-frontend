<template>
  <div class="container">
    <div class="footer-links">
      <a href="https://blog.prev-u.com" target="_blank">Blog</a>
      <a href="/contact">Contact</a>
      <a href="/terms-of-use">Legal</a>
      <a href="/faq">FAQ</a>
    </div>
    <div class="footer-copyright desktop">Copyright 2019 Prev-U</div>
    <div class="mobile spacer" v-if="addMobileSpacer"></div>
  </div>
</template>

<script>
    export default {
        name: "LandingFooter",
        props: {
            addMobileSpacer: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "style/responsive";

  .container {
    width: 100%;

    display: grid;

    justify-content: space-between;


    margin: auto;


    text-align: center;
    grid-auto-flow: column;
    padding: 40px;
    grid-gap: 30px;

    .footer-copyright {

      color: rgba(0, 0, 0, 0.5);
    }

    .footer-links {
    }

    .footer-links a {

      color: rgba(0, 0, 0, 0.5);

      text-decoration: none;

      padding: 15px;
      transition: 0.25s;
    }

    .footer-links a:hover {

      color: rgba(0, 0, 0, 0.3);
    }

    .spacer {
      padding: 60px 0;
    }
  }

</style>
