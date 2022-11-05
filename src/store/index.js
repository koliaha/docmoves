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
        id: "i6",
        title: "Трудовой договор",
        belong: 1,
      },

      {
        id: "i7",
        title: "ИНН",
        description: "Для всех",
        belong: 2,
        required: true,
      },

      {
        id: "i8",
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
    DRAG_START(state, payload){
      console.log(state);
      console.log(payload);
    }, 
    SET_CATEGORY(state,data){
      state.itemFilterList = state.itemFilterList.map((el)=>{
        if(el.id == data.itemId){
          el.belong = data.id
        } 
        return el
      })
    },
    REMOVE_ITEM(state, payload){
      state.itemList = state.itemList.filter(el=> el.id != payload.id)
      state.itemFilterList = state.itemList
    }, 
    REMOVE_CATEGORY(state, payload){
      state.itemList = state.itemList.map((el)=>{
        if(el.belong == payload.category){
          console.log(el);
          el.belong = 0
        } 
        return el
      })
      state.itemFilterList = state.itemList
      state.categorylist = state.categorylist.filter(el=> el.id != payload.id)
      state.categoryFilterlist = state.categorylist
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
