import Grid from "@mui/material/Grid";
import {Button, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useArtistStore} from "./ArtistStore.ts";
import {fetchAllAlbums} from "../Albums/AlbumThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import ArtistItem from "./ArtistItem.tsx";
import {selectArtists} from "./ArtistSlice.ts";


const Artist = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const {items, fetchLoading, fetchAllArtists} = useArtistStore();
    const {search} = useLocation();


    useEffect(() => {
        void fetchAllArtists(search);
        dispatch(fetchAllAlbums());
    }, [fetchAllArtists, dispatch, search])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Artists
                    </Typography>
                </Grid>
            </Grid>
            {fetchLoading ? <Spinner/> :
                <Grid container justifyContent="space-between">

                    <Grid size={3}>
                        {artists.length > 0 ?
                            <ul>
                                <li><Button variant="text" component={Link} to={`/`}>Все</Button></li>
                                {artists.map(artist => (
                                    <li key={artist._id}><Button variant="text" component={Link} to={`?album=${artist.name}`}>{artist.description}</Button></li>
                                ))}
                            </ul>
                            :
                            null
                        }
                    </Grid>

                    <Grid size={8}>
                        {items.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                            <Grid container direction="row" spacing={1}>
                                {items.map(artist => (
                                    <ArtistItem
                                        key={artist.id}
                                        name={artist.name}
                                        description={artist.description}
                                        id={artist.id}
                                        image={artist.image || undefined}
                                    />
                                ))}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            }

        </Grid>
    );
};

export default Artist;