import {Model} from '@vuex-orm/core'

import User from '@/store/database/User'

export default class Notification extends Model {
  static get entity() {
    return 'notifications'
  }

  static fields() {
    return {
      id: this.attr(null),
      description: this.attr(null),
      date: this.attr(null),
      read: this.attr(false),

      userId: this.attr(null),
      user: this.belongsTo(User, 'userId'),
    }
  }
}
