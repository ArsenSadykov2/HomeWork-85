import {User} from "../../types";
import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";

interface Props {
    user: User
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [userElement, setUserElement] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserElement(event.currentTarget)
    }

    const handleClose = () => {
        setUserElement(null)
    }
    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
            >
                Hello, {user.username}!
            </Button>
            <Menu
                keepMounted
                anchorEl={userElement}
                open={Boolean(userElement)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Button component={NavLink} to='/' onClick={handleClose}>List Of Tracks of Album</Button>
                </MenuItem>
                <MenuItem>My Account</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;