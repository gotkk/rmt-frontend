const axios = require('axios');

const state = {
    tenant: ""
}

const getters = {
    tenant: state => state.tenant
}

const mutations = {
    setTenant(state, tenant) {
        state.tenant = tenant.result;
    },
    setCreate() {

    },
    setUpdate() {

    }
}

const actions = {
    createTenant({ commit }, data) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}tenant`, data)
            .then(res => {
                commit("setCreate", res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },
    getAllTenant({ commit }) {
        axios.get(`${process.env.VUE_APP_RWT_BACKEND_APP}tenant`)
            .then(res => {
                commit("setTenant", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateTenantWithLastBill({ commit }, tenantid) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}tenant/${tenantid}/lastbill`)
            .then(res => {
                commit("setUpdate", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateTenant({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}tenant/${data._id}`, data)
            .then(res => {
                commit("setUpdate", res.data)
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