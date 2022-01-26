<template>
    <base-landing-page
      :hero="{
        header: 'Sell Printables Online',
        subheader: 'Sell digital printables on your own clean and professional store.',
        image: './img/event-photos/header-store-photo-3.png',
        mobileImage: './img/event-photos/header-store-photo-3-mobile.png',
      }"

      :benefits="[
        {
          title: 'Save time',
          description: `Let's be real, it takes time to find a profitable niche. Why waste time
              building a site from scratch?
              Focus on creating great content while we make sure you have the storefront
              you deserve.`,
          image: './img/landing/circular-clock.svg'
        },
        {
          title: 'Save money',
          description: `You'd rather make money selling printables than spend it... right?
              We think so too. This is why it's free to open a store on Prev-U.`,
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Look professional',
          description: `Whether you like it or not, first impressions matter tremendously in business,
          especially online.
          Make the quality of your online store reflect the quality of your work.`,
          image: './img/landing/camera.svg'
        }
      ]"

      :informationSections="[
        {
          title: 'Build your store in under 5 minutes',
          description : `Create a beautiful store painlessly.
Customize the look and feel of your store to make it more consistent with your brand.
                Prev-U provides a great buying experience <b>optimized for both mobile and desktop
                users</b>.
                `,
          demoButton: true,
          image: './img/landing/placeholder.png',
        },
        {
          title: `Create an eye-catching product page`,
          description: `Whether you are selling stickers, meal planners or coloring sheets,
          you need a product page that grabs the customers's attention. The good news is that it's
          quite simple with Prev-U. Upload a cover image, write a description, set a price and
          there you go! You will have a simple yet efficient product page ready to impress your
          future customers.`,
          image: './img/landing/placeholder.png'
        },
        {
          title: 'Simplify your clients\' checkout experience',
          description: `Your visitors will follow an easy and intuitive checkout flow.
              No need to worry about the delivery of your printables to your customers.
              The products are <b>instantly sent by email and
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
          answer: `Printables have become a great way to earn a passive income online. There are
          plenty of printables you can sell. For example, calendar planners, meal planners, templates,
          diet planners, etc. These can be uploaded through image files, PDFs or word document. Most
          file formats can be sold on Prev-U.`
        },
        {
          question: 'What does it cost?',
          answer: `Prev-U's basic account is free to use. It has <b>no setup or monthly fee</b>,
          making it ideal for any freelancer, amateur or professional.
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
