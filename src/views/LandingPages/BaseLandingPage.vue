<template>
  <div>
    <main>
      <div class="nav-bar-container">
        <div class="nav-bar">
          <div class="logo-wrapper">
            <router-link to="/">
              <img draggable="false" alt="Prev-U logo" class="nav-bar-logo"
                   :src="require('@/assets/prev-u_full_300x77.png')">
            </router-link>
            <button class="header-menu-btn mobile" id="header-menu-btn" @click="toggleDrawer">

            </button>
          </div>
          <div id="intro-nav-bar-links-mobile" class="nav-bar-links-mobile small mobile invisible">
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
      <router-link class="login-btn desktop" to="/login">Login</router-link>
      <div class="hero-section">
        <v-container :class="{'mt-10': !isMobile}" class="mx-2" style="max-width: 1400px">
          <v-row>
            <v-col cols="12" md="5"
                   style="display:flex; align-items: center; justify-content: center;"
                   class="pl-5"
                   :class="{'text-center': isMobile, 'mb-10': !isMobile}"
            >
              <div>
                <h1 style="font-weight: 400;">{{ hero.header }}</h1>
                <h2 class="mt-4">{{hero.subheader}}</h2>
                <a href="/register" class="start-selling-btn mt-5">
                  Get started - it's free
                </a>
              </div>
            </v-col>
            <v-col cols="12" md="7" style="display:flex; align-items: center;">
              <slot name="hero-image">
                <img v-if="isMobile"
                     :alt="hero.imageAlt ? hero.imageAlt : ''" style="width: 100%"
                     :src="require(`${hero.mobileImage ? hero.mobileImage : hero.image}`)"
                />
                <img v-else
                     :alt="hero.imageAlt ? hero.imageAlt : ''"
                     style="width: 100%; margin-bottom: -122px"
                     :style="hero.imageDesktopCustomCss ? hero.imageDesktopCustomCss : ''"
                     :src="require(`${hero.image ? hero.image : hero.mobileImage}`)"
                />
              </slot>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-row class="ma-auto" style="max-width: 1400px">
          <template v-for="benefit in benefits">
            <v-col cols="12" md="4" class="d-flex align-center flex-column px-7">
              <img
                :src="require(`${benefit.image}`)"
                :alt="benefit.imageAlt ? benefit.imageAlt : ''"
                width="50" max-height="50"
              />
              <h2 class="my-5">{{ benefit.title }}</h2>
              <p class="text-justify">
                {{ benefit.description }}
              </p>
            </v-col>
          </template>
        </v-row>
      </v-container>
      <template v-for="(informationSection, i) in informationSections">
        <v-container>
          <div class="information-section" :class="{reversed: (i % 2 === 1)}">
            <div class="information-section-image-container">
              <template v-if="informationSection.hasOwnProperty('image')">
                <img
                  class="information-section-image"
                  :src="require(`${informationSection.image}`)"
                  :alt="informationSection.imageAlt ? informationSection.imageAlt : ''"
                />
              </template>
              <template v-else-if="informationSection.hasOwnProperty('video')">
                <v-lazy>
                  <video class="information-section-image" id="filter-demo-video" muted autoplay
                         loop>
                    <source :src="require(`${informationSection.video}`)" type="video/mp4">
                  </video>
                </v-lazy>
              </template>
            </div>
            <div class="information-section-text-zone">
              <h3 class="information-section-title" v-html="informationSection.title"></h3>
              <div class="information-section-text" v-html="informationSection.description"></div>
              <v-btn v-if="informationSection.link"
                     outlined large class="mt-5" :to="informationSection.link.to" color="primary">
                {{informationSection.link.text}}
              </v-btn>
              <demo-video-dialog v-if="informationSection.demoButton">
                <template v-slot:activator>
                  <v-btn
                    outlined
                    class="mt-5"
                    color="primary"
                    large
                  >
                    <v-icon class="mr-2">mdi-play</v-icon>
                    How to create a store?
                  </v-btn>
                </template>
              </demo-video-dialog>
            </div>
          </div>
        </v-container>
      </template>
      <div class="bottom-section"></div>
      <div class="landing-faq-section" :class="{'text-center': isMobile}">
        <h2 class="first-section-title">
          Frequently asked questions
        </h2>
        <div class="faq-grid" :class="{'text-left': !isMobile}">
          <div v-for="faqQuestion in faqQuestions" class="question-answer-container">
            <div class="question">{{faqQuestion.question}}</div>
            <div class="answer" v-html="faqQuestion.answer"></div>
          </div>
        </div>

      </div>
      <div class="call-to-action-section">
        <h2 class="my-12">Ready to impress your clients?</h2>
        <div class="plans-wrapper">

          <div class="plan-container recommended">
            <div class="plan-price">$0<span class="plan-price-interval">/month</span></div>
            <div class="plan-included-title mb-5">What is included?</div>
            <ul class="plan-included-list">
              <li><b>Simple store builder</b></li>
              <li><b>Customizable</b> store template</li>
              <li><b>Unlimited</b> files</li>
              <li><b>Customizable</b> previews</li>
              <li><b>Integrated checkout</b></li>
              <li><b>Instant & secure</b> file delivery</li>
              <li><b>Weekly</b> bank payouts</li>
              <li><b>Sales tracking & analytics</b></li>
            </ul>
            <a href="/register" class="plan-join-btn">Create my store for free</a>
          </div>
        </div>
      </div>
      <LandingFooter/>
    </main>
  </div>

</template>

<script>
  import LandingFooter from "./LandingFooter";
  import DemoVideoDialog from "./DemoVideoDialog";
  import {mapGetters, mapMutations} from 'vuex';
  import Benefit from "./Benefit";

  export default {
    components: {Benefit, DemoVideoDialog, LandingFooter},
    props: {
      hero: Object,
      benefits: Array,
      informationSections: Array,
      faqQuestions: Array
    },
    data() {
      return {
        introVideoDialogVisible: false
      }
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    },
    computed: {

      ...mapGetters('app', ['isMobile']),
    }
  }
</script>
<style lang="scss">
  @import "landing", "style/pages/sell-event-photos", "style/default";
</style>
