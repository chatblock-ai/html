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
        <title>Sign-in</title>
        <meta
          property="og:title"
          content="Sign-in - Miniature Spherical Gorilla"
        />
      </Helmet>
      <img
        alt="image"
        src="/playground_assets/layers%20%5B2%5D-300w.png"
        className="sign-in-image"
      />
      <img
        src="/playground_assets/new%20project%20%5B3%5D%20%5B1%5D-1500w.png"
        className="sign-in-image1"
      />
      <div id="place-here" className="sign-in-container1">
            <div className='signin__container bg-black'>
              <button className="signin__btn flex items-center justify-center" onClick={signInWithGoogle}>
                <FcGoogle className='m-2' />
                Sign in with Google
              </button>
            </div>
          </div>
      <img
        alt="image"
        src="/playground_assets/layers%20%5B7%5D-500w.png"
        className="sign-in-image2"
      />
      <img
        alt="image"
        src="/playground_assets/layers%20%5B1%5D-800w.png"
        className="sign-in-image3"
      />
      <img
        alt="image"
        src="/playground_assets/layers%20%5B3%5D-200w.png"
        className="sign-in-image4"
      />
      <img
        alt="image"
        src="/playground_assets/layers%20%5B4%5D-200h.png"
        className="sign-in-image5"
      />
      <img
        alt="image"
        src="/playground_assets/layers-200h.png"
        className="sign-in-image6"
      />
      <img
        alt="image"
        src="/playground_assets/layers%20%5B6%5D-200h.png"
        className="sign-in-image7"
      />
    </div>
  )
}

export default SignIn
