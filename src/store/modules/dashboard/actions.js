import api from '@/api';

export default {
	async loadSales(context) {
    let sales = await api.get('/api/users/me/sales');
    context.commit('setSales', {sales: sales.data});
	},
}
