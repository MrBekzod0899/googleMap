import React,{createContext,useReducer} from 'react'
import { reducer } from './reducer';
import defaultdata from './uzbekistan.json'
export const MyContext = createContext();

export default function Mycontext({children}) {
    const initialState={
        data:defaultdata,
        center : [41.63463151377654, 64.89969605983609]
      }
      const [value,dispatch]=useReducer(reducer,initialState)
      
  return (
    <MyContext.Provider value={{...value,dispatch}}>
            {children}
    </MyContext.Provider>
  )
}
