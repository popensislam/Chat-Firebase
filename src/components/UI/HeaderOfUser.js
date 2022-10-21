import { Grid, Typography, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";
import { auth } from "../../firebase";

const HeaderOfUser = ({ currentUser, setCurrentUser }) => {

    const navigate = useNavigate()

    const { dispatch } = useContext(ChatContext)

    const LogOut = async () => {
        await signOut(auth)
        navigate('/login')
        setCurrentUser({})
        dispatch({type: 'CLEAR_USER'})
    }

    return (
        <Grid
            sx={{
                background: '#2E2A50',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                height: '60px'
            }}
        >
            <Typography>Online Chat</Typography>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography sx={{ marginRight: '10px' }}>{currentUser.displayName}</Typography>
                <Button size="small" onClick={() => LogOut()}>logout</Button>
            </Grid>
        </Grid>
    );
}

export default HeaderOfUser;