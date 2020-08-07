import React from 'react'
import './loader.css'

const Loader = () => {
  return (
    <div className="flex justify-center h-full">
      <div className="text-center flex content-center flex-wrap">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  )
}

export default Loader