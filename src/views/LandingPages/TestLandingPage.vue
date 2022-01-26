<template>
    <base-landing-page
      :hero="{
        header: 'My header',
        subheader: 'My subheder',
        image: './img/event-photos/header-store-photo-3.png',
        mobileImage: './img/event-photos/header-store-photo-3-mobile.png',
      }"

      :benefits="[
        {
          title: 'Eat well',
          description: 'bla',
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Eat well',
          description: 'bla',
          image: './img/landing/piggy-bank.svg'
        },
        {
          title: 'Eat well',
          description: 'bla',
          image: './img/landing/piggy-bank.svg'
        }
      ]"

      :informationSections="[
        {
          title: 'Build your store in under 5 minutes',
          description : `Create a beautiful store painlessly.
                Prev-U provides a great buying experience <b>optimized for both mobile and desktop
                users</b>.
                Customize the look and feel of your store to make it more cohesive with your brand.`,
          demoButton: true,
          image: './img/event-photos/store-editor-1.jpg',
        },
        {
          title: `Want to protect your work?<br>We've got you covered.`,
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
              digital downloads to your customers. The products are <b>instantly sent by email and
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
          answer: `We handle png, jpeg and gif formats for now. We will soon add other file types.
          We are open to suggestions from the community!`
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
Authentication is required to access all the original products and
visitors can only see a lower quality preview.<br><br>
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
