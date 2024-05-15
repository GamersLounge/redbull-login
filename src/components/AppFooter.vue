<template>

  <v-footer app>

    <v-row align="center">

      <v-col>
        <span class="text-caption font-weight-bold">Gamers Lounge - 2024</span>
      </v-col>

      <v-col cols="auto" class="text-right">

        <v-btn icon="mdi-facebook" class="mx-2" variant="plain" density="comfortable" :ripple="false"></v-btn>
        <v-btn icon="mdi-twitter" class="mx-2" variant="plain" density="comfortable" :ripple="false"></v-btn>
        <v-btn icon="mdi-linkedin" class="mx-2" variant="plain" density="comfortable" :ripple="false"></v-btn>

      </v-col>
    </v-row>

  </v-footer>

</template>

<script>

export default {
  name: "AppFooter"
}

</script>
