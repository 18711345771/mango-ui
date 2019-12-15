import store from '@/store/store'
export function hasPermission(perms:any){
    let hasPermission=false;
    let permissions=store.state.perms;
    for(let i=0;i<permissions.length;i++){
        if(permissions[i]===perms){
            hasPermission=true;
            break;
        }
    }
    return hasPermission;
}