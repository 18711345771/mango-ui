import {ActionTree} from "vuex";

const actions:ActionTree<any,any>={
    async updateMainTabs({state,commit},val:any[]){
        commit('updateMainTabs',val);
    },
    async updateMainTabsActiveName({state,commit},val:any){
        commit('updateMainTabsActiveName',val);
    }
};
export default actions