const axios = require('axios');

const state = {
    land: ""
}

const getters = {
    land: state => state.land
}

const mutations = {
    setLand(state, land){
        state.land = land.result;
    },
    setCreate(){
        
    },
    setUpdate(){
        
    }
}

const actions = {
    createLand({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}land`, data)
            .then(res => {
                commit("setCreate", res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllLand({commit}){
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}land`)
        .then(res => {
            commit("setLand", res.data)
        })
        .catch(err => {
            console.log(err);
        })
    },
    updateLand({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}land/${data._id}`, data)
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