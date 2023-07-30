import React, { useState } from 'react';
import { auth, firestore } from '../firebase'

const ChatMessage = ({ message, setNewMessage }) => {
    const [messages, setMessages] = useState([])
    //let preMessages = []
    if (!message) {
        return null
    }
    const { text, uid, photoURL } = message;

    if (!uid || uid !== auth.currentUser?.uid) {
        return null;
    }
    // if (!uid || !auth.currentUser || uid !== auth.currentUser.uid) {
    //     return null;
    // }
    const handleDelete = async () => {
        try {

            console.log('message delete:', uid)
            await firestore.collection('messages').doc(uid).delete();
            console.log("message  delete successfully!")
            //setNewMessage(prevMessages => prevMessages.filter(msg => msg.uid !== uid));
            setMessages(prevMessages => {
                if (!Array.isArray(prevMessages)) {
                    console.log('prevMessage is not a array', prevMessages)
                    return prevMessages
                }
                return prevMessages.filter(uid => uid.message !== messages)
            })
        } catch (err) {
            console.error('remove the error message:', err)
        }
    }

    // const newMessages = prevMessages.filter(msg => msg.uid !== uid);
    // setPrevMessages(newMessages)
    // setNewMessage(newMessages)
    return (
        <div className={`message${uid === auth.currentUser.uid ? "sent" : "recevied"}`}>
            <img src={photoURL} alt="user" />
            <p>{text}</p>
            {uid === auth.currentUser.uid && (
                <button type="delete" onClick={handleDelete}>Delete</button>
            )}
        </div>
    )
}

export default ChatMessage