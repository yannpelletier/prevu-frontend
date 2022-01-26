<template>
  <v-menu width="470" @input="loadNotifications" :close-on-content-click="false" left offset-y>
    <template v-slot:activator="{ on }">
      <v-badge color="red" overlap left>
        <template v-slot:badge>
          <span v-if="unreadNotificationsCount > 0">{{unreadNotificationsCount}}</span>
        </template>
        <v-btn icon large v-on="on">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-card width="470" max-height="400px">
      <v-card-title>
        Notifications
        <v-spacer/>
        <v-btn
          width="100px"
          @click="clearNotifications"
          v-if="notifications.length > 0"
          color="primary"
          outlined
        >
          Clear All
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0 ma-0">
        <v-card v-if="loading" height="100" class="d-flex justify-center">
          <v-progress-circular indeterminate size="64" color="grey"></v-progress-circular>
        </v-card>
        <v-card class="py-0" v-else>
          <v-list three-line v-if="notifications.length > 0">
            <template v-for="(notification, index) in notifications">
              <v-list-item @click=""
                           :class="{'primary': !notification.read, 'lighten-3': !notification.read}">
                <v-list-item-content>
                  <v-list-item-content>{{notification.description}}</v-list-item-content>
                  <v-list-item-subtitle>{{notification.date}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
          <div class="pa-4" v-else>
            You currently have no notifications.
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
    import Notification from "@/store/database/Notification";

    export default {
        name: "NotificationsButton",
        computed: {
            notifications() {
                return Notification.getters('authenticatedUserNotifications');
            },
            unreadNotificationsCount() {
                return Notification.getters('authenticatedUserUnreadNotificationsCount');
            },
        },
        methods: {
            async loadNotifications(value) {
                if (value === true) {
                    this.loading = true;
                    await Notification.dispatch('loadNotifications');
                    this.loading = false;
                }
            },
            async clearNotifications() {
                if (this.notifications.length > 0) {
                    this.loading = true;
                    await Notification.dispatch('clearNotifications');
                    this.loading = false;
                }
            },
        },
        data() {
            return {
                loading: false,
            };
        },
    }
</script>
