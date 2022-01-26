<template>
	<v-card>
		<v-card-title>
			Currencies
		</v-card-title>
		<v-card-text>
			<v-select label="Analytics Currency" v-model="analyticsCurrency" :items="currencyList" outlined></v-select>
			<v-select label="Sale Currency" v-model="saleCurrency" :items="currencyList" outlined></v-select>
		</v-card-text>
	</v-card>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'Currencies',
    computed: {
        ...mapGetters('currencies', ['currencyList']),
        saleCurrency: {
            get() {
                return this.$store.state.user.saleCurrency;
            },
            set(value) {
                this.$store.dispatch('user/patch', {
                    saleCurrency: value,
                })
            },
        },
        analyticsCurrency: {
            get() {
                return this.$store.state.user.analyticsCurrency;
            },
            set(value) {
                this.$store.dispatch('user/patch', {
                    analyticsCurrency: value,
                })
            },
        },
    },
	};
</script>
