import api from '@/api';

export default {
  async sendFeedback(context, {message}) {
    await api.post('/api/feedback', {
      message
    });
  }
}
