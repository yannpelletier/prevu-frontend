<template>
  <base-landing-page
    :hero="{
        header: 'Create a beautiful store for your event photos',
        subheader: 'Sell photos of competitions, shows, weddings and more.',
        image: './img/event-photos/header-store-photo-3.png',
        mobileImage: './img/event-photos/header-store-photo-3-mobile.png',
        imageAlt: 'Picture of Fred\'s online photography shop with all of his event photos'
      }"

    :benefits="[
        {
          title: 'Save time',
          description: `Why waste time on building a site from scratch?
              A photo store automates the selling process and let's you focus on the
              fun part, impressing clients with amazing pictures.`,
          image: './img/landing/circular-clock.svg'
        },
        {
          title: 'Save money',
          description: `When you want to sell event photos, you'd rather make money than spend it...
           right? We think so too. This is why it's free to open a store and sell as many photos as
              you want.`,
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Look professional',
          description: `Having a well-crafted site has been shown to increase the odds of having new
              contracts with the client.`,
          image: './img/landing/camera.svg'
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
        },
        {
          title: `Want to protect your work?<br>
            We've got you covered.`,
          description: `<b>Upload your own logo</b> and simply add it to any product preview, that's it.
              This ensures that nobody has access to your original photos before
              paying.
              <div class='checkmarked-container'>
              <div class='checkmarked'>Blur</div>
              <div class='checkmarked'>Pixelization</div>
              <div class='checkmarked'>Watermark</div>
              </div>`,
            video: './img/landing/filter-demo-1.mp4'
        },
        {
          title: 'Simplify your clients\' checkout experience',
          description: `Your visitors will follow an easy and intuitive checkout flow. No need to worry about
              the delivery of your
              digital books to your customers. The eBooks are <b>instantly sent by email and
              made available in their buyer dashboard</b>.`,
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
          answer: `All file type you might want to use for photos are permitted on Prev-U. For
          instance, you can sell your photos in these formats : JPEG, PNG, BMP, etc. However,
          some image formats do not support automatic previews right now (e.g. RAW formats).`
        },
        {
          question: 'What does it cost?',
          answer: `Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>,
          making it ideal for any photographer, amateur or professional.
          For each sale with a basic account, there is a 7% + $0.30 transaction fee.`
        },
        {
          question: 'Is it secure?',
          answer: `Yes! Security is our top priority, starting from safely storing all photos.
              Authentication is required to access all the original products and visitors can only
              see a lower quality preview.<br><br>All the payments are powered by Stripe,
              a payment processor trusted by thousands of businesses.`
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
