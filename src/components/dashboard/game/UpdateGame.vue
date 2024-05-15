<template>
  <v-dialog v-model="dialog" persistent max-width="600" scrim="transparent">
    <v-card>
      <v-card-title>Update Game</v-card-title>

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

          <FileInput v-model="image" :title="'Image'" />

          <FileInput v-model="logo" :title="'Logo'" />

          <v-switch
            v-model="form.isQueueable"
            label="isQueueable"
            hide-details
            inset
            color="light-blue"
          ></v-switch>

          <v-switch
            v-model="form.isActive"
            label="isActive"
            hide-details
            inset
            color="light-blue"
          ></v-switch>

          <v-switch
            v-model="form.isDoubled"
            label="isDoubled"
            hide-details
            inset
            color="light-blue"
          ></v-switch>

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
          Update
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
    gameId: null,
    form: new Form({
      name: "",
      shortName: "",
      winPoints: null,
      losePoints: null,
      platform: null,
      isQueueable: true,
      isActive: true,
      isDoubled: true,
      image: null,
      logo: null,
      description: null,
    }),
    image: null,
    logo: null,

    gameErrors: [],
  }),

  computed: {
    ...mapStores(useGameStore),
  },

  methods: {
    openDialog(game) {
      this.dialog = true;

      this.gameId = game.id;
      this.form.name = game.name;
      this.form.shortName = game.shortName;
      this.form.winPoints = game.winPoints;
      this.form.losePoints = game.losePoints;
      this.form.platform = game.platform;
      this.form.isQueueable = game.isQueueable;
      this.form.isActive = game.isActive;
      this.form.isDoubled = game.isDoubled;
      this.form.description = game.description;

      delete this.form.image;
      delete this.form.logo;
    },

    submit() {
      let formData = this.form;

      if (this.image) {
        formData.image = this.image;
      }
      if (this.logo) {
        formData.logo = this.logo;
      }
      this.gameStore
        .updateGame({
          formData: formData,
          gameId: this.gameId,
        })
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
