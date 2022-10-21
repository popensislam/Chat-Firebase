import { Grid } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import HeaderOfChat from "../UI/HeaderOfChat";
import Message from "../UI/Message";
import Sender from "../UI/Sender";

const ChatBlock = () => {

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {

        console.log(data)

        const unSub = onSnapshot(doc(db, 'chats', data?.chadId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })


        return () => {
            unSub()
        }
    }, [data.chadId])

    console.log(messages)

    return (
        <Grid
            sx={{
                width: '60%',
                height: '92%',
                background: '#DDDBF5',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderOfChat />
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '90%',
                width: 'auto',
                overflowY: 'scroll',
            }}>
                {messages?.map((m, index) =>
                    <Message message={m} key={index}/>
                )}
            </Grid>
            <div>
                <Sender />
            </div>
        </Grid>
    );
}

export default ChatBlock;