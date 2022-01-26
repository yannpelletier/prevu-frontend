<template>
  <v-container fluid>
    <input v-show="false" @change="onUpload" ref="inputUpload" type="file"/>
    <v-row>
      <v-col sm="12" md="7">
        <v-data-table
          :loading="loading"
          @click:row="selectWatermark"
          single-select
          hide-default-footer
          hide-default-header
          v-model="selected"
          :headers="headers"
          :items="watermarks"
          item-key="id"
          no-data-text="No custom watermarks"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white" class="mb-2">
              <v-btn @click="$refs.inputUpload.click()" color="primary">
                Add a new watermark
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.thumbnail="{ item }">
            <v-img :src="item.link" eager class="my-4" width="100" height="50"
                   contain></v-img>
          </template>
          <template v-slot:item.name="{ item }">
            <span class="">{{item.name}}</span>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn icon v-if="item.userId !== null" @click="requestDeleteWatermark(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
      <v-col sm="12" md="5">
        <v-card class="justify-center">
          <v-container fluid v-if="selected.length === 0">
            Select a watermark to edit
          </v-container>
          <v-container v-else>
            <v-pagination
              v-model="previewIndex"
              :length="previewImages.length"
              circle
            ></v-pagination>
            <v-container fluid grid-list-xs class="text-xs-center">
              <span>{{selectedPreviewImage.text}}</span>
              <live-product-preview
                :max-canvas-height="450"
                :watermark-id="selectedWatermark.id"
                :src="selectedPreviewImage.src"
              ></live-product-preview>
            </v-container>
            <v-container fluid>
              <v-text-field label="Name"
                            v-model="selectedWatermark.name"
                            @blur="onWatermarkChange"
                            outlined></v-text-field>
              <v-select label="Position"
                        :items="positions"
                        v-model="selectedWatermark.position"
                        @change="onWatermarkChange"
                        outlined></v-select>
              <v-select label="Dimension"
                        :items="dimensions"
                        v-model="selectedWatermark.dimension"
                        @change="onWatermarkChange"
                        outlined></v-select>
            </v-container>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import LiveProductPreview from '@/components/products/LiveProductPreview';

    import Watermark from "@/store/database/Watermark";

    export default {
        name: "Watermark",
        components: {
            LiveProductPreview
        },
        methods: {
            async onUpload(event) {
                if (event.target.files.length) {
                    try {
                        let newWatermark = await Watermark.dispatch('createByFile', event.target.files[0]);
                    } catch (e) {
                        this.$error("Error", e.errors.file[0]);
                    }

                    event.target.value = null;
                }
            },
            async requestDeleteWatermark(watermark) {
                if (await this.$confirm("Delete", "Are you sure you want to delete this watermark?", {agreeText: 'Yes', cancelText: 'Cancel'})) {
                    this.loading = true;
                    await Watermark.dispatch('deleteById', watermark.id);
                    this.selected = [];
                    this.loading = false;
                }
            },
            selectWatermark(watermark) {
                this.selected = [watermark];
            },
            onWatermarkChange() {
                if(this.selectedWatermark){
                    Watermark.dispatch('updateById', {
                        id: this.selectedWatermark.id,
                        data: {
                            name: this.selectedWatermark.name,
                            position: this.selectedWatermark.position,
                            dimension: this.selectedWatermark.dimension,
                        },
                    });
                }
            }
        },
        data() {
            return {
                headers: [
                    {text: 'Thumbnail', value: 'thumbnail', align:'left', width: 100},
                    {text: 'Name', value: 'name', align: 'left', width:100},
                    {Text: 'Actions', value: 'action', align: 'end'},
                ],
                previewImages: [
                    {text: 'Fall Forest', src: require('@/assets/preview-images/fall-forest.jpg')},
                    {text: 'Jungle King', src: require('@/assets/preview-images/jungle-king.jpg')},
                    {
                        text: 'Savanna Sunset',
                        src: require('@/assets/preview-images/savanna-sunset.jpg')
                    },
                    {
                        text: 'Mushroom Field',
                        src: require('@/assets/preview-images/mushroom-field.jpg')
                    },
                    {
                        text: 'Forest Rail Track',
                        src: require('@/assets/preview-images/rail-forest.jpg')
                    },
                    {
                        text: 'Snowy Moutains',
                        src: require('@/assets/preview-images/snowy-moutains.jpeg')
                    },
                    {text: 'Starstruck', src: require('@/assets/preview-images/starstruck.jpg')},
                ],
                positions: [
                    {text: 'Top Left', value: 'top-left'},
                    {text: 'Top Right', value: 'top-right'},
                    {text: 'Bottom Left', value: 'bottom-left'},
                    {text: 'Bottom Right', value: 'bottom-right'},
                    {text: 'Center', value: 'center'},
                ],
                dimensions: [
                    {text: 'Keep Dimensions', value: 'same'},
                    {text: 'Fill Width', value: 'fill-width'},
                    {text: 'Fill Height', value: 'fill-height'},
                    {text: 'Fill Both', value: 'fill-both'},
                ],
                selected: [],
                previewIndex: 1,
                loading: false,
            }
        },
        computed: {
            watermarks() {
                return Watermark.getters('authenticatedUserWatermarks');
            },
            selectedWatermark() {
                return this.selected[0];
            },
            selectedPreviewImage() {
                return this.previewImages[this.previewIndex - 1];
            },
        },
    }
</script>

<style scoped>

</style>
