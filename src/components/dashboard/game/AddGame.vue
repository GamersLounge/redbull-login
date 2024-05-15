<template>
  <v-dialog v-model="dialog" persistent max-width="600" scrim="transparent">
    <v-card >
      <v-card-title>Add Game</v-card-title>

      <v-card-text>
        <ErrorsInput :errors="gameErrors" />

        <v-form class="mt-5">
          <v-text-field v-model="form.name" label="Name"> </v-text-field>

          <v-text-field v-model="form.shortName" label="Short Name">
          </v-text-field>

          <v-text-field v-model="form.winPoints" label="Win Points">
          </v-text-field>

          <v-text-field v-model="form.losePoints" label="Lose Points">
          </v-text-field>

          <v-select
            label="Select"
            v-model="form.platform"
            :items="gameStore.platforms"
            variant="outlined"
          ></v-select>

          <FileInput v-model="form.image" :title="'Image'" />

          <FileInput v-model="form.logo" :title="'Logo'" />

          <!-- <v-switch
            v-model="form.isQueueable"
            label="isQueueable"
            hide-details
            inset
            color="primary"
          ></v-switch>

          <v-switch
            v-model="form.isActive"
            label="isActive"
            hide-details
            inset
            color="primary"
          ></v-switch> -->

          <v-textarea
            v-model="form.description"
            label="Description"
            class="mt-2"
          >
          </v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn @click="dialog = false" :loading="!gameStore.isGamesLoaded">
          Cancel
        </v-btn>

        <v-btn
          color="success"
          flat
          @click="submit"
          :loading="!gameStore.isGamesLoaded"
          variant="outlined"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Store
import { mapStores } from "pinia";
import { useGameStore } from "@stores/game.js";

// Form
import { Form } from "@helpers/form.js";

// Form
import FileInput from "@components/FileInput.vue";

export default {
  name: "AddGame",

  components: {
    FileInput,
  },

  data: () => ({
    dialog: false,
    form: new Form({
      name: "",
      shortName: "",
      winPoints: null,
      losePoints: null,
      platform: null,
      logo: null,
      image: null,
      // isQueueable: true,
      // isActive: true,
      description: null,
    }),

    gameErrors: [],
  }),

  computed: {
    ...mapStores(useGameStore),
  },

  methods: {
    openDialog() {
      this.dialog = true;
      this.form.name = "";
      this.form.shortName = "";
      this.form.winPoints = null;
      this.form.losePoints = null;
      this.form.platform = null;
      this.form.logo = null;
      this.form.image = null;

      // this.form.isQueueable = true;
      // this.form.isActive = true;
      this.form.description = null;
    },

    submit() {
      this.gameStore
        .createGame(this.form)
        .then((res) => {
          this.dialog = false;
        })
        .catch((err) => {
          this.gameErrors = [err.data.validation.body.message];
        });
    },
  },
};
</script>

<style scoped></style>
