import Grid from "@mui/material/Grid";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import notFoundPic from "../../assets/images/notFoundPic.jpg";
import {apiUrl} from "../../globalConstants.ts";
import {useState} from "react";
import axiosAPI from "../../axiosApi.ts";


interface Props {
    title: string;
    date: string;
    id: string;
    image: string | undefined;
    isPublished: boolean;
    onStatusChange?: (id: string, newStatus: boolean) => void;
    userRole?: string;
}

const AlbumItem: React.FC<Props> = ({title, date,  id, image, isPublished, onStatusChange, userRole}) => {

    const [currentPublishedStatus, setCurrentPublishedStatus] = useState(isPublished);
    const [isLoading, setIsLoading] = useState(false);

    let cartImage = notFoundPic;

    if (image) {
        cartImage = apiUrl + '/' + image;
    }

    const handleTogglePublish = async () => {
        setIsLoading(true);
        try {
            const newStatus = !currentPublishedStatus;

            const response = await axiosAPI.patch(`/admin/albums/${id}`, {
                isPublished: newStatus
            });

            setCurrentPublishedStatus(newStatus);

            if (onStatusChange) {
                onStatusChange(id, response.data);
            }

        } catch (error) {
            console.error('Error updating publish status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                />
                <CardHeader title={title} />
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        <strong>Album: {title}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date: {date}
                    </Typography>
                    <Typography
                        variant="body2"
                        color={isPublished ? "success.main" : "error.main"}
                        sx={{ mt: 1 }}
                    >
                        {isPublished ? "✅ Published" : "❌ Not Published"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/albums/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                    {userRole === 'admin' && (
                        <Button
                            onClick={handleTogglePublish}
                            disabled={isLoading}
                            variant="outlined"
                            size="small"
                            color={currentPublishedStatus ? "success" : "error"}
                            sx={{ mr: 1 }}
                        >
                            {isLoading ? "Processing..." : "Toggle Status"}
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AlbumItem;