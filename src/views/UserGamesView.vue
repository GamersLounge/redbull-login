<template>
    <v-container>
        <h1 class="text-center">Games</h1>
        <v-row justify="center" align="center">
            <v-col v-for="(game, index) in games" :key="index" cols="12" md="4">
                <v-card @click="onCardClick(game.name)" class="mx-auto" max-width="400">
                    <v-img :src="game.image" height="200px"></v-img>
                    <v-card-title>{{ game.name }}</v-card-title>
                    <v-card-text>{{ game.description }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            games: [
                { name: "Game 1", description: "Description of Game 1", image: "https://via.placeholder.com/400x200" },
                { name: "Game 2", description: "Description of Game 2", image: "https://via.placeholder.com/400x200" },
                { name: "Game 3", description: "Description of Game 3", image: "https://via.placeholder.com/400x200" }
            ]
        };
    },
    methods: {
        onCardClick(gameName) {
            alert(`Clicked on ${gameName}`);
        }
    }
};
</script>

<style scoped>
.text-center {
    text-align: center;
}
</style>