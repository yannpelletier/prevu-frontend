<template>
  <v-container>
    <v-layout justify-center>
      <v-card width="1200" class="pa-6">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card-title>We'd love to hear from you!</v-card-title>
            <v-divider class="mx-4 my-2"/>
            <v-card-text>
              Send us a message and we'll respond as soon as possible.
              <v-form class="mt-3" @submit.prevent="sendContact">
                <v-text-field
                  outlined
                  required
                  v-model="email"
                  label="Email"></v-text-field>
                <v-text-field
                  outlined
                  v-model="fullName"
                  label="Full name"></v-text-field>
                <v-textarea
                  outlined
                  required
                  v-model="message"
                  label="message"></v-textarea>
                <v-btn type="submit" large color="primary" :loading="loading">Send message</v-btn>
              </v-form>

            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-title>Thank you!</v-card-title>
            <v-card-text>Your message has been sent to our team!</v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "Contact",
        data() {

            return {
                email: '',
                fullName: '',
                message: '',
                loading: false,
                tab: 0
            }
        },
        methods: {
            async sendContact() {
                this.loading = true;
                try {
                    await this.$store.dispatch('contacts/sendContact', {
                        email: this.email,
                        fullName: this.fullName,
                        message: this.message
                    });
                    this.tab = 1;
                } catch (e) {
                    this.$error("Error", e.errors.message[0]);
                }
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>
