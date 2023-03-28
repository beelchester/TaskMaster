import React from 'react'
import Drawer from './Drawer'
import Login from './src/screens/Login'
import {useSelector} from 'react-redux'

const Main = () => {

    const login = useSelector((state) => state.user.login);

  return (
      <> 
      {login ? <Drawer /> : <Login />}
      </>
  )
}

export default Main
