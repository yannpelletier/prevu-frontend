import { set, toggle } from '@/utils/vuex'

export default {
  setInitiated: set('initiated'),
  setLoading: set('loading'),
  setDrawer: set('drawer'),
  toggleDrawer: toggle('drawer')
}
