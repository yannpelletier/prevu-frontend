import {Model} from '@vuex-orm/core'

import User from '@/store/database/User'

export default class Asset extends Model {
  static get entity() {
    return 'assets'
  }

  static fields() {
    return {
      id: this.attr(null),
      link: this.attr(''),
      userId: this.attr(null),
      user: this.belongsTo(User, 'userId'),
    }
  }
}
