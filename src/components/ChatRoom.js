import React, { useEffect, useRef, useState } from 'react'
import { auth, firestore } from '../firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatMessage from '../components/ChatMessage';


const ChatRoom = () => {


    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, []);
    const [messages, Loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')

    );

    const [newMessage, setNewMessage] = useState('');
    //const [message, setmessage] = useState([]);
    const messageEndRef = useRef(null)





    const signOut = async () => {
        if (auth.currentUser !== null) {
            await auth.signOut()
        }

    }
    const sendMessage = async (e) => {
        e.preventDefault()
        console.log('user', user);
        const { uid, photoURL } = auth.currentUser;

        await firestore.collection('messages').add({
            text: newMessage,
            createdAt: Date.now(),
            uid,
            photoURL
        });
        setNewMessage('');

        //messageEndRef.current.scrollIntoView({ behaviour: 'smooth' })
    }




    return (
        <>
            <div>
                <div className="header">
                    <h1>Chat-App</h1>
                    <button onClick={signOut}>SignOut</button>
                </div>
                <form onSubmit={sendMessage}>
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}>

                    </input>

                    <button type="submit">Send</button>
                </form>
                {Loading ? <p>Loading...</p> :
                    <div className='messages'>
                        {messages && messages.map((message) => (

                            <ChatMessage key={message.id} message={message} setNewMessage={setNewMessage} />

                        ))}

                        <div ref={messageEndRef} />
                    </div>
                }

                <div className="delete" >

                </div>
            </div>
        </>
    )
}


export default ChatRoom