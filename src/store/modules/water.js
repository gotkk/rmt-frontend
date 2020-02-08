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
        axios.get("http://localhost:3000/water")
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