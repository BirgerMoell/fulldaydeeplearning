import React from 'react'
import Iframe from 'react-iframe'

const Chat = () => {
  return (
    <Iframe url='https://www.kommunicate.io/test?appId=10d244c3bd3b842e5f18068c11b6ccd16&botIds=fulldaybot-3ygcj&assignee=fulldaybot-3ygcj'
      width='100%'
      height='800px'
      id='myId'
      className='myClassname'
      display='initial'
      position='relative' />
  )
}

export default Chat
