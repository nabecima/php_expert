<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold"
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
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(item, i) in lists" :key="i">
            <v-expansion-panel-header>
              <pre>{{ item.function }}</pre>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <pre>{{ item.result }}</pre>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
          "https://script.google.com/macros/s/AKfycbxAS-pYztCVzgFDv4NHvhR3SlWVfrR9qFsIK2aBWB6FTLztfbXrIhEWIW33aXPWKs91/exec"
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
</style>
