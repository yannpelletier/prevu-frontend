<template>
    <v-card>
        <v-card-title>
            Activity log
        </v-card-title>
        <v-card-text>
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">Ip address</th>
                    <th class="text-left">Country</th>
                    <th class="text-left">First Login</th>
                    <th class="text-left">Last Login</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in activity">
                    <td>{{ item.ipAddress }}</td>
                    <td>{{ item.country }}</td>
                    <td>{{ item.firstLogin }}</td>
                    <td>{{ item.lastLogin }}</td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "ActivityLog",
        computed: {
            ...mapState('user', ['activity']),
        },
    }
</script>

<style scoped>

</style>
