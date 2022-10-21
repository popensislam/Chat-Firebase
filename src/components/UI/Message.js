import { Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({opponent, message}) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const isYou = currentUser.uid === message.senderId

    return ( 
        <Typography sx={{
            alignSelf: !isYou ? 'start' : 'end',
            padding: '10px',
            margin: '5px 10px',
            background: !isYou ? 'blue' : 'green',
            borderRadius: !isYou ? '10px 10px 10px 0' : '10px 10px 0 10px',
            color: '#fff',
        }} component='p'>
            {message.text}
        </Typography>
     );
}
 
export default Message;