import {Model} from '@vuex-orm/core'

import Asset from '@/store/database/Asset'
import Product from '@/store/database/Product'
import Notification from '@/store/database/Notification'
import Purchase from '@/store/database/Purchase'
import Store from '@/store/database/Store'
import Watermark from "@/store/database/Watermark";

export default class User extends Model {
  static get entity() {
    return 'users'
  }

  static fields() {
    return {
      id: this.attr(null),
      authenticated: this.attr(false),
      firstName: this.attr(''),
      lastName: this.attr(''),
      email: this.attr(''),
      country: this.attr(''),
      stripeConnectId: this.attr(''),
      stripeCustomerId: this.attr(''),
      sendSaleNotifications: this.boolean(false),
      sendIpNotifications: this.boolean(false),
      firstTimeLogin: this.boolean(false),
      analyticsCurrency: this.attr(''),
      saleCurrency: this.attr(''),
      analytics: this.attr(null),
      confirmed: this.attr(false),
      unreadNotifications: this.attr(0),
      sellerProgression: this.attr({
        createdStore: false,
        addedProducts: false,
        completedPayoutsSetup: false
      }),

      products: this.hasMany(Product, 'userId'),
      purchases: this.hasMany(Purchase, 'buyerId'),
      assets: this.hasMany(Asset, 'userId'),
      notifications: this.hasMany(Notification, 'userId'),
      watermarks: this.hasMany(Watermark, 'userId'),
      store: this.hasOne(Store, 'userId'),
    }
  }
}
