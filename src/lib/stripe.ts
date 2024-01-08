import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

//STRIPE_API_KEY= sk_test_51OWMGpLwwYwt25wL06RKnErGV2MpBllAHona6HIjjRaZyxGvzBGrJSzbqgHqcoekMZzUABz5wsrPrmLSUZJGfTRP00uvlH2Rod
