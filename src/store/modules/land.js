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
    }
}

const actions = {
    getAllLand({commit}){
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}land`)
        .then(res => {
            commit("setLand", res.data)
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