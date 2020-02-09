const axios = require('axios');

const state = {
    water: ""
}

const getters = {
    water: state => state.water
}

const mutations = {
    setWater(state, water){
        state.water = water.result;
    }
}

const actions = {
    getAllWater({commit}){
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}water`)
        .then(res => {
            commit("setWater", res.data)
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