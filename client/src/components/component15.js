import React from 'react'

import PropTypes from 'prop-types'

import './component15.css'

const Component15 = (props) => {
  return (
    <div className={`component15-container ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="component15-image"
      />
    </div>
  )
}

Component15.defaultProps = {
  image_src: '/playground_assets/discord%20icon%20%5B3%5D-200h.png',
  image_alt: 'image',
  rootClassName: '',
}

Component15.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Component15
