import User from '@/store/database/User';
import Watermark from '@/store/database/Watermark';

export default {
  actions: {
    async loadAuthenticatedUserWatermarks() {
      await Watermark.api().get('/api/watermarks');
    },

    async createByFile(_, file) {
      let formData = new FormData();
      formData.append('file', file);

      let response = await Watermark.api().post('/api/watermarks', formData);
      return response.entities.watermarks[0];
    },
    async updateById(_, {id, data}) {
      await Watermark.api().patch(`/api/watermarks/${id}`, data);
    },
    async deleteById(_, id) {
      await Watermark.api().delete(`/api/watermarks/${id}`, {delete: id});
    }
  },

  getters: {
    watermarkById: () => (id) => {
      let watermark = Watermark.find(id);
      return watermark ? watermark : null;
    },
    watermarkLinkById: () => (id) => {
      let watermark = Watermark.find(id);
      return watermark ? watermark.link : null;
    },

    authenticatedUserWatermarks() {
      let authUser = User.getters('authenticatedUser')('watermarks');
      return authUser ? authUser.watermarks : [];
    },
    defaultWatermarks(){
      return Watermark.query().where('userId', null).get();
    }
  },
};
