import ActionType from "../ActionType";


const AdminState = {
    adminOption:null
}

const AdminReducer = (state = AdminState, {type, payload}) => {
    switch(type){
        case ActionType.ADMIN:
            return{...state, adminOption:payload};

        default:
            return state;
    }
}

export default AdminReducer;