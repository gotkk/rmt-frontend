const axios = require('axios');

const state = {
    contract: ""
}

const getters = {
    contract: state => state.contract
}

const mutations = {
    setContract(state, contract){
        state.contract = contract.result;
    }
}

const actions = {
    getAllContract({commit}){
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}contract`)
        .then(res => {
            commit("setContract", res.data)
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