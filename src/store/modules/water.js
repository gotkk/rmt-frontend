const axios = require('axios');

const state = {
    water: ""
}

const getters = {
    water: state => state.water
}

const mutations = {
    setWater(state, water) {
        state.water = water.result;
    },
    setCreate() {

    },
    setUpdate() {

    }
}

const actions = {
    createWater({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}water`, data)
            .then(() => {
                axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}water`)
                    .then(res => {
                        commit("setWater", res.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllWater({ commit }) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}water`)
            .then(res => {
                commit("setWater", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateWater({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}water/${data._id}`, data)
            .then(() => {
                axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}water`)
                    .then(res => {
                        commit("setWater", res.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    },
    getWaterByContractId({ commit }, id) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}water/${id}`)
            .then(res => {
                commit("setWater", res.data);
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