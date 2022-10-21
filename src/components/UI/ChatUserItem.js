import { Grid, Typography } from "@mui/material";

const ChatUserItem = ({ userClick, item, index, handleSelect, handleSelectChat }) => {

    return (
        <Grid
            onClick={() => {
                if (!userClick) {
                    handleSelectChat(item)
                } else {
                    handleSelect()
                }
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 10px 10px 15px',
                background: 'rgba(188, 186, 186, 0.0)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                "&:hover": {
                    background: 'rgba(188, 186, 186, 0.1)',
                }
            }}
        >
            <Typography variant="h5">{userClick ? item?.displayName : item?.userInfo?.displayName}</Typography>
            <Typography sx={{ opacity: '0.6' }}>
                {item?.lastMessage?.text.length > 50
                ? item?.lastMessage?.text.slice(0, 50) + '...'
                : item?.lastMessage?.text}
            </Typography>
        </Grid>
    );
}

export default ChatUserItem;