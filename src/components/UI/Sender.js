import { Grid, TextField, Box, Button } from "@mui/material";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { v4 as uuid } from 'uuid'

const Sender = () => {

    const [text, setText] = useState('')

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)


    const handleSend = async () => {
        setText('')
        try {
            await updateDoc(doc(db, 'chats', data.chadId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [data.chadId + '.lastMessage']: {
                    text 
                },
                [data.chadId + '.date']: serverTimestamp()
            })
            await updateDoc(doc(db, 'userChats', data.user.uid), {
                [data.chadId + '.lastMessage']: {
                    text 
                },
                [data.chadId + '.date']: serverTimestamp()
            })

        } catch (e) {
            console.log(e)
        }
    }

    

    return (
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', background: '#fff' }}>
            <Box component='form' sx={{ width: '100%' }} onSubmit={e => {
                e.preventDefault()
                handleSend()
                }}>
                <TextField
                    value={text}
                    onChange={e => setText(e.target.value)}
                    sx={{ width: '100%' }}
                    placeholder='Введите сообщение...'
                />
            </Box>
            <Grid sx={{ display: 'flex' }}>
                <Button
                    sx={{
                        background: 'rgba(135,150,240, 1)',
                        color: '#fff',
                        "&:hover": {
                            background: 'rgba(135,150,240, 0.8)',
                        }
                    }}
                    onClick={handleSend}
                >Отправить</Button>
            </Grid>
        </Grid>
    );
}

export default Sender;