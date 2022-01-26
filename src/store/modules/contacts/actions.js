import api from '@/api';

export default {
  async sendContact(context, {message, email, fullName}) {
    await api.post('/api/contact', {message, email, fullName});
  }
}
