<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold title" @click="$vuetify.goTo(0)"
        >PHP5技術者認定試験上級</v-toolbar-title
      >

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col md="2" sm="1">
            <v-select
              class="select"
              v-model="select"
              :items="items"
              label="Solo field"
              solo
            ></v-select
          ></v-col>
          <v-col sm="1">
            <v-btn class="reset" color="primary" @click="clear">Reset</v-btn>
          </v-col>
        </v-row>
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
          <template v-for="item in lists">
            <v-expansion-panel v-if="item.genre == select" :key="item.id">
              <v-checkbox
                class="checkbox"
                on-icon="mdi-star"
                off-icon="mdi-star-outline"
                color="orange"
                v-model="favorites"
                :value="item.id"
                @change="storage(item.id, item.function)"
              >
              </v-checkbox>
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre>{{ item.result }}</pre>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-else-if="select == 'all'" :key="item.id">
              <v-checkbox
                class="checkbox"
                on-icon="mdi-star"
                off-icon="mdi-star-outline"
                color="orange"
                v-model="favorites"
                :value="item.id"
                @change="storage(item.id, item.function)"
              >
              </v-checkbox>
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre>{{ item.result }}</pre>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel
              v-else-if="select == 'favorites' && check(item.id)"
              :key="item.id"
            >
              <v-checkbox
                class="checkbox"
                on-icon="mdi-star"
                off-icon="mdi-star-outline"
                color="orange"
                v-model="favorites"
                :value="item.id"
                @change="storage(item.id, item.function)"
              >
              </v-checkbox>
              <v-expansion-panel-header>
                <pre>{{ item.function }}</pre>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ item.result }}
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
      items: ["all", "array", "string", "regex", "favorites"],
      select: "all",
      loading: true,
      favorites: [],
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
    storage(id, example) {
      if (this.favorites.indexOf(id) !== -1) {
        localStorage.setItem(id, example);
      } else {
        localStorage.removeItem(id);
      }
    },
    clear() {
      if (confirm("チェックした問題を全てリセットしますか？")) {
        localStorage.clear();
        this.favorites = [];
      }
    },
    check(id) {
      return id in localStorage;
    },
  },

  mounted() {
    const CORS = "https://cors.bridged.cc/";
    const SHEET =
      "https://script.google.com/macros/s/AKfycbwkFSXgj1vkAKaxO2WHeVj2rGLmn-N6mInXtfi5GUHCCM-j1cw6mDB6Ig6gxRrSjbVg/exec";
    axios.get(CORS + SHEET).then((res) => {
      this.lists = this.shuffle(res.data);
      for (let key in localStorage) {
        this.favorites.push(key);
      }
      this.loading = false;
    });
  },
};
</script>
<style>
.title {
  cursor: pointer;
}

pre {
  line-height: 1.5;
  white-space: pre-wrap;
}

.progress {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.reset {
  padding: 12px;
}

.checkbox {
  padding-left: 22px;
}

.v-expansion-panel-header {
  padding-top: 0 !important;
}
</style>
