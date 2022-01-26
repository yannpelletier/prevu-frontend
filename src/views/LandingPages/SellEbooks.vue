<template>
    <base-landing-page
      :hero="{
        header: 'Sell EBooks Online Like a Pro',
        subheader: 'On your own clean and professional store.',
        mobileImage: './img/ebooks/header-store-ebooks.png',
        imageAlt: 'Picture of Aaron\'s eBook store hosted on Prev-U'
      }"

      :benefits="[
        {
          title: 'Save time',
          description: `Why waste time building a site from scratch?
              Focus on writing while we make sure you have the storefront
              you deserve.`,
          image: './img/landing/circular-clock.svg'
        },
        {
          title: 'Save money',
          description: `When you want to sell eBooks, you'd rather make money than spend it... right?
              We think so too. This is why it's free to open a store on Prev-U.`,
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Look professional',
          description: `Whether you like it or not, first impressions matter tremendously in business.
           Make the quality of your online store reflect the quality of your writing.`,
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
          image: './img/ebooks/store-editor-ebooks.png',
          imageAlt: 'Store editor on Prev-U for a store of eBooks'
        },
        {
          title: `Create an eye-catching product page`,
          description: `Whether you are selling a fiction book, a recipe book or a training plan,
          you need a product page that grabs the reader's attention. Upload a cover image, write
          your book summary and there you go! You will have a simple yet efficient product page
          ready to impress your future readers.`,
          image: './img/landing/placeholder.png'
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
          answer: `Any file type you might want to use for eBooks are permitted on Prev-U. For
          instance, you can sell your eBook in these formats : PDF, ePub, MOBI, etc.`
        },
        {
          question: 'What does it cost?',
          answer: `Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>,
          making it ideal for any writer, amateur or professional.
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
