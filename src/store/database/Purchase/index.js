import {Model} from '@vuex-orm/core'

import User from '@/store/database/User'

export default class Product extends Model {
  static get entity() {
    return 'purchases'
  }

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      description: this.attr(''),
      price: this.attr(0),
      date: this.attr(0),

      original: this.attr(''),
      thumbnail: this.attr(''),
      download: this.attr(''),

      buyerId: this.attr(null),
      buyer: this.belongsTo(User, 'buyerId'),
    }
  }
}
