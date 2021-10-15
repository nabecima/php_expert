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
          <v-col class="flex-grow-0 flex-shrink-0">
            <v-select
              class="select"
              v-model="select"
              :items="types"
              label="Solo field"
              solo
            ></v-select
          ></v-col>
          <v-col class="flex-grow-0 flex-shrink-0">
            <v-btn class="reset" color="primary" @click="lists = shuffle(lists)"
              >Shuffle</v-btn
            >
          </v-col>
          <v-col class="flex-grow-0 flex-shrink-0">
            <v-btn class="reset" color="primary" @click="clear" :disabled="flag"
              >Reset</v-btn
            >
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
        <template v-if="select == 'xml'">
          <v-alert dense type="info" class="font-weight-bold">
            メソッドとそのメソッドが受け取れる値の説明をしなさい
          </v-alert>
        </template>
        <template v-else-if="select == 'mdb2'">
          <v-alert dense type="info" class="font-weight-bold">
            問題にあるメソッドを実行した時の結果を答えなさい
          </v-alert>
          <v-simple-table class="table">
            <template v-slot:default>
              <caption class="text-left">
                testテーブル
              </caption>
              <thead>
                <tr>
                  <th class="text-left">a</th>
                  <th class="text-left">b</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data" :key="item.name">
                  <td>{{ item.a }}</td>
                  <td>{{ item.b }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <pre class="mb-1">$db = MDB2::connect(DSN);</pre>
        </template>
        <v-expansion-panels focusable v-if="!loading">
          <template v-for="item in lists">
            <v-expansion-panel v-if="item.type == select" :key="item.id">
              <v-checkbox
                class="checkbox"
                on-icon="mdi-star"
                off-icon="mdi-star-outline"
                color="orange"
                v-model="favorites"
                :value="item.id"
                @change="storage(item.id, item.type)"
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
                @change="storage(item.id, item.type)"
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
              v-else-if="select == 'favorites' && isId(item.id)"
              :key="item.id"
            >
              <v-checkbox
                class="checkbox"
                on-icon="mdi-star"
                off-icon="mdi-star-outline"
                color="orange"
                v-model="favorites"
                :value="item.id"
                @change="storage(item.id, item.type)"
              >
              </v-checkbox>
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
      types: [],
      select: "all",
      loading: true,
      favorites: [],
      flag: true,
      data: [
        { a: 1, b: 10 },
        { a: 2, b: 20 },
      ],
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
    storage(id, type) {
      if (this.favorites.indexOf(id) !== -1) {
        localStorage.setItem(id, type);
      } else {
        localStorage.removeItem(id);
      }

      this.flag = this.checkLocalStorage();
    },
    clear() {
      if (confirm("チェックした問題を全てリセットしますか？")) {
        localStorage.clear();
        this.favorites = [];
        this.flag = true;
      }
    },
    isId(id) {
      return id in localStorage;
    },
    checkLocalStorage() {
      if (localStorage.length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    const SHEET =
      "https://script.google.com/macros/s/AKfycbyzvluUr38dkwWSOxO2GTAravixfBJNkBEJ4mc1VGC4X9Np-CwTSZH2gZaDIyVZcAVL/exec";
    axios.get(SHEET, { crossDomain: true }).then((res) => {
      this.lists = this.shuffle(res.data.qa);
      console.log(res.data);
      this.types = res.data.types;
      for (let key in localStorage) {
        this.favorites.push(key);
      }
      this.loading = false;
      this.flag = this.checkLocalStorage();
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
  word-break: break-all;
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

.table {
  max-width: 500px !important;
}
</style>
