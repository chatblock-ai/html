import React from 'react'

import PropTypes from 'prop-types'

import './component16.css'

const Component16 = (props) => {
  return (
    <div className={`component16-container ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="component16-image"
      />
    </div>
  )
}

Component16.defaultProps = {
  image_alt: 'image',
  rootClassName: '',
  image_src:
    '/playground_assets/image%20%5B9%5D%20%5B1%5D%20%5B1%5D%20%5B2%5D-200h.png',
}

Component16.propTypes = {
  image_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
}

export default Component16
