import { Grid, Box, TextField, Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import ChatUserItem from "../UI/ChatUserItem";
import HeaderOfUser from "../UI/HeaderOfUser";

const Sidebar = ({ currentUser, setCurrentUser, chats, dispatch }) => {

    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username) {
            setUser(null)
            setErr('')
            return
        }

        const q = await query(
            collection(db, 'users'),
            where('displayName', '==', username)
        )

        try {
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                setErr('Ничего не найдено')
            } else {
                querySnapshot.forEach((doc) => {
                    console.log('gelo')
                    setUser(doc.data())
                })
            }
        } catch (e) {
            setErr('Что то пошло не так :(')
        }
    }

    const handleSelect = async () => {

        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }

            setUser(null)
            setUsername('')
        } catch (err) {
            console.log(err)
        }
    };

    const handleSelectChat = (user) => {
        dispatch({ type: 'CHANGE_USER', payload: user.userInfo })
    }

    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
                height: '92%',
                background: '#eee',
            }}
        >
            <HeaderOfUser currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <Grid
                sx={{
                    background: '#3D395F',
                    height: '100%',
                    color: '#fff',
                    overflow: 'auto',
                }}
            >
                <Box
                    component='form'
                    sx={{
                        borderBottom: '1px solid #eee',
                        padding: '10px 0 10px 15px'
                    }}
                    onSubmit={handleSubmit}
                >
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Поиск юзеров..."
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#fff',
                            fontSize: '18px',
                        }}
                    />
                </Box>
                <Stack>
                    {user && (
                        <>
                            <ChatUserItem userClick={true} handleSelectChat={handleSelectChat} handleSelect={handleSelect} item={user} />
                            <div style={{ width: '100%', borderTop: '1px solid #fff' }}></div>
                        </>
                    )}
                    {err && (
                        <Typography align='center' sx={{ mt: '15px' }}>{err}</Typography>
                    )}
                    {chats?.sort((a, b) => b[1].date - a[1].date).map((chat, index) =>
                        <ChatUserItem key={index} handleSelectChat={handleSelectChat} handleSelect={handleSelect} item={chat[1]} />
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Sidebar;