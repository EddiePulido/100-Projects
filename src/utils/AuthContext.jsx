import { useContext, useState, useEffect, createContext } from 'react'
import { account } from '../appwrite/config'
import { ID } from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const[loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUserStatus()
  }, [])

  const loginUser = async (userInfo) => {
    setLoading(true)

    try{
      const res = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )

      let accountDetails = await account.get()
      setUser(accountDetails)
    }catch(err){
      console.error(err)
    }

    setLoading(false)
  }

  const logoutUser = async () => {
    account.deleteSession('current')
    setUser(null)
  }

  const registerUser = async (userInfo) => {
    setLoading(true)
    try{
      const res = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      )


      const response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      )
  
      let accountDetails = await account.get()
      setUser(accountDetails)
    }catch(err){
      console.error(err)
    }

    setLoading(false)
  }

  const checkUserStatus = async () => {
    try{
      const accountDetails = await account.get()
      setUser(accountDetails)
    }catch(err){
      console.error(err)
    }
    setLoading(false)
  }

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  }

  return(
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p>: children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext