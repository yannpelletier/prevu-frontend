import {Model} from '@vuex-orm/core'

import User from '@/store/database/User'
import Asset from '@/store/database/Asset'
import currencyUtils from '@/utils/currency';

export default class Product extends Model {
  static get entity() {
    return 'products'
  }

  static fields() {
    return {
      id: this.attr(null),
      slug: this.attr(''),
      inCart: this.attr(false),
      fileId: this.attr(''),
      extension: this.attr(''),
      name: this.attr(''),
      description: this.attr(''),
      price: this.attr(0),
      currency: this.attr(''),
      infos: this.attr({}),
      views: this.attr(0),
      addToCarts: this.attr(0),
      sales: this.attr(0),
      filters: this.attr({}),
      filtersInfo: this.attr({}),
      compilationState: this.string("draft"),

      storeId: this.attr(''),

      original: this.attr(''),
      preview: this.attr(''),
      publicThumbnail: this.attr(''),
      privateThumbnail: this.attr(''),
      customThumbnailId: this.attr(null),
      thumbnailType: this.attr(null),

      link: this.attr(''),
      path: this.attr(''),

      userId: this.attr(null),
      user: this.belongsTo(User, 'userId'),

      error: this.attr(''),
    }
  }

  get formattedPrice () {
    return currencyUtils.formatPrice(this.price, this.currency);
  }
}
