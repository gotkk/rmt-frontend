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
    },
    setCreate(){

    },
    setUpdate(){

    }
}

const actions = {
    createContract({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}contract`, data)
            .then(res => {
                commit("setCreate", res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateContract({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}contract/${data._id}`, data)
            .then(res => {
                commit("setUpdate", res.data);
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