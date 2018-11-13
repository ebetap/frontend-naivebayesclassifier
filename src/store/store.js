import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Naive Bayes Classifier',
    subtitle: 'Frontend layer for naivebayes classifier. Create with MongoDB,Express.js,Vue.js,Node.js stack.',
    author: 'Beta Priyoko'
  },
  mutations,
  actions
})
