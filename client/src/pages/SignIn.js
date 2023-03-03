import React from 'react'
import { auth } from '../firebase'
import { FcGoogle } from 'react-icons/fc'
import { Helmet } from 'react-helmet'
import './sign-in.css'
import { GoogleAuthProvider, signInWithRedirect/*signInWithPopup*/  } from 'firebase/auth'

const SignIn = () => {

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  return (
    <div className="sign-in-container">
    <Helmet>
      <title>Sign-in - Miniature Spherical Gorilla</title>
      <meta
        property="og:title"
        content="Sign-in - Miniature Spherical Gorilla"
      />
    </Helmet>
    <img
      alt="image"
      src="/playground_assets/layers%20%5B2%5D-200h.png"
      className="sign-in-image"
    />
    <div className="sign-in-container1">
      <div className="sign-in-container2">
        <div className="relative sign-in-container3">
          {/* <img
            alt="image"
            src="/playground_assets/new%20project%20%5B2%5D%20%5B4%5D-500h.png"
            className="sign-in-image1"
          /> */}
          <div className='absolute top-[50px] signin bg-transparent'>
            <div className='signin__container bg-black'>
              <button className="signin__btn flex items-center justify-center" onClick={signInWithGoogle}>
                <FcGoogle className='m-2' />
                Sign in with Google
              </button>

              <p className='signin__tos'>Do not violate the community guidelines or you will be banned for life!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img
      alt="image"
      src="/playground_assets/layers%20%5B7%5D-500w.png"
      className="sign-in-image2"
    />
    <img
      alt="image"
      src="/playground_assets/layers%20%5B1%5D-700w.png"
      className="sign-in-image3"
    />
    <img
      alt="image"
      src="/playground_assets/layers%20%5B3%5D-200w.png"
      className="sign-in-image4"
    />
    {/* <AppComponent rootClassName="app-component-root-class-name"></AppComponent> */}
    
    <img
      alt="image"
      src="/playground_assets/layers-200h.png"
      className="sign-in-image5"
    />
    <img
      alt="image"
      src="/playground_assets/layers%20%5B6%5D-200h.png"
      className="sign-in-image6"
    />
  </div>
    
  )
}

export default SignIn