import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import state from "./state";
import singers from "./moudle/singers/index";
import rank from "./moudle/rank/index";
import album from "./moudle/albums/index";
import recommend from "./moudle/recommend/index";
import singer from "./moudle/singer/index";
import mutations from "./mutations";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    singers,
    rank,
    album,
    recommend,
    singer
  },
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
