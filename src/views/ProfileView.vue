<template>
  <ProfilePreview v-if="!isEditing" />

  <ProfileEditing v-else />
</template>

<script>
import { mapState } from "pinia";
import { useProfileStore } from "@stores";

import ProfilePreview from "@components/profile/Preview.vue";
import ProfileEditing from "@components/profile/Editing.vue";

export default {
  name: "ProfileView",
  setup() {},
  components: {
    ProfilePreview,
    ProfileEditing,
  },

  data: () => ({}),

  computed: {
    ...mapState(useProfileStore, ["isEditing"]),
  },

  methods: {},

  created() {},
};
</script>
