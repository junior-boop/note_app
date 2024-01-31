import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from './pages/loading.jsx'
import { RiErrorWarningLine, RiGoogleFill } from './component/icons.jsx'
import { auth} from './firebase/index.js'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Editor from './pages/editor.jsx'
import { useAppStore, useLoginState } from './store.js'
import { register } from "register-service-worker";
import GlobalContextProvider from './globalContext/context.jsx'

import { loader as editorLoader } from './pages/editor.jsx'


function InstallIterface ({onClick}){
  return(
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-[100dvh] bg-[#0005] flex items-center justify-center disabled:opacity-30'>
      <div className=' w-[95%] md:w-[400px] aspect-square rounded-xl bg-white p-6 flex flex-col'>
        <div className='flex-1 flex flex-col items-center justify-center gap-6'>
          <div className='w-16 aspect-square flex items-center justify-center'>
            <RiErrorWarningLine className = "text-gray-400"  />
          </div>
          <div className='text-base font-semibold text-slate-600 text-center'>
            Pour profiter pleinement de cette application, nous vous invitons à l'installer en cliquant sur le bouton "Installer".
          </div>
        </div>
        <button onClick={onClick} className='w-full px-4 py-3 font-bold bg-green-500 rounded-full text-white'>
          Installer
        </button>
      </div>
    </div>
  )
}


function Home_page(){


  const [isLogin, setIsLogin] = useState(false)
  const [installPrompt, setInstallPrompt] = useState({state : false, event : null}) 

  const { userInfo, updateUserInfo } = useAppStore()
  const { login, updatedLogin } = useLoginState()

  

  const handleSignIn = () => {
    updatedLogin(true)
    setIsLogin(true)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      const userinfo = {
        email : user.email,
        name : user.displayName,
        photo : user.photoURL,
        metadata : user.metadata,
        phone : user.phoneNumber,
        emailVerify : user.emailVerified
      }

      const DataSave = {
        userTokenLogin : token,
        userinfo,
        createdAt : Date.now()
      }

      localStorage.setItem('note-app-user', JSON.stringify(DataSave))
      updateUserInfo(DataSave)
      setIsLogin(false)

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      const object = {
        errorCode, errorMessage, email, credential
      }

      console.log(object)
    });

  }



  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevents the default mini-infobar or install dialog from appearing on mobile
    e.preventDefault();
    // Save the event because you'll need to trigger it later.
    console.log('je fonctionne')
    setInstallPrompt({state : true, event : e})
  });

  const handleInstallationClick = async (e) => {
    let deferredPrompt = installPrompt.event;
    
    deferredPrompt.prompt()
    e.target.disabled = true


    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA setup accepted");
        setInstallPrompt(e => ({ state : false, ...e }))
      } else {
        console.log("PWA setup rejected");
      }
      e.target.disabled = false
      deferredPrompt = null;
    })
  }

  if(isLogin){
    return <Loading />
  }
  
  if(!login){
    return(
      <div className='w-full h-[100vh] bg-white flex items-center justify-center'>
        <div>
          <div className='w-full text-center text-xl font-medium mb-4'>Connectez vous </div>
          <button onClick={handleSignIn} className='px-4 py-3 rounded-full bg-red-500 text-white w-[70vw] flex gap-4 items-center justify-center'>
            <RiGoogleFill className = 'w-6 h-6' />
            Votre compte Google</button>
        </div>
        <div className='absolute bottom-6 w-full text-center'>
          #geniusofdigital
        </div>
        {
          installPrompt.state 
          ? <InstallIterface onClick={handleInstallationClick} /> 
          : null
        }
      </div>
    )
  }

  if(login) return <App />
  
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home_page />}/>
        <Route 
            path='/:id' 
            element = {<Editor />}
            loader={editorLoader}
        />
      </Routes>
    </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>)

register('./service-workers.js')