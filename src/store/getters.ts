import {GetterTree} from "vuex";

const getters:GetterTree<any,any>={
    collapse(state:any):any{
        return state.collapse;
    },
    themeColor(state:any):any{
        return state.themeColor;
    },
    mainTabs(state:any):any{
        return state.mainTabs;
    },
    mainTabsActiveName(state:any):any{
        return state.mainTabsActiveName;
    }
};

export default getters