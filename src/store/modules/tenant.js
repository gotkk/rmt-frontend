const axios = require('axios');

const state = {
    tenant: ""
}

const getters = {
    tenant: state => state.tenant
}

const mutations = {
    setTenant(state, tenant){
        state.tenant = tenant.result;
    }
}

const actions = {
    getAllTenant({commit}){
        axios.get("http://localhost:3000/tenant")
        .then(res => {
            commit("setTenant", res.data)
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