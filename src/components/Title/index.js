import React, { useState, useEffect } from 'react'
import './index.css'

function Title() {
  const [text, setText] = useState('WHO')

  useEffect(() => {
    const intervalID = setTimeout(() =>  {
        switch (text) {
        case 'WHO': setText('WHAT')
        break
        case 'WHAT': setText('WHERE')
        break
        default: setText('WHO')
        break
      }
    }, 3000);

    return () => clearInterval(intervalID);
  }, [text])

  return (
    <div className='title'>
      <p title={text} className='title__text'>{text}</p>
    </div>
  )
}

export default Title
