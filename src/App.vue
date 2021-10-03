<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold" @click="$vuetify.goTo(0)"
        >PHP5技術者認定試験上級</v-toolbar-title
      >
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div> -->

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
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(item, i) in lists" :key="i">
            <template v-if="item.genre == select">
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre>{{ item.result }}</pre>
              </v-expansion-panel-content>
            </template>
            <template v-else-if="select == 'all'">
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre>{{ item.result }}</pre>
              </v-expansion-panel-content>
            </template>
          </v-expansion-panel>
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
// import HelloWorld from "./components/HelloWorld";
import axios from "axios";
export default {
  name: "App",

  // components: {
  //   HelloWorld,
  // },

  data() {
    return {
      lists: [],
      items: ["all", "array", "string"],
      select: "all",
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
        // this.lists = res.data;
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
</style>
