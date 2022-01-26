<template>
  <div>
    <main>
      <div class="nav-bar-container">
        <div class="nav-bar">
          <div class="logo-wrapper">
            <img draggable="false" alt="Prev-U logo" class="nav-bar-logo"
                 :src="require('@/assets/prev-u_full_300x77.png')">

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
                   style="display:flex; align-items: center; justify-content: center; "
                   class="pl-5"
                   :class="{'text-center': isMobile, 'mb-10': !isMobile}"
            >
              <div>
                <h1 style="font-weight: 400;">Sell digital products on your very own store</h1>
                <h2 class="mt-4">
                  Impress your clients with a clean and professional storefront.
                </h2>
                <a href="/register" class="start-selling-btn mt-5">
                  Get started - it's free
                </a>
              </div>
            </v-col>
            <v-col cols="12" md="7" style="display:flex; align-items: center;">
              <v-img v-if="isMobile"
                     eager
                     alt="Prev-U store shown on a computer." style="width: 100%"
                     :src="require('./img/event-photos/header-store-photo-3-mobile.png')"
              />
              <v-img v-else
                     eager
                     alt="Prev-U store shown on a computer."
                     style="width: 100%; margin-bottom: -122px"
                     :src="require('./img/event-photos/header-store-photo-3.png')"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-row class="ma-auto" style="max-width: 1400px">
          <v-col cols="12" md="4" class="d-flex align-center flex-column pr-7">
            <v-img
              :src="require('./img/landing/circular-clock.svg')"
              max-width="50" max-height="50"
            />
            <h2 class="my-5">Save time</h2>
            <p class="text-justify">
              Why waste time on building a site from scratch?
              A store editor automates the selling process and let's you focus on the
              fun part, impressing clients with amazing products.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="d-flex align-center flex-column px-7">
            <v-img
              :src="require('./img/landing/piggy-bank.svg')"
              max-width="50" max-height="50"
            />
            <h2 class="my-5">Save money</h2>
            <p class="text-justify">
              When you want to sell photos, you'd rather make money than spend it... right?
              We think so too. This is why it's free to open a store and sell as many photos as
              you want.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="d-flex align-center flex-column pl-7">
            <v-img
              :src="require('./img/landing/camera.svg')"
              max-width="50" max-height="50"
            />
            <h2 class="my-5">Look professional</h2>
            <p class="text-justify">
              Having a well-crafted site has been shown to increase the odds of having new
              contracts with the client.
            </p>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <div class="information-section">
          <div class="information-section-image-container">
            <v-img
              class="information-section-image"
              :src="require('./img/event-photos/store-editor-1.jpg')"
            />
          </div>
          <div class="information-section-text-zone">
            <h3 class="information-section-title">
              Build your store in under 5 minutes
            </h3>
            <div class="information-section-text">
              Create a beautiful store painlessly.
              Prev-U provides a great buying experience <b>optimized for both mobile and desktop
              users</b>.
              Customize the look and feel of your store to make it more cohesive with your brand.
            </div>
            <demo-video-dialog>
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
      <v-container>
        <div class="information-section reversed">
          <div class="information-section-image-container">
            <v-lazy>
              <video class="information-section-image" id="filter-demo-video" muted autoplay loop>
                <source :src="require('./img/landing/filter-demo-1.mp4')" type="video/mp4">
              </video>
            </v-lazy>
          </div>
          <div class="information-section-text-zone">
            <h3 class="information-section-title">
              Want to protect your work?<br>
              We've got you covered.
            </h3>
            <div class="information-section-text">
              <b>Upload your own logo</b> and simply add it to any product preview, that's it.
              This ensures that nobody has access to your original photos before
              paying.
              <div class="checkmarked-container">
                <div class="checkmarked">Blur</div>
                <div class="checkmarked">Pixelization</div>
                <div class="checkmarked">Watermark</div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
      <v-container>
        <div class="information-section">
          <div class="information-section-image-container">
            <v-img
              alt="Screenshot of the payment page on Prev-U"
              class="information-section-image"
              :src="require('./img/landing/checkout-experience-2.jpg')"
            />
          </div>
          <div class="information-section-text-zone">
            <h3 class="information-section-title">
              Simplify your clients' checkout experience
            </h3>
            <div class="information-section-text">
              Your visitors will follow an easy and intuitive checkout flow. No need to worry about
              the
              delivery of
              your
              digital downloads to your customers. The products are <b>instantly sent by email and
              made
              available in
              their buyer
              dashboard</b>.
            </div>
            <v-btn outlined large class="mt-5" to="/store/jordanmcchesney" color="primary">
              See example store
            </v-btn>
          </div>
        </div>
      </v-container>
      <!--<div class="information-section reversed">
        <div class="information-section-image-container">
          <img alt="Screenshot of the sales graph on the Prev-U dashboard"
               class="information-section-image"
               :src="require('./img/landing/graph2.jpg')"/>
        </div>
        <div class="information-section-text-zone">
          <h3 class="information-section-title">
            Understand your clients
          </h3>
          <div class="information-section-text">
            Easily keep track of every transactions and visits your store has.
          </div>
        </div>
      </div>-->
      <div class="bottom-section"></div>
      <!--<div class="information-section">
          <div class="information-section-image-container">
              <img alt="A handshake" class="information-section-image" src="/img/landing/establish-trust-compressed.jpg"/>
          </div>
          <div class="information-section-text-zone">
              <h3 class="information-section-title">
                  Establish trust
              </h3>
              <div class="information-section-text">
                  At Prev-U, we believe online freelancing is the future of business. By enabling item protection with
                  previews,
                  we want to make any online trade as transparent as it can be. Minimize disputes and maximize your sales.
              </div>
          </div>
      </div>-->

      <div class="landing-faq-section" :class="{'text-center': isMobile}">
        <h2 class="first-section-title">
          Frequently asked questions
        </h2>
        <div class="faq-grid" :class="{'text-left': !isMobile}">
          <div class="question-answer-container">
            <div class="question">
              What can I sell on Prev-U?
            </div>
            <div class="answer">
              Prev-U supports selling any type of file (e.g. PDF, EPUB, PNG, SVG, PSD, MP3).
              All the files are sold individually, through your Prev-U store.
            </div>
          </div>
          <div class="question-answer-container">
            <div class="question">
              What does it cost?
            </div>
            <div class="answer">
              Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>, making
              it ideal for any
              photographer, amateur or professional. For each sale with a basic account, there is a
              7% + $0.30
              transaction fee.
            </div>
          </div>
          <div class="question-answer-container">
            <div class="question">
              Is it secure?
            </div>
            <div class="answer">
              Yes! Security is our top priority, starting from safely storing all photos.
              Authentication is required to access all the original products and visitors can only
              see a
              lower
              quality preview.<br><br>
              All the payments are powered by Stripe, a payment processor trusted
              by
              thousands of
              businesses.
            </div>
          </div>
          <div class="question-answer-container">
            <div class="question">
              How do I receive payments?
            </div>
            <div class="answer">
              It is very easy to setup payouts. You will be redirected to Stripe's website
              where you can link your bank account. Then, you can track each payout easily.
              <br><br>
              The payouts are sent directly to your bank account, without extra fees.
              They are made on a daily schedule, with a 7-10 days delay.
            </div>
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

  export default {
    components: {DemoVideoDialog, LandingFooter},
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
<style lang="scss" scoped>
  @import "landing", "style/pages/sell-event-photos", "style/default";
</style>
