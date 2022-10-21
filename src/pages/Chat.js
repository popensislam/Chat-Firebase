import { Container, Grid, Box, TextField, Typography, Button, } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ChatBlock from "../components/ChatBlock";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chat = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const [chats, setChats] = useState([])

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data())
            })
            return () => {
                unsub()
            }
        }


        currentUser.uid && getChats()
    }, [currentUser.uid])

    console.log(Object.entries(chats));

    return (
        <Container>
            <Grid
                container
                sx={{ height: window.innerHeight - 50, width: '100%' }}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Grid
                    container
                    sx={{ display: 'flex', height: '80%', width: '100%' }}
                >
                    <Sidebar dispatch={dispatch} chats={Object.entries(chats)} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    <ChatBlock />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;