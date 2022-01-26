<template>
  <base-landing-page
    :hero="{
        header: 'Sell Podcasts Online Directly to Your Customers',
        subheader: 'Sell Podcasts on Your Own Online Store.',
        image: './img/event-photos/header-store-photo-3.png',
        mobileImage: './img/event-photos/header-store-photo-3-mobile.png',
      }"

    :benefits="[
        {
          title: 'Save time',
          description: `Why waste time on building a site from scratch?
              An online store automates the selling process and let's you focus on the
              fun part, recording great podcasts and connecting with your audience.`,
          image: './img/landing/circular-clock.svg'
        },
        {
          title: 'Save money',
          description: `When you want to sell podcasts, you'd rather make money than spend it...
           right? We think so too. This is why it's free to open a store and sell as many designs as
              you want.`,
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Look professional',
          description: `Having a professional-looking website is quite important for any brand.
          Having a minimalist and easy-to-use store for your podcasts will make your customers
          trust you and come back for more!`,
          image: './img/landing/camera.svg'
        }
      ]"

    :informationSections="[
        {
          title: 'Build your store in under 5 minutes',
          description : `Create a beautiful store painlessly.
                Prev-U provides a great buying experience <b>optimized for both mobile and desktop
                users</b>.
                Customize the look and feel of your store to make it more consistent with your
                personal or professional brand.`,
          demoButton: true,
          image: './img/event-photos/store-editor-1.jpg',
        },
        {
          title: `Create an eye-catching product page for your podcasts`,
          description: `Whether you are selling an educational podcast, a lifestyle podcast or a
          politics podcast, you need a product page that grabs the reader's attention.
          Upload a cover image, write a summary of your podcast and there you go! You will have
          a simple yet efficient product page ready to impress your future listeners.`,
            video: './img/landing/filter-demo-1.mp4'
        },
        {
          title: 'Simplify your clients\' checkout experience',
          description: `Your visitors will follow an easy and intuitive checkout flow. No need to worry about
              the delivery of your audio files to your customers.
              The design files are <b>instantly sent by email and
              made available in their buyer dashboard</b> after a purchase.`,
          link: {
            to: '/store/jordanmcchesney',
            text: 'See example store'
          },
          image: './img/landing/checkout-experience-2.jpg'
        },
      ]"

    :faqQuestions="[
        {
          question: 'What can I sell on Prev-U?',
          answer: `All file type you might want to use for audio recordings can be sold on Prev-U.
          For instance, you can sell podcasts with the following file formats: MP3, WAV, OGG, etc.`
        },
        {
          question: 'What does it cost?',
          answer: `Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>,
          making it ideal for any podcaster, amateur or professional.
          For each sale with a basic account, there is a 7% + $0.30 transaction fee.`
        },
        {
          question: 'Is it secure?',
          answer: `Yes! Security is our top priority, starting from safely storing all files.
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
