<template>
    <v-container v-if="!isGameSelected">
        <h1 class="text-center">Games</h1>
        <v-row justify="center" align="center">
            <v-col v-for="(game, index) in games" :key="index" cols="12" md="4">
                <v-card @click="onCardClick(index)" class="mx-auto" max-width="400">
                    <img :src="game.image" style="width: 400px; height: 400px;" />
                    <v-card-title>{{ game.name }}</v-card-title>
                    <v-card-text>{{ game.description }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- Conditionally render the selected game component -->
    <div v-else>
        <first-game v-if="selectedGame === 0" @go-back="goBack" />
        <second-game v-if="selectedGame === 1" @go-back="goBack" />
    </div>
</template>

<script>
import firstGame from '@/components/FirstGame.vue';
import secondGame from '@/components/SecondGame.vue';

export default {
    components: { firstGame, secondGame },
    data() {
        return {
            isGameSelected: false, // Control whether a game is selected
            selectedGame: null,    // Holds the index of the selected game
            games: [
                { name: "Amazing Track", description: "Ball tracking", image: "/amazing-track.png" },
                { name: "Nodulus", description: "Nodulus", image: "/nodulus.png" },
                // { name: "Game 3", description: "Description of Game 3", image: "https://via.placeholder.com/400x200" }
            ]
        };
    },
    methods: {
        onCardClick(index) {
            this.selectedGame = index;
            this.isGameSelected = true;
        },
        goBack() {
            this.isGameSelected = false;
            this.selectedGame = null;
        },
    }
};
</script>

<style scoped>
.text-center {
    text-align: center;
}
</style>
