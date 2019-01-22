import Vue from 'vue';
import Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
Vue.use(Vuex);


export interface RootState {
  attendance: {[key: string]: any};
  isLoading: boolean;
}

export interface RootGetters {
  isLoading: boolean;
}

export interface RootMutations {
  setLoading: {
    isLoading: boolean;
  };
}

export interface RootActions {
  setLoading: {
    isLoading: boolean;
  };
}

const rootState: RootState = {
  attendance: {},
  isLoading: false,
};

const getters: DefineGetters<RootGetters, RootState> = {
  isLoading: (state) => state.isLoading,
};


const mutations: DefineMutations<RootMutations, RootState> = {
  setLoading(state, {isLoading}) {
    state.isLoading = isLoading;
  },
};

const actions: DefineActions<RootActions, RootState, RootMutations, RootGetters> = {
  setLoading({commit}, payload) {
    setTimeout(() => {
      commit('setLoading', payload);
    }, 1000);
  }
};


export const store = new Vuex.Store({
  state: rootState,
  getters,
  mutations,
  actions,
});

store.dispatch<Dispatcher<RootActions>>({
  type: 'setLoading',
  isLoading: false,
})