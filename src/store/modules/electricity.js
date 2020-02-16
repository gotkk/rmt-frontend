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
    },
    setCreate(){
        
    },
    setUpdate(){

    }
}

const actions = {
    createElectricity({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity`, data)
            .then(res => {
                commit("setCreate", res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllElectricity({commit}){
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity`)
        .then(res => {
            commit("setElectricity", res.data)
        })
        .catch(err => {
            console.log(err);
        })
    },
    updateElectricity({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity/${data._id}`, data)
            .then(res => {
                commit("setUpdate", res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}