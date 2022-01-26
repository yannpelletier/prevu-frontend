import User from '@/store/database/User';
import Purchase from '@/store/database/Purchase';

import api from '@/api'

export default {
  actions: {
    async loadAuthenticatedUserPurchases() {
      await Purchase.api().get('/api/purchases');
    },

    async makePurchase(context, {products, cardToken}) {
      let response = await api.post('/api/purchases', {
        card_token: cardToken,
        product_ids: products.map(product => product.id)
      });
    },
  },

  getters: {
    authenticatedUserPurchases(state) {
      let authUser = User.getters('authenticatedUser')('purchases');
      return authUser ? authUser.purchases : [];
    },
  }
};
