<template>
  <v-app>
    <v-navigation-drawer app clipped right v-model="drawer">
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item v-if="!isSignedin" @click="signIn">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark clipped-right>
      <div class="my-container d-flex align-center">
        <v-toolbar-title
          class="font-weight-bold title"
          @click="$vuetify.goTo(0)"
          >PHP5技術者認定試験上級</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-if="!isSignedin" text @click="signIn">
            <v-icon class="mr-1">mdi-login</v-icon>Sign In</v-btn
          >
          <v-btn v-else text @click="signOut">
            <v-icon class="mr-1">mdi-logout</v-icon>Sign Out</v-btn
          >
        </v-toolbar-items>

        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up hamburger"
        ></v-app-bar-nav-icon>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <div class="progress" v-if="loading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            absolute
            top
          ></v-progress-circular>
        </div>
        <template v-else>
          <v-row class="mb-2">
            <v-col class="flex-grow-0 flex-shrink-0">
              <v-select
                class="select"
                v-model="select"
                :items="types"
                label="Solo field"
                hide-details="false"
                solo
              ></v-select
            ></v-col>
            <v-col v-if="select == 'random'" class="flex-grow-0 flex-shrink-0">
              <v-select
                v-model="count"
                :items="counts"
                label="Solo field"
                hide-details="false"
                solo
              ></v-select
            ></v-col>
            <v-col class="flex-grow-0 flex-shrink-0">
              <v-btn
                class="btn"
                height="48"
                color="primary"
                @click="lists = shuffle(lists)"
                >Shuffle</v-btn
              >
            </v-col>
            <v-col class="flex-grow-0 flex-shrink-0">
              <v-btn
                v-if="isSignedin"
                class="btn"
                height="48"
                color="primary"
                @click="clear"
                :disabled="flag"
                >Reset</v-btn
              >
            </v-col>
          </v-row>
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
          <v-expansion-panels>
            <template v-for="(item, i) in lists">
              <v-expansion-panel v-if="item.type == select" :key="item.id">
                <v-checkbox
                  v-if="isSignedin"
                  class="checkbox"
                  on-icon="mdi-star"
                  off-icon="mdi-star-outline"
                  color="orange"
                  v-model="favorites"
                  :value="item.id"
                  @change="storage(item.id)"
                >
                </v-checkbox>
                <v-expansion-panel-header :class="{ active: isSignedin }">
                  <pre>{{ item.question }}</pre>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <pre>{{ item.answer }}</pre>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
                v-else-if="select == 'random' && i < count"
                :key="item.id"
              >
                <v-checkbox
                  v-if="isSignedin"
                  class="checkbox"
                  on-icon="mdi-star"
                  off-icon="mdi-star-outline"
                  color="orange"
                  v-model="favorites"
                  :value="item.id"
                  @change="storage(item.id)"
                >
                </v-checkbox>
                <v-expansion-panel-header :class="{ active: isSignedin }">
                  <pre>{{ item.question }}</pre>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <pre>{{ item.answer }}</pre>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
                v-else-if="select == 'favorites' && isId(item.id)"
                :key="item.id"
              >
                <v-checkbox
                  v-if="isSignedin"
                  class="checkbox"
                  on-icon="mdi-star"
                  off-icon="mdi-star-outline"
                  color="orange"
                  v-model="favorites"
                  :value="item.id"
                  @change="storage(item.id)"
                >
                </v-checkbox>
                <v-expansion-panel-header :class="{ active: isSignedin }">
                  <pre>{{ item.question }}</pre>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <pre>{{ item.answer }}</pre>
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
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import {
  getAuth,
  signOut,
  // signInWithPopup,
  // getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default {
  name: "App",

  data() {
    return {
      drawer: false,
      group: null,
      lists: [],
      types: [],
      select: "random",
      count: 20,
      counts: [10, 20, 30, 40, 50, 60],
      loading: true,
      favorites: [],
      flag: true,
      data: [
        { a: 1, b: 10 },
        { a: 2, b: 20 },
      ],
      menus: [
        {
          icon: "mdi-account-box-outline",
          text: "Sign Up",
          isSignedin: false,
        },
        {
          icon: "mdi-login",
          text: "Sign In",
          isSignedin: false,
        },
        {
          icon: "mdi-logout",
          text: "Sign Out",
          isSignedin: true,
        },
      ],
      user: {},
      isSignedin: false,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
    favorites(next) {
      if (next.length > 0) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
  methods: {
    shuffle([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    async storage(id) {
      const db = getFirestore();

      if (this.favorites.indexOf(id) !== -1) {
        try {
          await setDoc(doc(db, "favorites", this.user.id + id), {
            user_id: this.user.id,
            question_id: id,
          });
          // await addDoc(collection(db, "favorites"), {
          //   user_id: this.user.id,
          //   question_id: id,
          // });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        deleteDoc(doc(db, "favorites", this.user.id + id));
      }
    },
    async clear() {
      if (confirm("チェックした問題を全てリセットしますか？")) {
        const db = getFirestore();
        const favRef = collection(db, "favorites");
        const q = query(favRef, where("user_id", "==", this.user.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          deleteDoc(doc(db, "favorites", document.id));
        });

        this.favorites = [];
        this.flag = true;
      }
    },
    isId(id) {
      return this.favorites.includes(id);
    },
    signIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    },
    signOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.isSignedin = false;
      });
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user.id = user.uid;
        const db = getFirestore();
        const favRef = collection(db, "favorites");
        const q = query(favRef, where("user_id", "==", this.user.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.favorites.push(doc.data().question_id);
        });

        this.isSignedin = true;
      }
    });
  },

  async mounted() {
    const SHEET =
      "https://script.google.com/macros/s/AKfycbyzvluUr38dkwWSOxO2GTAravixfBJNkBEJ4mc1VGC4X9Np-CwTSZH2gZaDIyVZcAVL/exec";
    axios.get(SHEET, { crossDomain: true }).then((res) => {
      this.lists = this.shuffle(res.data.qa);
      this.types = res.data.types;
      this.loading = false;
    });
  },
};
</script>
<style>
.title {
  cursor: pointer;
}

.my-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
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

.btn {
  padding: 12px;
}

.checkbox {
  padding-left: 22px;
  width: 56px;
}

.v-expansion-panel-header.active {
  padding-top: 0 !important;
}

.table {
  max-width: 500px !important;
}

.select {
  width: 125px !important;
}

.hamburger {
  position: absolute !important;
  right: 0;
}

@media screen and (min-width: 960px) {
  .my-container {
    max-width: 900px;
  }
}

@media screen and (min-width: 1264px) {
  .my-container {
    max-width: 1185px;
  }
}

@media screen and (min-width: 1904px) {
  .my-container {
    max-width: 1785px;
  }
}

/* @media screen and (min-width: ) {
} */
</style>
