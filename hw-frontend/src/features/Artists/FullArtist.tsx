import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import notFoundPic from "../../assets/images/notFoundPic.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from "../../components/Spinner/Spinner.tsx";
import {apiUrl} from "../../globalConstants.ts";
import {selectArtistsLoading, selectOneArtist} from "./ArtistSlice.ts";
import {fetchArtistById} from "./ArtistThunks.ts";


const FullArtist = () => {
    const dispatch = useAppDispatch();
    const artist = useAppSelector(selectOneArtist);
    const fetchLoading = useAppSelector(selectArtistsLoading);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchArtistById(id));
        }
    }, [id, dispatch]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && artist ?
                <Card sx={{ width: "50%", margin: "0 auto" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={artist?.image ? apiUrl + '/' + artist.image : notFoundPic}
                            alt={artist.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {artist.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {artist.description}
                            </Typography>
                        </CardContent>
                        <IconButton component={NavLink} to='/'>
                            <ArrowBackIcon sx={{fontSize: "14px"}}/>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "10px" }}>
                                Go back home
                            </Typography>
                        </IconButton>
                    </CardActionArea>
                </Card>
                :
                <Typography variant="h6">Not found product</Typography>
            }
        </Container>
    );
};

export default FullArtist;