import User from '@/store/database/User';
import Asset from '@/store/database/Asset';

export default {
  actions: {
    async loadAuthenticatedUserAssets() {
      await Asset.api().get('/api/assets');
    },

    async createByFile(_, file) {
      try {
        let formData = new FormData();
        formData.append('file', file);

        let response = await Asset.api().post('/api/assets', formData);
        return response.entities.assets[0];
      } catch (e) {
        //Empty
      }
    },
    async deleteById(_, id) {
      Asset.delete(id);
      await Asset.api().delete(`/api/assets/${id}`);
    }
  },

  getters: {
    assetById: () => (id) =>  {
      let asset = Asset.find(id);
      return asset ? asset : null;
    },
    assetLinkById: () => (id) => {
      let asset = Asset.find(id);
      return asset ? asset.link : null;
    },

    authenticatedUserAssets() {
      let authUser = User.getters('authenticatedUser')('assets');
      return authUser ? authUser.assets : [];
    },
  },
};
