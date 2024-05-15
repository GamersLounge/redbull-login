<template>
  <v-dialog v-model="dialog" persistent max-width="600" scrim="transparent">
    <v-card>
      <v-card-title>Set Score</v-card-title>

      <v-card-text>
        <ErrorsInput :errors="scoreErrors" />

        <v-form class="mt-5">
          <!-- <v-text-field v-model="form.score" label="Score"> </v-text-field> -->

          <v-text-field v-model="score" label="Score"> </v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn @click="dialog = false" :loading="!scoreStore.isScoresLoaded">
          Cancel
        </v-btn>

        <v-btn
          color="success"
          flat
          @click="submit"
          :loading="!scoreStore.isScoresLoaded"
          variant="outlined"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useScoreStore } from "@stores/score.js";

// Form
import { Form } from "@helpers/form.js";

export default {
  name: "ScoreDialog",

  components: {},

  data: () => ({
    dialog: false,

    userId: null,
    gameId: null,
    score: "",

    scoreErrors: [],
  }),

  computed: {
    ...mapStores(useScoreStore),
  },

  methods: {
    openDialog(data) {
      this.dialog = true;
      this.score = data.score;

      this.userId = data.userId;
      this.gameId = data.gameId;
    },

    submit() {
      this.scoreStore
        .setScore({
          gameId: this.gameId,
          userId: this.userId,
          data: { score: this.score },
        })
        .then((res) => {
          this.dialog = false;
        })
        .catch((err) => {
          this.scoreErrors = [err.data.validation.body.message];
        });
    },
  },
};
</script>

<style scoped></style>
