import React from 'react'
import { auth, firestore } from '../firebase'
import firebase from 'firebase/compat/app';
function SignInGoogle() {
    const SignInGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider)
    }
    return (
        <div>
            <div className="sign-up">
                <button onClick={SignInGoogle}>Sign  with Google</button>
            </div>
        </div>
    )
}

export default SignInGoogle
