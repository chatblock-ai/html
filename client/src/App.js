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
        <ChatContextProvider>
          <WalletConnectionProvider defaultNetwork={'bsc'}>
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
            </BrowserRouter>
        </WalletConnectionProvider>
      </ChatContextProvider >
  )
}

export default App