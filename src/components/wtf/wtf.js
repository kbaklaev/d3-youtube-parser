import React from 'react'
import Popup from 'reactjs-popup'

const WTF = () => {
  return (
    <Popup trigger={<button type="button" className="button">WTF?!</button>} modal>
      <div className="modal border-solid border-2 border-gray-600 rounded-lg p-4">
        <span>
          What's going on here?
          <br/>
          Enter a subdomain from the site&nbsp;
          <a
            href="https://d3.ru"
            alt="d3.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600"
          >
            d3.ru
          </a>
          &nbsp;in the input field, click on the YARRR!!! button and magic will happen
        </span>
      </div>
    </Popup>
  )
}

export default WTF