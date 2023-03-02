import React from 'react'

import PropTypes from 'prop-types'

import './component18.css'

const Component18 = (props) => {
  return (
    <div className="component18-container">
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="component18-image"
      />
    </div>
  )
}

Component18.defaultProps = {
  image_src:
    '/playground_assets/image%20%5B10%5D%20%5B1%5D%20%5B1%5D%20%5B4%5D-200h.png',
  image_alt: 'image',
}

Component18.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
}

export default Component18
