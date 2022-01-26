export default {
  loggedInRedirect: '/dashboard',
  loggedOutRedirect: '/home',
  routes: [
    //SELLER APP PATHS BEGIN
    {
      path: '/',
      name: 'App',
      props: true,
      component: () => import('@/apps/seller/View'),
      children: [
        {
          path: 'dashboard',
          meta: {
            title: 'Dashboard',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/Dashboard')
        },
        {
          path: 'home',
          meta: {
            title: 'Home',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/Home')
        },
        {
          path: 'about',
          meta: {
            title: 'About Us',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/About')
        },
        {
          path: 'contact',
          meta: {
            title: 'Contact Us',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/Contact')
        },
        {
          path: 'faq',
          meta: {
            title: 'FAQ',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/Faq')
        },
        {
          path: 'google-sign-in-callback',
          meta: {
            hideDefaultNavigation: true,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/GoogleSignInCallback')
        },
        {
          path: 'not-found',
          meta: {
            title: 'Page Not Found',
            hideDefaultNavigation: true,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/NotFound')
        },
        {
          path: 'payouts-setup-complete',
          meta: {
            title: 'Payout Setup Complete',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/PayoutsSetupComplete')
        },
        {
          path: 'products',
          meta: {
            title: 'Products',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/Products')
        },
        {
          path: 'watermarks',
          meta: {
            title: 'Watermarks',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/Watermarks')
        },
        {
          path: 'purchases',
          meta: {
            title: 'Purchases',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/Purchases')
        },
        {
          path: 'login',
          meta: {
            title: 'Login',
            hideHorizontalPadding: true,
            hideDefaultNavigation: false,
            availableLoggedIn: false,
            availableLoggedOut: true,
          },
          component: () => import('@/views/Login')
        },
        {
          path: 'register',
          meta: {
            title: 'Register',
            hideHorizontalPadding: true,
            hideDefaultNavigation: false,
            availableLoggedIn: false,
            availableLoggedOut: true,
          },
          component: () => import('@/views/Register')
        },
        {
          path: 'forgot-password',
          meta: {
            title: 'Forgot Password',
            hideHorizontalPadding: true,
            hideDefaultNavigation: false,
            availableLoggedIn: false,
            availableLoggedOut: true,
          },
          component: () => import('@/views/ForgotPassword')
        },
        {
          path: 'reset-password/:token',
          props: true,
          meta: {
            title: 'Reset Password',
            hideHorizontalPadding: true,
            hideDefaultNavigation: false,
            availableLoggedIn: false,
            availableLoggedOut: true,
          },
          component: () => import('@/views/ResetPassword')
        },
        {
          path: 'settings',
          meta: {
            title: 'Settings',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/Settings')
        },
        {
          path: 'terms-of-use',
          meta: {
            title: 'Terms of Use',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/TermsPages/TermsOfUse')
        },
        {
          path: 'terms-for-sellers',
          meta: {
            title: 'Terms For Sellers',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/TermsPages/TermsForSellers')
        },
        {
          path: 'terms-for-buyers',
          meta: {
            title: 'Terms For Buyers',
            hideDefaultNavigation: false,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/views/TermsPages/TermsForBuyers')
        },
        {
          path: 'store-editor',
          meta: {
            title: 'Store Editor',
            hideDefaultNavigation: true,
            hideDefaultFooter: true,
            availableLoggedIn: true,
            availableLoggedOut: false,
          },
          component: () => import('@/views/StoreEditor')
        },

        //LANDING PAGE PATHS BEGIN
        {
          path: 'sell-event-photos',
          meta: {
            title: 'Sell event photos',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellEventPhotos')
        },
        {
          path: 'sell-ebooks',
          meta: {
            title: 'Sell eBooks on Your Online Store',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellEbooks')
        },
        {
          path: 'sell-pdf',
          meta: {
            title: 'Sell PDFs on Your Online Store',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellPdf')
        },
        {
          path: 'sell-courses-online',
          meta: {
            title: 'Sell Courses Online Like a Pro',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellCourses')
        },
        {
          path: 'sell-printables',
          meta: {
            title: 'Sell Printables Online',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellPrintables')
        },
        {
          path: 'sell-graphic-designs',
          meta: {
            title: 'Sell Graphic Designs Online',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellGraphicDesigns')
        },
        {
          path: 'sell-art-online',
          meta: {
            title: 'Sell Art Online',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellArt')
        },
        {
          path: 'sell-digital-magazines',
          meta: {
            title: 'Sell Digital Magazines Directly to Your Readers',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellDigitalMagazines')
        },
        {
          path: 'sell-podcasts',
          meta: {
            title: 'Sell Podcasts Online Directly to Your Customers',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellPodcasts')
        },
        {
          path: 'sell-wordpress-themes-plugins',
          meta: {
            title: 'Sell your Wordpress Plugins & Themes',
            hideDefaultNavigation: true,
            availableLoggedIn: false,
            availableLoggedOut: true,
            hideDefaultFooter: true
          },
          component: () => import('@/views/LandingPages/SellWordpressPluginsThemes')
        },
      ],
    },

    //STORE APP PATHS BEGIN
    {
      path: '/store/:storeSlug/',
      props: true,
      component: () => import('@/apps/store/View'),
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            hideDefaultNavigation: true,
            hideDefaultFooter: true,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/apps/store/pages/home/Home'),
        },
        {
          path: 'checkout',
          name: 'checkout',
          props: true,
          meta: {
            hideDefaultNavigation: true,
            hideDefaultFooter: true,
            availableLoggedIn: true,
            availableLoggedOut: true,
          },
          component: () => import('@/apps/store/pages/Checkout'),
        },
      ],
    },
  ],
};
