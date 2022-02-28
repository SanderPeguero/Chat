import React, { useRef, useState, useEffect } from 'react'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from '../contexts/AuthContext'
import { auth } from  '../firebase'

export default function Chats(){
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const history = useHistory()

    async function handleLogout(){
        await auth.signOut()
        history.push("/")
    }

    const getFile = async (url) => {
        let response = await fetch(url)
        let data = await response.blob()
        return new File([data], "text.jpg", {type: 'image/jpeg'})
    }

    useEffect( () => {
        if(!didMountRef.current) {
            didMountRef.current = true

            if(!user || user == null) {
                history.push("/")
                return
            }

            axios.get(
                'https://api.chatengine.io/users/me',
                { headers: { 
                  "project-id": "c08e4699-54f7-4eb4-b0f3-ef78b32cf45e",
                  "user-name": user.email,
                  "user-secret": user.uid
                }}  
            )

            .then(() => setLoading(false))

            .catch(e => {
                let formdata = new FormData()
                formdata.append('email', user.email)
                formdata.append('username', user.email)
                formdata.append('secret', user.uid)

                getFile(user.photoURL)
                .then(avatar => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post(
                        'https://api.chatengine.io/users',
                        formdata,
                        { headers: { "private-key": "ba4ccd61-0347-463f-98d4-3d15130a5999"}}
                    )
                    .then(() => setLoading(false))
                    .catch(e => console.log('e', e.response))
                })
            })
        }
    }, [user, history])


    if (!user || loading ) return <div/>

    return (
        <div className = 'chats-page'>
            <div className = 'nav-bar'>
                <div className = 'logo-tab'>
                    Spectre Coin
                </div>

                <div onClick = {handleLogout} className='logout-tab'>
                    LogOut
                </div>
            </div>

            <ChatEngine 
                height='calc(100vh - 66px'
                projectID={"c08e4699-54f7-4eb4-b0f3-ef78b32cf45e"}
                userName={user.email}
                userSecret={user.uid}

            />
        </div>
    )
}