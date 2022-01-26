export default {
	currencyList(state) {
		return Object.keys(state.currencyRates);
	},
}