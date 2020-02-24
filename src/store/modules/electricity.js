const axios = require('axios');

const state = {
    electricity: ""
}

const getters = {
    electricity: state => state.electricity
}

const mutations = {
    setElectricity(state, electricity) {
        state.electricity = electricity.result;
    }
}

const actions = {
    createElectricity({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity`, data)
            .then(() => {
                axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity`)
                    .then(res => {
                        commit("setElectricity", res.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllElectricity({ commit }) {
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
            .then(() => {
                axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity`)
                    .then(res => {
                        commit("setElectricity", res.data)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    },
    getElectricityByContractId({ commit }, id) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}electricity/${id}`)
            .then(res => {
                commit("setElectricity", res.data);
                // return res;
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