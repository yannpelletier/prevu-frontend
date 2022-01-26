<template>
  <base-landing-page
    :hero="{
        header: 'Sell Art Online',
        subheader: 'Sell Art Through Your Own Professional Store.',
        mobileImage: './img/art/header-store-art.png',
        imageAlt: 'Picture of Maggie\'s online Prev-U store with all of het artwork'
      }"

    :benefits="[
        {
          title: 'Save time',
          description: `Why waste time on building a site from scratch?
              An online store automates the selling process and let's you focus on the
              fun part, creating amazing artwork and impressing your clients.`,
          image: './img/landing/circular-clock.svg'
        },
        {
          title: 'Save money',
          description: `When you want to sell art online, you'd rather make money than spend it...
           right? We think so too. This is why it's free to open a store and sell as many files as
              you wish.`,
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Look professional',
          description: `We believe digital art deserves the same beautiful galleries
          as much as physical art pieces. Prev-U's stores have a minimalist design that can
          be customized with your color palette.`,
          image: './img/landing/camera.svg'
        }
      ]"

    :informationSections="[
        {
          title: 'Build your store in under 5 minutes',
          description : `Create a beautiful store painlessly.
                Prev-U provides a great buying experience <b>optimized for both mobile and desktop
                users</b>.
                Customize the look and feel of your store to make it consistent with your art style.`,
          demoButton: true,
          image: './img/art/store-editor-art.png',
          imageAlt: 'Store editor on Prev-U for a store of artwork'
        },
        {
          title: `Want to protect your work?<br>
            We've got you covered.`,
          description: `<b>Upload your own logo</b> and simply add it to any product preview, that's it.
              This ensures that nobody has access to your original files before
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
              the delivery of your files to your customers.
              The image files are <b>instantly sent by email and
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
          answer: `All file type you might want to use for digital art are allowed on Prev-U. For
          instance, you can upload the following formats : PSD, JPEG, PNG, PDF, TIFF, etc.`
        },
        {
          question: 'What does it cost?',
          answer: `Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>,
          making it ideal for any artist, amateur or professional.
          For each sale with a basic account, there is a 7% + $0.30 transaction fee.`
        },
        {
          question: 'Is it secure?',
          answer: `Yes! Security is our top priority, starting from safely storing all files.
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
