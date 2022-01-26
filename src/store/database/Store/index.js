import {Model} from '@vuex-orm/core'
import {mapValues} from "lodash";

import User from '@/store/database/User'
import Product from '@/store/database/Product'

export default class Store extends Model {
  static get entity() {
    return 'stores'
  }

  static fields() {
    return {
      id: this.attr(null),
      slug: this.attr(''),
      currency: this.attr(''),
      name: this.attr(''),
      rootSections: this.attr({}),
      rootSectionsInfo: this.attr({}),
      products: this.hasMany(Product, 'storeId'),
      confirmed: this.attr(false),

      link: this.attr(''),

      userId: this.attr(null),
      user: this.belongsTo(User, 'userId'),

      pages: this.attr(1),
    }
  }

  getDefaultSection(sectionId) {
    let defaultVariant = this.rootSectionsInfo[sectionId].variants['default'];
    return {
      variant: 'default',
      parameters: mapValues(defaultVariant.parameters, (parameterInfo, parameterId) => {
        return parameterInfo.default;
      }),
    };
  }

  filterRootSections() {
    this.rootSections = mapValues(this.rootSectionsInfo, (sectionInfo, sectionId) => {
      let section = this.rootSections[sectionId];
      if(section){
        let sectionVariant = this.rootSections[sectionId].variant;
        let variantInfo = sectionInfo.variants[sectionVariant];
        if(variantInfo){

          return {
            variant: sectionVariant,
            parameters: mapValues(variantInfo.parameters, (parameterInfo, parameterId) => {
              let parameterValue = this.rootSections[sectionId].parameters[parameterId];
              return parameterValue !== undefined ? parameterValue : parameterInfo.default;
            }),
          }
        } else{
          return this.getDefaultSection(sectionId);
        }
      } else{
        return this.getDefaultSection(sectionId);
      }
    });
  }

  static afterCreate(model) {
    model.filterRootSections();
  }

  static beforeUpdate(model) {
    model.filterRootSections();
  }
}
