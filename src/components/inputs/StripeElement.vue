<template>
  <div>
    <card
      v-if="stripeLibraryLoaded"
      slot=""
      class="stripe-card"
      :stripe="config.stripePublishableKey"
      :options="stripeOptions"
    />
  </div>
</template>

<script>
  import {Card} from 'vue-stripe-elements-plus';
  import {mapGetters} from 'vuex';

  export default {
    name: "StripeElement",
    components: {Card},
    computed: {
      ...mapGetters('env', ['config'])
    },
    props: {
      textColor: {
        type: String,
        default: '#32325d'
      },
      placeholderColor: {
        type: String,
        default: '#aab7c4'
      }
    },
    data() {
      return {
        stripeLibraryLoaded: false,
        stripeOptions: {
          style: {
            base: {
              color: this.textColor,
              fontFamily: 'Roboto',
              fontSmoothing: 'antialiased',
              fontSize: '18px',
              fontWeight: 300,
              '::placeholder': {
                color: this.placeholderColor
              }
            },
            invalid: {
              color: 'red',
              iconColor: 'red'
            }
          }
        }
      }
    },
    mounted() {
      let stripeScript = document.createElement('script');
      stripeScript.setAttribute('src', 'https://js.stripe.com/v3/');
      document.head.appendChild(stripeScript);
      stripeScript.onload = () => {
        this.stripeLibraryLoaded = true;
      };
    }
  }
</script>

<style lang="scss" scoped>
  .stripe-card {
  }
</style>
<style lang="scss">
  .StripeElement {
    position: relative;
    line-height: 20px;
    padding: 8px 0 8px;

    &:before {
      border-width: thin 0 0 0;
      border-color: rgba(0, 0, 0, 0.42);
    }

    &:before, &:after {
      bottom: -1px;
      content: "";
      left: 0;
      position: absolute;
      border-style: solid;
      -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      width: 100%;
    }

    &:after {
      border-color: #0098FF;
      border-width: thin 0 thin 0;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
    }
  }

  .StripeElement--focus {
    &:before {
      border-width: thin 0 0 0;
      border-color: rgba(0, 0, 0, 0.42);

    }

    &:after {
      border-style: solid;
      transform: scaleX(1);
    }
  }
</style>
