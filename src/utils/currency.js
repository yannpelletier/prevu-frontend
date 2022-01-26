export default {
	formatPrice(price, currency) {
		try {
			let priceInDollar = Math.floor(price) / 100;
			return (new Intl.NumberFormat(navigator.language, {
				style: 'currency',
				currency: currency
			}).format(priceInDollar));
		} catch (err) {
			return price + '';
		}
	},
}