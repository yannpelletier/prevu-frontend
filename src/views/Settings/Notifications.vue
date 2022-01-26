<template>
  <v-card>
    <v-card-title>
      Notifications
    </v-card-title>
    <v-card-text>
      <v-list-item-group multiple>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="sendSaleNotifications" color="primary"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Sale notifications
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="sendIpNotifications" color="primary"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              New IP Notifications
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-card-text>
  </v-card>
</template>

<script>
    import User from '@/store/database/User';

    export default {
        name: "Notifications",
        computed: {
            authenticatedUser() {
                return User.getters('authenticatedUser')();
            },
            sendSaleNotifications: {
                get() {
                    return this.authenticatedUser.sendSaleNotifications;
                },
                set(value) {
                    User.dispatch('updateAuthenticated', {
                        sendSaleNotifications: value,
                    });
                },
            },
            sendIpNotifications: {
                get() {
                    return this.authenticatedUser.sendIpNotifications;
                },
                set(value) {
                    User.dispatch('updateAuthenticated', {
                        sendIpNotifications: value,
                    });
                },
            },
        },
    }
</script>

<style scoped>

</style>
