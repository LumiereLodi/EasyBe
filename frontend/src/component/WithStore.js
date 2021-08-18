// import {nanoid} from "nanoid";
import React from "react";
import {useLocalObservable} from 'mobx-react'
import {createAppStore} from "./AppState";
const AppContext = React.createContext(null)

const StateProvider = ({children}) => {

    const StateStore = useLocalObservable(createAppStore)
    return <AppContext.Provider value={StateStore}>
        {children}
    </AppContext.Provider>
}


export const useAppState = () => React.useContext(AppContext)



export default StateProvider