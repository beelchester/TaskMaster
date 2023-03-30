import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'


const Loading = () => {
    const loading = useSelector((state) => state.fetchUser.loading)

  return (
    <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
        />
  )
}

export default Loading
