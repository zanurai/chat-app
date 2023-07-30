
import './App.css';

import ChatRoom from './components/ChatRoom';
import SignInGoogle from './components/SignInGoogle';
import { auth, firestore } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user, Loading] = useAuthState(auth);

  if (Loading) {
    return <p>Loading...</p>
  }
  return (
    <div className="App">
      {user ? <ChatRoom firestore={firestore} auth={auth} /> : <SignInGoogle />}

    </div>
  );
}

export default App;
