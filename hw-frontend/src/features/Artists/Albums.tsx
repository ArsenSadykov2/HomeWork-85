import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {useALbumsStore,} from "./AlbumStore.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import AlbumItem from "./AlbumItem.tsx";
import axiosAPI from "../../axiosApi.ts";

const Artist = () => {
    const { items, fetchLoading, fetchAllAlbums } = useALbumsStore();
    const { search } = useLocation();

    useEffect(() => {
        void fetchAllAlbums(search);
    }, [fetchAllAlbums, search]);

    const handleStatusChange = async (id: string, newStatus: boolean) => {
        try {
            await axiosAPI.patch(`/albums/admin/${id}`, { isPublished: newStatus });
            await fetchAllAlbums(search);
        } catch (error) {
            console.error("Failed to update album status:", error);
        }
    };

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
                                {items.map((album) => (
                                    <li key={album._id}>
                                        <Button
                                            variant="text"
                                            component={Link}
                                            to={`?artist=${album._id}`}
                                        >
                                            {album.title}
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
                                        title={artist.title}
                                        date={artist.date}
                                        id={artist._id}
                                        image={artist.image || undefined}
                                        isPublished={artist.isPublished}
                                        onStatusChange={handleStatusChange}
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