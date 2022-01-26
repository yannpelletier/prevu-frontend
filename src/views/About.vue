<template>
    <div>
        <v-container>
            <v-layout justify-center>
                <v-card width="1200" class="pa-6">
                    <v-card-title class="title-about">
                        About us
                    </v-card-title>
                    <v-card-text class="text-about">
                        <v-divider></v-divider>
                        <h3 class="mt-4 mb-2">
                            Giving creative freelancers and small businesses a safe way to trade online
                        </h3>
                        <p>
                            Prev-U was founded by two young developers from Québec City, Canada, Yann Pelletier and
                            Frédéric Fortier-Chouinard.
                        </p>
                        <p>
                            They idea came up as they were looking to advertise their services on a freelance service
                            marketplace. They soon realized that there were many recurring problems with traditional
                            marketplaces. Freelancers receiving smaller payments than expected, hidden fees, abusive
                            contracts, etc.
                        </p>
                        <p>
                            To make online freelancing mainstream, the first step is to bring trust to the process. But
                            how is it possible to make strangers, possibly thousands of kilometers away, trust each
                            other?
                        </p>
                        <p>
                            In order to create a completely transparent selling system, we needed to find a balance
                            between making sure that the customer is satisfied with the digital product while not giving
                            away the original.
                        </p>
                        <h3 class="mt-8 mb-2">Our core values</h3>
                        <ul>
                            <li>Fair treatment of the seller & buyer</li>
                            <li>Provide a great user experience</li>
                            <li>Customization</li>
                            <li>Transparency</li>
                            <li>Security</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-container>
    </div>
</template>
<style lang="scss" scoped>
    .title-about {
        font-size: 24pt;
        line-height: 40pt;
    }

    .text-about {
        line-height: 20pt;
        font-size: 12pt;
    }

    .text-about *:not(h3) {
        color: #2e2e2e;
    }

    li {
        line-height: 25pt;
    }

    h3 {
        font-size: 20pt;
        line-height: 37pt;
        font-weight: 300;
        color: #819dc7;
    }
</style>
