export const reducer=(state,{type,payload})=>{
    switch(type){
        case  "GET_DATA" :{
            return {
                ...state,
                data:payload.info,
                center:payload.position
            }
        }
        default : return state
    }
}