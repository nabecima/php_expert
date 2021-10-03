<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold" @click="$vuetify.goTo(0)"
        >PHP5技術者認定試験上級</v-toolbar-title
      >

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-select
          class="select"
          v-model="select"
          :items="items"
          label="Solo field"
          solo
        ></v-select>

        <div class="progress" v-if="loading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            absolute
            top
          ></v-progress-circular>
        </div>
        <v-expansion-panels focusable v-if="!loading">
          <template v-for="(item, i) in lists">
            <v-expansion-panel v-if="item.genre == select" :key="i">
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre>{{ item.result }}</pre>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-else-if="select == 'all'" :key="i">
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre>{{ item.result }}</pre>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>
        </v-expansion-panels>
        <v-btn
          fab
          large
          bottom
          right
          fixed
          color="primary"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      lists: [],
      items: ["all", "array", "string"],
      select: "all",
      loading: true,
    };
  },
  methods: {
    shuffle([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },

  mounted() {
    const CORS = "https://cors.bridged.cc/";
    axios
      .get(
        CORS +
          "https://script.google.com/macros/s/AKfycbyCOpkkPEkW30BgnWNq2V5uNrYd5406Yd4TkAQVq9-nhhN3ruXJo7cPxihifrhVceqA/exec"
      )
      .then((res) => {
        this.lists = this.shuffle(res.data);
        this.loading = false;
      });
  },
};
</script>
<style>
pre {
  line-height: 1.5;
  white-space: pre-wrap;
}

.select {
  width: 100px;
}

.progress {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style>
