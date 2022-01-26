<template>
  <div>
    <v-navigation-drawer
      :value="value"
      id="app-drawer"
      app
      color="white"
      floating
      mobile-break-point="991"
      persistent
      width="260"
      class="elevation-2"
    >
      <v-list-item two-line>
        <v-list-item-content class="my-2 mx-0 justify-content-end">
          <router-link to="/">
            <v-img
              :src="require('@/assets/prev-u_full_300x77.png')"
              height="40"
              contain
              position="left"
            />
          </router-link>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mx-2"/>

      <v-list nav>
        <v-list-item v-for="(link, i) in links.top" :key="i" :to="link.to ? link.to : null"
                     @click="executeAction(link.action)" color="primary">
          <v-list-item-action class="mr-5">
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>

          <v-list-item-title>
            {{link.text}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-if="isMobile">
        <v-divider/>
        <v-list nav>
          <v-list-item v-for="(link, i) in links.bottom" :key="i" :to="link.to ? link.to : null"
                       @click.stop="executeAction(link.action)" color="primary">
            <v-list-item-action class="mr-5">
              <v-icon>
                {{ link.icon }}
              </v-icon>
            </v-list-item-action>

            <v-list-item-title>
              {{link.text}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:append>
        <template v-if="!isMobile">
          <v-list nav>
            <v-list-item v-for="(link, i) in links.bottom" :key="i" :to="link.to ? link.to : null"
                         @click.stop="executeAction(link.action)" color="primary">
              <v-list-item-action class="mr-5">
                <v-icon>
                  {{ link.icon }}
                </v-icon>
              </v-list-item-action>

              <v-list-item-title>
                {{link.text}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
    // Utilities
    import {mapGetters, mapMutations, mapState} from 'vuex';
    import Feedback from "@/components/dialogs/Feedback";

    export default {
        components: {Feedback},
        props: {
            value: Boolean,
            links: Object,
            opened: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState('app', ['image', 'color']),
            ...mapGetters('app', ['isMobile']),
        },
        methods: {
            ...mapMutations('app', ['setDrawer']),
            executeAction(action) {
                if (typeof action === "function") {
                    action();
                }
            }
        }
    }
</script>

<style>
  .drawer-title {
    font-size: 25pt;
    color: #dadada;
  }
</style>
