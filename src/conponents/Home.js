import React, { useContext } from 'react'
import { ChatContext } from '../context'

export const Home = () => {
  const myststechect=useContext(ChatContext)
  
  return (
    <div>
      {myststechect.mystate}
    </div>
  )
}
