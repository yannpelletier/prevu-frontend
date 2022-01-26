<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <change-password></change-password>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <notifications></notifications>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ChangePassword from "./Settings/ChangePassword";
    import ActivityLog from "./Settings/ActivityLog";
    import Notifications from "./Settings/Notifications";
    import Currencies from "./Settings/Currencies";

    export default {
        name: "Settings",
        components: {Notifications, Currencies, ActivityLog, ChangePassword}
    }
</script>

<style scoped>

</style>
