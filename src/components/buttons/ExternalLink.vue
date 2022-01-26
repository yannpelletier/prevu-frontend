<template>
    <div>
        <v-flex class="link-container">
            <a :href="this.to" target="_blank" rel="noopener">
                <slot></slot>
                <v-icon small class="ml-1" color="primary">mdi-open-in-new</v-icon>
            </a>
        </v-flex>
    </div>
</template>

<script>
    export default {
        name: "ExternalLink",
        props: {
            to: {
                type: String,
                default: '/'
            },
        }
    }
</script>

<style lang="scss" scoped>
    .link-container {
        font-size: medium;
        transition: 0.25s;
        &:hover {
            opacity: 0.6;
        }
        a {
            text-decoration: none;
        }
    }
</style>
