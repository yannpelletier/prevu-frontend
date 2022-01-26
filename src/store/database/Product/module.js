import User from '@/store/database/User';
import Store from '@/store/database/Store';
import Product from '@/store/database/Product';

export default {
  state: {
    cart: [],
  },

  mutations: {
    setCart(state, cart) {
      state.cart = cart;
      cart.forEach(id => {
        Product.update({where: id, data: {inCart: true}});
      });
    },
    addToCart(state, id) {
      state.cart = [...state.cart, id];
      Product.update({where: id, data: {inCart: true}});
      localStorage.cart = JSON.stringify(state.cart);
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(currentId => id !== currentId);
      Product.update({where: id, data: {inCart: false}});
      localStorage.cart = JSON.stringify(state.cart);
    },
  },

  actions: {
    async loadCart({commit}) {
      if (localStorage.cart) {
        let cart = JSON.parse(localStorage.cart);
        if (cart) {
          commit('setCart', cart);
        }
      }
    },

    async loadAuthenticatedUserProducts({dispatch}) {
      await Product.api().get(`/api/products`);
    },
    async loadStoreProductsBySlug({dispatch}, slug) {
      await Product.api().get(`/api/stores/${slug}/products`);
      await dispatch('loadCart');
    },

    async createByFiles(_, {files, uploadProgressCallback}) {
      let uploadProgresses = [];
      uploadProgresses.fill(0, 0, files.length);

      return await Promise.all(files.map(async (file, i) => {
        let formData = new FormData();
        formData.append('file', file);

        let response = await Product.api().post('/api/products', formData,
          {
            onUploadProgress: (progressEvent) => {
              uploadProgresses[i] = Math.round(progressEvent.loaded / progressEvent.total);
              let totalProgress = 100 * (uploadProgresses.reduce((total, progress) => total + progress, 0) / uploadProgresses.length);
              uploadProgressCallback(totalProgress);
            }
          });
        return response.entities.products[0];
      }));
    },
    async updateById(_, {id, data}) {
      await Product.api().patch(`/api/products/${id}`, data);
    },
    async deleteById(_, id) {
      await Product.api().delete(`/api/products/${id}`, {delete: id});
    },

    async addToCartById({commit, state}, id) {
      if (!state.cart.includes(id)) {
        commit('addToCart', id);
      }
    },
    async toggleCartProductById({commit, state}, id) {
      if (!state.cart.includes(id)) {
        commit('addToCart', id);
      } else {
        commit('removeFromCart', id);
      }
    }
  },

  getters: {
    authenticatedUserProducts() {
      let authUser = User.getters('authenticatedUser')('products');
      return authUser ? authUser.products : [];
    },
    authenticatedUserStoreProducts() {
      let authUser = User.getters('authenticatedUser')('products', (query) => {
        query.where('compilationState', 'compiled');
      });
      return authUser ? authUser.products : [];
    },
    currentStoreProducts() {
      let currentStore = Store.getters('currentStore')('products', (query) => {
        query.where('compilationState', 'compiled');
      });
      return currentStore ? currentStore.products : [];
    },
    currentStoreCart() {
      let currentStore = Store.getters('currentStore')();
      return currentStore ? Product.query().where('storeId', currentStore.id).where('inCart', true).all() : [];
    },
    currentStoreProductBySlug: () => (slug) => {
      let currentStore = Store.getters('currentStore')();
      return currentStore ? Product.query().where('storeId', currentStore.id).where('slug', slug).first() : {};
    },
  }
}
