<template>
  <v-card width="300" :loading="loading">
    <v-dialog v-model="showDialog" max-width="1200">
      <v-card>
        <v-card-title>
          My Assets
        </v-card-title>
        <v-card-text>
          <v-card color="grey lighten-2 pa-3" v-if="hasAssets">
            <v-row no-gutters class="align-center">
              <v-col v-for="(asset, index) in pageAssets" :key="index" :cols="isMobile ? 6 : 2">
                <v-card @click="selectAsset(asset)" class="ma-2">
                  <v-img contain eager class="grey darken-4" :src="asset.link" height="150"/>
                </v-card>
                <v-btn @click="deleteAsset(asset)" dark width="100%" text>
                  Delete
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-card color="grey lighten-2" class="display-2 font-weight-light" height="500" v-else>
            You have no uploaded assets
          </v-card>
        </v-card-text>
        <v-card-actions v-if="hasAssets">
          <v-pagination
            v-model="page"
            :length="pageNumber"
          ></v-pagination>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div>
      <v-card tile color="grey lighten-2" height="150">
        <v-img :src="assetSrc" eager contain width="100%" height="100%"/>
      </v-card>
    </div>
    <div>
      <v-row no-gutters v-if="showRemove">
        <v-col no-gutters cols="12">
          <v-btn width="100%" dark v-on:click="removeAsset">
            <v-icon class="mr-2">
              mdi-file-remove
            </v-icon>
            Remove
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters v-else-if="hasAssets">
        <v-col no-gutters cols="9">
          <v-btn width="100%" color="blue" dark tile @click="$refs.inputUpload.click()">
            <v-icon class="mr-2">
              mdi-cloud-upload
            </v-icon>
            {{buttonLabel}}
            <input v-show="false" @change="onUpload" ref="inputUpload" type="file"/>
          </v-btn>
        </v-col>
        <v-col no-gutters cols="3">
          <v-btn width="100%" color="blue" dark tile @click="displayDialog">
            <v-icon color="white">
              mdi-image-search
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters v-else-if="!hasAssets">
        <v-col no-gutters cols="12">
          <v-btn width="100%" color="blue" dark tile @click="$refs.inputUpload.click()">
            <v-icon class="mr-2">
              mdi-cloud-upload
            </v-icon>
            {{buttonLabel}}
            <input v-show="false" @change="onUpload" ref="inputUpload" type="file"/>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
    import Asset from '@/store/database/Asset';
    import {mapGetters} from 'vuex';

    const DESKTOP_PAGE_LENGTH = 18;
    const MOBILE_PAGE_LENGTH = 4;

    export default {
        name: "AssetField",
        props: {
            value: Number,
            defaultSrc: {
                type: String,
                default: undefined,
            },
            showDefault: {
                type: Boolean,
                default: false,
            },
            buttonLabel: {
                type: String,
                default: "Upload",
            },
        },
        data() {
            return {
                showDialog: false,
                page: 1,
                loading: false,
            };
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
            assets() {
                return Asset.getters('authenticatedUserAssets');
            },

            hasAssets() {
                return this.assets.length > 0;
            },
            pageNumber() {
                let pageLength = this.isMobile ? MOBILE_PAGE_LENGTH : DESKTOP_PAGE_LENGTH;
                return Math.ceil(this.assets.length / pageLength);
            },
            pageAssets() {
                let pageLength = this.isMobile ? MOBILE_PAGE_LENGTH : DESKTOP_PAGE_LENGTH;

                let beginIndex = (this.page - 1) * pageLength;
                let endIndex = (this.page) * pageLength;
                return this.assets.slice(beginIndex, endIndex);
            },

            assetSrc() {
                return this.value ? Asset.getters('assetLinkById')(this.value) : this.defaultSrc;
            },

            showRemove() {
                return this.assetSrc !== this.defaultSrc;
            },
        },
        methods: {
            displayDialog() {
                this.showDialog = true;
            },

            removeAsset() {
                let newValue = null;
                this.$emit('input', newValue);
            },
            selectAsset(asset) {
                let newValue = asset.id;
                this.$emit('input', newValue);
                this.showDialog = false;
            },
            async onUpload(event) {
                this.loading = true;
                let newAsset = await Asset.dispatch('createByFile', event.target.files[0]);
                let newValue = newAsset.id;
                this.$emit('input', newValue);
                this.loading = false;
            },

            deleteAsset(asset) {
                Asset.dispatch('deleteById', asset.id);
            },
        }
    }
</script>

<style scoped>
  .no-selection {
    width:100%;
    text-align: center;
    border: 3px dotted gray;
  }
</style>
