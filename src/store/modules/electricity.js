const axios = require('axios');

const state = {
    electricity: ""
}

const getters = {
    electricity: state => state.electricity
}

const mutations = {
    setElectricity(state, electricity){
        state.electricity = electricity.result;
    }
}

const actions = {
    getAllElectricity({commit}){
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity`)
        .then(res => {
            commit("setElectricity", res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}