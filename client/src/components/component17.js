import React from 'react'

import PropTypes from 'prop-types'

import './component17.css'

const Component17 = (props) => {
  return (
    <div className={`component17-container ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="component17-image"
      />
    </div>
  )
}

Component17.defaultProps = {
  rootClassName: '',
  image_src: '/playground_assets/image%20%5B12%5D%20%5B1%5D%20%5B3%5D-200h.png',
  image_alt: 'image',
}

Component17.propTypes = {
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
}

export default Component17
