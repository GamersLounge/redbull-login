<template>
  <v-file-input
    ref="uploadInput"
    type="file"
    accept="image/*"
    :label="title"
    hide-details
    @change="browseImages"
    @click:clear="removeImage"
  />
</template>

<script>
export default {
  name: "FileInput",

  props: {
    // eslint-disable-next-line vue/require-default-prop
    modelValue: { type: File },
    title: { type: String, default: "Image" },
    displayInfo: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },

  emits: ["update:modelValue"],

  methods: {
    // Browse local images and emit them to the parent
    browseImages(event) {
      const image = event.target.files[0];
      // console.log(image);

      if (!image) return;

      // Emit images to parent
      this.$emit("update:modelValue", image);

      // Reset the input field, so we can re-add the same file
      // eslint-disable-next-line no-param-reassign
      event.target.value = "";
    },

    // Remove the image and emit changes
    removeImage() {
      // Emit images changes to parent
      this.$emit("update:modelValue", null);
    },
  },
};
</script>

<style scoped></style>
