const axios = require('axios');

const state = {
    bill: "",
    billId: "ss"
}

const getters = {
    bill: state => state.bill,
    billId: state => state.billId
}

const mutations = {
    setBillId(state, bill) {
        state.billId = bill.result._id;
    },
    setUpdateBillUnit(){

    }
}

const actions = {
    createInitialBill({ commit }, billdata) {
        axios.post(`${process.env.VUE_APP_RWT_BACKEND_APP}bill/initialbill`, billdata)
            .then(res => {
                commit("setBillId", res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },
    updateBillWithUnit({ commit }, data) {
        axios.put(`${process.env.VUE_APP_RWT_BACKEND_APP}bill/${data._id}/unit`, data)
            .then(res => {
                commit("setUpdateBillUnit", res.data)
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