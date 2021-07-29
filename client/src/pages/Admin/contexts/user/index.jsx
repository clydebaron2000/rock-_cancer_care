import React,{useContext, useState} from 'react'
const UserContext = React.createContext()
 
export function useUserState(){
    const context = useContext(UserContext)
    if (context===undefined) throw new Error("useUserState called outside of UserProvider")
    return context
}

export function UserProvider({children}){ 
    const [user,setUser] = useState()
    return(
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
} 