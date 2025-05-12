import {Typography} from "@mui/material";
import {AlbumMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createAdminAlbum} from "../admin/albums/albumsAdminThunks.ts";
import AlbumForm from "./AlbumForm/AlbumForm.tsx";

const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewProduct = async (album: AlbumMutation) => {
        try {
            await dispatch(createAdminAlbum(album)).unwrap();
            toast.success("Album was successfully created!");
            navigate('/');
        } catch (e) {
            toast.error("Album was not successfully created");
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New album
            </Typography>
            <AlbumForm onSubmitAlbum={onCreateNewProduct}/>
        </>
    );
};

export default NewAlbum;