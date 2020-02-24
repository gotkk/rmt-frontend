const axios = require('axios');

const state = {
    contract: ""
}

const getters = {
    contract: state => state.contract
}

const mutations = {
    setContract(state, contract) {
        state.contract = contract.result;
    }
}

const actions = {
    createContract({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}contract`, data)
            .then(() => {
                axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}contract`)
                .then(res => {
                    commit("setContract", res.data)
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateContract({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}contract/${data._id}`, data)
            .then(() => {
                axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}contract`)
                .then(res => {
                    commit("setContract", res.data)
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllContract({ commit }) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}contract`)
            .then(res => {
                commit("setContract", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    getNewContractNotHaveBill({ commit }) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}contract/new`)
            .then(res => {
                console.log(res.data);
                commit("setContract", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    getContractByTenantId({ commit }, id) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}contract/${id}`)
            .then(res => {
                commit("setContract", res.data)
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