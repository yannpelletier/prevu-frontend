import {Model} from '@vuex-orm/core'

import User from '@/store/database/User'

export default class Watermark extends Model {
  static get entity() {
    return 'watermarks'
  }

  static fields() {
    return {
      id: this.attr(null),
      link: this.attr(''),
      name: this.attr(''),
      position: this.attr(''),
      dimension: this.attr(''),

      userId: this.attr(null),
      user: this.belongsTo(User, 'userId'),
    }
  }
}
