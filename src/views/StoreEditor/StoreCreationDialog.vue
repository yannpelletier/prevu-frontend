<template>
  <v-dialog persistent :value="dialog" width="500">
    <v-card class="text-center">
      <template v-if="!success">
        <v-card-title class="flex justify-center">
          <h3 class="text-center">Create your store</h3>
        </v-card-title>
        <v-card-text class="flex justify-center">
          <div class="flex justify-center">
            <v-form class="flex justify-center" @submit.prevent="requestStoreCreation">
              <v-text-field
                prefix="prev-u.com/store/"
                placeholder="my-store"
                style="margin: 10px 10%"
                ref="input"
                :error-messages="this.errors.slug"
                v-model="slug"
              />
              <v-btn type="submit" color="primary" class="mb-4" :loading="loading">
                Create my store
              </v-btn>
              <br/>
              <router-link to="/dashboard">Not now</router-link>
            </v-form>
          </div>
        </v-card-text>
      </template>
      <template v-else>
        <v-card-title class="flex justify-center">
          <h3 class="text-center">Congratulations!</h3>
        </v-card-title>
        <v-card-text>
          Your store has been created. You can now start personalizing it.
          <v-btn color="primary" @click="dialog=false" class="mt-4">Close</v-btn>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
    import Store from "@/store/database/Store";

    export default {
        name: "StoreCreationDialog",
        data() {
            return {
                dialog: true,
                slug: '',
                errors: {},
                loading: false,
                success: false
            }
        },
        methods: {
            async requestStoreCreation() {
                this.loading = true;
                try {
                    await Store.dispatch('createBySlug', {
                        slug: this.slug
                    });
                    this.success = true;
                    this.errors = {};
                } catch (e) {
                    this.errors = e.errors;
                }
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>
