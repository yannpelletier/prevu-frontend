<template>
  <base-landing-page
    :hero="{
        header: 'Sell digital products on your very own store',
        subheader: 'Impress your clients with a clean and professional storefront.',
        image: './img/home/header-dashboard-digital-products.png',
        imageAlt: 'Prev-U dashboard shown on a computer',
        imageDesktopCustomCss: `margin-bottom: -50px !important;`
      }"

    :benefits="[
        {
          title: 'Save time',
          description: `Why waste time on building a site from scratch?
              A store editor automates the selling process and let's you focus on the
              fun part, impressing clients with amazing digital products.`,
          image: './img/landing/circular-clock.svg',
          imageAlt: 'clock'
        },
        {
          title: 'Save money',
          description: `When you want to sell digital downloads, you'd rather make money than spend
          it... right? We think so too. This is why it's free to open a store and sell as many files
          as you want.`,
          image: './img/landing/piggy-bank.svg',
          imageAlt: 'piggy bank'
        },
        {
          title: 'Look professional',
          description: `Having a well-crafted site has been shown to increase the odds of having new
              contracts with the client.`,
          image: './img/landing/camera.svg',
          imageAlt: 'camera'
        }
      ]"

    :informationSections="[
        {
          title: 'Build your store in under 5 minutes',
          description : `Create a beautiful store painlessly.
                Prev-U provides a great buying experience <b>optimized for both mobile and desktop
                users</b>.
                Customize the look and feel of your store to make it more consistent with your brand.`,
          demoButton: true,
          image: './img/event-photos/store-editor-1.jpg',
          imageAlt: 'Prev-U store editor with digital products'
        },
        {
          title: `Create an eye-catching product page`,
          description: `Whether you are selling an eBook, music samples or online courses,
          you need a product page that grabs the reader's attention. Upload a preview image, write
          a description and there you go! You will have a simple yet efficient product page
          ready to impress your future clients.`,
          image: './img/landing/placeholder.png'
        },
        {
          title: 'Simplify your clients\' checkout experience',
          description: `Your visitors will follow an easy and intuitive checkout flow. No need to worry about
              the delivery of your digital downloads to your customers. The products are
              <b>instantly sent by email and made available in their buyer dashboard</b>.`,
          link: {
            to: '/store/jordanmcchesney',
            text: 'See example store'
          },
          image: './img/landing/checkout-experience-2.jpg',
          imageAlt: 'Prev-U checkout page'
        },
      ]"

    :faqQuestions="[
        {
          question: 'What can I sell on Prev-U?',
          answer: `Prev-U supports selling mostly any type of file (e.g. PDF, EPUB, PNG, SVG, PSD,
          MP3). All the files are sold individually, through your Prev-U store.`
        },
        {
          question: 'What does it cost?',
          answer: `Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>,
          making it ideal for any freelancer, amateur or professional.
          For each sale with a basic account, there is a 7% + $0.30 transaction fee.`
        },
        {
          question: 'Is it secure?',
          answer: `Yes! Security is our top priority, starting from safely storing all digital goods.
Authentication is required to access all the digital copies purchased through your store.<br><br>
All the payments are powered by Stripe, a payment processor trusted by thousands of businesses.`
        },
        {
          question: 'How do I receive payments?',
          answer: `It is very easy to setup payouts. You will be redirected to Stripe's
          website where you can link your bank account. Then, you can track each payout easily.
          <br><br>
The payouts are sent directly to your bank account, without extra fees.
They are made on a daily schedule, with a 7-10 days delay.`
        }
      ]"
  />
</template>

<script>
  import BaseLandingPage from "./BaseLandingPage";

  export default {
    components: {BaseLandingPage}
  }
</script>
