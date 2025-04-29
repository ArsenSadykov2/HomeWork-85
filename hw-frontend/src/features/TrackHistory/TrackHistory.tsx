import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllTracksHistory } from './trackHistoryThunks';
import {selectTrackHistory, selectTrackHistoryLoading,selectTrackHistoryError } from './trackHistorySlice';
import {  List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { format } from 'date-fns';
import Spinner from "../../components/Spinner/Spinner.tsx";

const TrackHistoryList = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);
    const error = useAppSelector(selectTrackHistoryError);

    useEffect(() => {
        dispatch(fetchAllTracksHistory());
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={3}>
                <Spinner />
            </Box>
        );
    }

    if (error) {
        return (
            <Box color="error.main" p={2}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Listening History
            </Typography>

            <List>
                {tracks.map((item) => (
                    <ListItem key={item._id}>
                        <ListItemText
                            primary={`Track ID: ${item.track}`}
                            secondary={
                                <>
                                    <span>Listened on: {format(new Date(item.date), 'PPpp')}</span>
                                    <br />
                                    <span>User ID: {item.user}</span>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TrackHistoryList;