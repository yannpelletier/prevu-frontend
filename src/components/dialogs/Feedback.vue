<template>
  <div class="text-center">
    <v-dialog
      v-model="feedbackDialog"
      width="500"
      @click:outside="setFeedbackDialog(false)"
      persistent
    >
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-card-title
              primary-title
            >
              Send Feedback
            </v-card-title>

            <v-card-text>
              <v-textarea placeholder="Feedback about this page?" v-model="message" outlined/>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn
                color="primary"
                text
                @click="sendFeedback(message)"
                :loading="loading"
              >
                Send feedback
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-title>Thank you!</v-card-title>
            <v-card-text>Your feedback has been sent to our team!</v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn
                color="primary"
                text
                @click="setFeedbackDialog(false)"
                :loading="loading"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-dialog>
  </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "Feedback",
        data() {
            return {
                message: '',
                loading: false,
                tab: 0
            }
        },
        computed: {
            ...mapState('feedbacks', ['feedbackDialog'])
        },
        methods: {
            ...mapMutations('feedbacks', ['setFeedbackDialog']),
            async sendFeedback(message) {
                this.loading = true;
                try {
                    await this.$store.dispatch('feedbacks/sendFeedback', {message});
                    this.tab = 1;
                } catch (e) {
                    this.$error("Error", e.errors.message[0]);
                }
                this.loading = false;
            }

        },
    }
</script>

<style scoped>

</style>
