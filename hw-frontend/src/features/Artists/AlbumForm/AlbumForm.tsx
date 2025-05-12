import Grid from "@mui/material/Grid";
import {Button, MenuItem, TextField} from "@mui/material";
import {useEffect} from "react";
import {AlbumMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectAlbums, selectAlbumsLoading} from "../../Albums/ArtistsSlice.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {albumSchema} from "../../../zodSchemas/albumSchema.ts";
import {fetchAllAlbums} from "../../Albums/ArtistThunks.ts";
import FileInput from "../../../components/FileInput/FileInput.tsx";


interface Props {
    onSubmitAlbum: (album: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmitAlbum}) => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectAlbums);
    const categoriesLoading = useAppSelector(selectAlbumsLoading);
    const {register, handleSubmit, formState: {errors}, setValue} = useForm(
        {
            resolver: zodResolver(albumSchema),
            defaultValues: {
                artist: '',
                title: '',
                date: '',
                image: undefined,
                isPublished: false,
            }
        });


    useEffect(() => {
        dispatch(fetchAllAlbums());

    }, [dispatch, setValue])

    const onSubmit = (data: AlbumMutation) => {
        console.log(data);
        onSubmitAlbum({...data});
    };

    const fileInputChangeHandler = (eFile: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = eFile.target;

        if (files) {
            setValue('image', files[0]);
        }
    };

    return artists && (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        disabled={categoriesLoading}
                        style={{width: '100%'}}
                        id="artist"
                        label="Artist"
                        {...register("artist")}
                        error={!!errors.artist}
                        helperText={errors.artist?.message}
                    >
                        <MenuItem defaultValue='' disabled>Select Artist</MenuItem>
                        {artists.map(artist => (
                            <MenuItem value={artist._id} key={artist._id}>{artist.title}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        label="Title"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        type={'number'}
                        id="date"
                        label="Date"
                        {...register("date")}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                        errors={!!errors.image}
                        helperText={errors.image?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
                        {'Create'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;