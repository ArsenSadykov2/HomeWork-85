import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import notFoundPic from "../../assets/images/notFoundPic.jpg";
import {apiUrl} from "../../globalConstants.ts";


interface Props {
    name: string;
    description: string;
    id: string;
    image: string | undefined;
}

const ArtistItem: React.FC<Props> = ({name, description,  id, image}) => {
    let cartImage = notFoundPic;

    if (image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={name}
                />
                <CardHeader title={name} />
                <CardContent>
                    <p>
                        <strong>
                            Category: {description}
                        </strong>
                    </p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/artists/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ArtistItem;