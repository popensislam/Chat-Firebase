import { Grid, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const HeaderOfChat = () => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    return (
        <Grid
            sx={{
                background: '#5E588C',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                minHeight: '60px'
            }}
        >
            <Typography>{data?.user?.displayName}</Typography>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography sx={{ marginRight: '10px' }}>{currentUser?.displayName}</Typography>
            </Grid>
        </Grid>
    );
}

export default HeaderOfChat;