import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { ChatContextProvider } from './context/chatContext'
import { WalletConnectionProvider } from './context/walletProvider';
import { useAuthState } from 'react-firebase-hooks/auth'
import Chatblockai from './pages/chatblockai'
import ChatInit from './pages/chatinit'
import DepositsAndWithdrawals from './pages/deposits-and-withdrawals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { auth } from './firebase'
const App = () => {
  const [user] = useAuthState(auth)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Chatblockai />} exact path="/" />
        <Route element={<ChatInit />} exact path="/init" />
        <Route
          element={<DepositsAndWithdrawals />}
          exact
          path="/deposits-and-withdrawals"
        />
      </Routes>
      {/* <ChatContextProvider>
        <WalletConnectionProvider defaultNetwork={'bnbt'}>
          <div>
            {user ? <Home /> : <SignIn />}
          </div>
        </WalletConnectionProvider>
      </ChatContextProvider > */}
    </BrowserRouter>
  )
}

export default App