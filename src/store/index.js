import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: [
      {
        id: "i1",
        title: "Тестовое задание кандидата",
        description:
          "Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха",
        belong: 0,
      },
      {
        id: "i2",
        title: "Трудовой договор",
        dots: ["#0066FF", "#8E9CBB"],
        belong: 0,
      },
      {
        id: "i3",
        title: "Трудовой договор",
        belong: 0,
      },
      {
        id: "i4",
        title: "Паспорт",
        description: "Для всех",
        belong: 1,
        dots: ["#00C2FF"],
        required: true,
      },
      {
        id: "i5",
        title: "ИНН",
        description: "Для всех",
        belong: 1,
        required: true,
      },
      {
        id: "i3",
        title: "Трудовой договор",
        belong: 1,
      },

      {
        id: "i5",
        title: "ИНН",
        description: "Для всех",
        belong: 2,
        required: true,
      },

      {
        id: "i5",
        title: "ИНН",
        description: "Для всех",
        belong: 3,
        required: true,
      },
    ],
    categorylist: [
      {
        id: 1,
        title: "Обязательные для всех",
        description:
          "Документы, обязательные для всех сотрудников без исключения",
        dots: ["#FF238D", "#FFB800", "#FF8D23"],
        category: 1,
      },
      {
        id: 2,
        title: "Обязательные для трудоустройства",
        description:
          "Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж",
        category: 2,
      },
      {
        id: 3,
        title: "Специальные",
        category: 3,
      },
    ],
    itemFilterList: [],
    categoryFilterlist: [],
  },
  getters: {
    getItemList(state) {
      return state.itemFilterList;
    },
    getCategoryList(state) {
      return state.categoryFilterlist;
    },
  },
  mutations: {
    SET_DATA(state) {
      state.itemFilterList = state.itemList;
      state.categoryFilterlist = state.categorylist;
    },
    SEARCH__FIELD(state, newVar) {
      console.log(newVar);
      state.itemFilterList = state.itemList.filter((filt) => {
        return (
          filt.title.toLowerCase().includes(newVar.toLowerCase()) ||
          filt.description?.toLowerCase().includes(newVar.toLowerCase())
        );
      });
      state.categoryFilterlist = state.categorylist.filter((filt) => {
        return (
          filt.title.toLowerCase().includes(newVar.toLowerCase()) ||
          filt.description?.toLowerCase().includes(newVar.toLowerCase())
        );
      });
    },
  },
  actions: {
    //Получаем данные с апи
    GET_DATA_API({ commit }) {
      commit("SET_DATA");
    },
  },
  modules: {},
});
