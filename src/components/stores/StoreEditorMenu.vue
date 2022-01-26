<template>
  <v-tabs v-if="editedStore" height="0">
    <v-tabs-items :value="currentViewedSection"  touchless>
      <v-tab-item value="root">
        <v-layout column>
          <v-list two-line>
            <v-list-item>
              <v-btn text @click="popSection()">
                <v-icon left>mdi-arrow-left</v-icon>
                Leave Editor
              </v-btn>
            </v-list-item>
            <v-list-item class="font-weight-bold">
              Store editor
            </v-list-item>
            <v-list-item>
              <v-text-field
                label="Url"
                prefix="https://prev-u.com/store/"
                v-model="editedStore.slug" outlined
                :error-messages="errors.slug"
              />
            </v-list-item>
            <v-list-item @click="pushSection(sectionKey)"
                         v-for="(section, sectionKey) in rootSectionsInfo"
                         :style="{'background-color': (errors.rootSections && errors.rootSections[sectionKey]) ? 'rgba(255,21,5,0.29)' : 'rgba(0,0,0,0)'}">
              <v-list-item-avatar>
                <v-icon>{{section.icon}}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{section.name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{section.description}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-spacer/>
          <v-list>
            <v-list-item>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" @click="saveStore">
                Save & publish
              </v-btn>
            </v-list-item>
            <v-list-item>
              Share
              <v-btn icon large color="primary" class="pa-0 ma-0" @click="openFacebookShare">
                <v-icon>mdi-facebook-box</v-icon>
              </v-btn>
              <v-btn icon large color="primary" class="pa-0 ma-0" @click="openTwitterShare">
                <v-icon>mdi-twitter-box</v-icon>
              </v-btn>
              <div class="flex-grow-1"></div>
              <external-link :to='editedStore.link'>View live store</external-link>
            </v-list-item>
          </v-list>
        </v-layout>
      </v-tab-item>
      <v-tab-item eager v-for="(section, sectionId) in rootSectionsInfo" :value="sectionId"
                  touchless>
        <v-list>
          <v-list-item class="ma-2">
            <v-btn text @click="popSection()">
              <v-icon left>mdi-arrow-left</v-icon>
              Back
            </v-btn>

          </v-list-item>
          <v-list-item class="font-weight-black">
            {{section.name}}
          </v-list-item>
          <v-list-item v-if="rootSectionVariantOptions(sectionId).length > 1">
            <v-select
              label="Variant"
              outlined
              :items="rootSectionVariantOptions(sectionId)"
              v-model="editedStore.rootSections[sectionId].variant"
              @change="onVariantUpdate"
            />
          </v-list-item>
          <v-list-item
            v-for="(parameter, parameterId) in rootSectionVariantsInfo(sectionId).parameters">
            <v-row class="align-center">
              <v-col :cols="isMobile ? 12 : 5" class="font-weight-light">
                {{parameter.name}}
              </v-col>
              <v-col :cols="isMobile ? 12 : 7" row>
                <v-text-field v-if="parameter.type === 'text' || parameter.type === 'link'"
                              :placeholder="parameter.example || parameter.default"
                              :counter="parameter.max"
                              solo
                              :error-messages="(errors.rootSections && errors.rootSections[sectionId] && errors.rootSections[sectionId].parameters[parameterId]) ? errors.rootSections[sectionId].parameters[parameterId] : null"
                              v-model="editedStore.rootSections[sectionId].parameters[parameterId]"
                />
                <asset-link-field v-if="parameter.type === 'asset'"
                                  :default="editedStore.rootSectionsInfo[sectionId].variants['default'].parameters[parameterId].default"
                                  v-model="editedStore.rootSections[sectionId].parameters[parameterId]"
                />
                <color-field v-if="parameter.type === 'rgb'"
                             v-model="editedStore.rootSections[sectionId].parameters[parameterId]"
                />
                <color-field alpha v-if="parameter.type === 'rgba'"
                             v-model="editedStore.rootSections[sectionId].parameters[parameterId]"
                />
                <v-switch v-if="parameter.type ==='boolean'"
                          v-model="editedStore.rootSections[sectionId].parameters[parameterId]"
                />
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
    import Store from "@/store/database/Store";
    import {mapGetters} from 'vuex';

    export default {
        name: "StoreEditorMenu",
        components: {
            ExternalLink: () => import('@/components/buttons/ExternalLink'),
            AssetLinkField: () => import('@/components/inputs/AssetLinkField'),
            ColorField: () => import('@/components/inputs/ColorField'),
        },
        watch: {
            editedStore: {
                handler() {
                    this.$emit('modified');
                },
                deep: true,
            },
        },
        methods: {
            saveStore() {
                this.$emit('saved');
            },

            onVariantUpdate() {
                this.editedStore.filterRootSections();
            },

            //Navigation functions
            pushSection(sectionId) {
                this.sectionStack.push(sectionId);
            },
            popSection() {
                if (this.sectionStack.length === 0) {
                    this.$emit('leave');
                } else {
                    this.sectionStack.pop();
                }
            },
            openFacebookShare() {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.editedStore.link}`, '_blank');
            },
            openTwitterShare() {
                window.open(`https://www.twitter.com/share?text=Check out my online store!&hashtags=prev-u&url=${this.editedStore.link}`, '_blank');
            },
        },
        props: {
            editedStore: {
                type: Object,
                required: true,
            },
            errors: {
                type: Object,
                default: {},
            }
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
            currentViewedSection() {
                if (this.sectionStack.length === 0) {
                    return 'root';
                } else {
                    return this.sectionStack[this.sectionStack.length - 1];
                }
            },
            rootSectionsInfo() {
                return this.editedStore.rootSectionsInfo;
            },


            rootSectionVariants() {
                return (sectionId) => {
                    return this.rootSectionsInfo[sectionId].variants;
                };
            },
            rootSectionVariantsInfo() {
                return (sectionId) => {
                    let sectionVariants = this.rootSectionVariants(sectionId);
                    let variantId = this.editedStore.rootSections[sectionId].variant;
                    return sectionVariants[variantId];
                };
            },
            rootSectionVariantOptions() {
                return (sectionId) => {
                    let sectionVariants = this.rootSectionVariants(sectionId);
                    return Object.keys(sectionVariants).map((variantId) => {
                        let variant = sectionVariants[variantId];
                        return {text: variant.name, value: variantId};
                    });
                };
            },
        },
        data() {
            return {
                sectionStack: [],
            };
        },
    }
</script>

<style scoped>

</style>
