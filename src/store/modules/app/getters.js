import vuetify from '@/plugins/vuetify'

export default {
	isMobile() {
		return vuetify.framework.breakpoint.smAndDown;
	},
  isLoading(state) {
	  return state.loading;
  }
}
