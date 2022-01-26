<template>
  <v-footer color="transparent" id="core-footer" height="82" absolute>
        <span v-for="link in links" :key="link.name">
          <template v-if="link.link">
            <router-link :to="link.link" class="pa-4 footer-links">
              {{ link.name }}
            </router-link>
          </template>
          <template v-else>
            <a :href="link.href" ref="noopener" class="pa-4 footer-links">
              {{ link.name }}
            </a>
          </template>
        </span>
    <v-spacer></v-spacer>
    <span class="font-weight-light" v-if="!isMobile">
            &copy; PrevU
			{{ (new Date()).getFullYear() }}
        </span>
  </v-footer>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data: () => ({
            links: [
                {name: 'About Us', link: '/about'},
                {name: 'Contact', link: '/contact'},
                {name: 'Legal', link: '/terms-of-use'},
                {name: 'FAQ', link: '/faq'},
                {name: 'Blog', href: 'https://blog.prev-u.com'},
            ]
        }),
        computed: {
            ...mapGetters('app', ['isMobile']),
        }
    }
</script>

<style scoped>
  #core-footer {
    z-index: 0;
  }

  .footer-links {
    color: #737373 !important;
    transition: .3s;
    text-decoration: none;
  }

  .footer-links:hover {
    color: #000000 !important;
    transition: .3s;
  }
</style>
