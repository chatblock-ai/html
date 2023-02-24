import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { ChatContextProvider } from './context/chatContext'
import { WalletConnectionProvider } from './context/walletProvider';
import { useAuthState } from 'react-firebase-hooks/auth'
import { Toaster } from 'react-hot-toast'

import { auth } from './firebase'
const App = () => {
  const [user] = useAuthState(auth)
  return (
    <ChatContextProvider>
      <WalletConnectionProvider defaultNetwork={'bnbt'}>
        <div>
          {user ? <Home /> : <SignIn />}
        </div>
      </WalletConnectionProvider>
    </ChatContextProvider >
  )
}

export default App