import React from 'react'

import PropTypes from 'prop-types'

import './component14.css'

const Component14 = (props) => {
  return (
    <div className={`component14-container ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="component14-image"
      />
    </div>
  )
}

Component14.defaultProps = {
  image_alt: 'image',
  rootClassName: '',
  image_src: '/playground_assets/image%20%5B10%5D%20%5B1%5D%20%5B3%5D-200h.png',
}

Component14.propTypes = {
  image_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  image_src: PropTypes.string,
}

export default Component14
