<template></template>

<script>
    import User from '@/store/database/User';
    import Notification from "@/store/database/Notification";
    import Product from "@/store/database/Product";

    export default {
        name: "Broadcaster",
        computed: {
            isAuthenticated() {
                return User.getters('isAuthenticated');
            },
            currentUser() {
                return this.isAuthenticated ? User.getters('authenticatedUser')() : null;
            },
        },
        methods: {
            onNotification(notification) {
                Notification.dispatch('notifyNewNotification');
            },
            onCompilationStateChanged(data) {
                Product.update({
                    data: {
                        id: data.id,
                        compilationState: data.newCompilationState,
                    }
                });
            }
        },
        watch: {
            isAuthenticated(value) {
                if(value === true){
                    this.$echo.private(`users.${this.currentUser.id}`)
                        .notification(this.onNotification)
                        .listen('.product.compilationStateChanged', this.onCompilationStateChanged);
                } else{
                    this.$echo.private(`users.${this.currentUser.id}`).disconnect();
                }
            },
        }
    }
</script>
