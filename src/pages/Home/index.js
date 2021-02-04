import React from 'react'
import './index.css'
import Title from '../../components/Title'
import EnterRoom from '../../components/EnterRoom'

function Home() {

  return (
    <div className='home'>
      <div className='home__container'>
        <Title />
        <EnterRoom />
      </div>
    </div>
  )
}

export default Home
