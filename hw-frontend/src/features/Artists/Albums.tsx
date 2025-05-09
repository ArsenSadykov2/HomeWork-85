import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {useALbumsStore,} from "./AlbumStore.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import AlbumItem from "./AlbumItem.tsx";

const Artist = () => {
    const { items, fetchLoading, fetchAllAlbums } = useALbumsStore();
    const { search } = useLocation();

    useEffect(() => {
        void fetchAllAlbums(search);
    }, [fetchAllAlbums, search]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">Artists</Typography>
                </Grid>
            </Grid>

            {fetchLoading ? (
                <Spinner />
            ) : (
                <Grid container justifyContent="space-between">
                    <Grid size={3}>
                        {items.length > 0 && (
                            <ul>
                                <li>
                                    <Button variant="text" component={Link} to="/">
                                        Все
                                    </Button>
                                </li>
                                {items.map((artist) => (
                                    <li key={artist._id}>
                                        <Button
                                            variant="text"
                                            component={Link}
                                            to={`?artist=${artist._id}`}
                                        >
                                            {artist.name}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Grid>

                    <Grid size={8}>
                        {items.length === 0 ? (
                            <Typography variant="h4">No artists yet</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {items.map(artist => (
                                    <AlbumItem
                                        key={artist._id}
                                        name={artist.name}
                                        description={artist.description}
                                        id={artist._id}
                                        image={artist.image || undefined}
                                    />
                                ))}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default Artist;