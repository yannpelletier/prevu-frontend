import axios from 'axios';

export default {
	async load(context) {
		let res = await axios.get('https://api.exchangeratesapi.io/latest');

		let data = res.data;
		context.commit('setBaseCurrency', data.base);
		context.commit('setCurrencyRates', data.rates);
	},
}
