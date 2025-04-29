import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ToolBar from "./components/ToolBar/ToolBar.tsx";
import Artist from "./features/Artists/Artists.tsx";
import FullArtist from "./features/Artists/FullArtist.tsx";
import Register from "./features/Users/Register.tsx";


const App = () => {

    return (
        <>
            <CssBaseline />
            <ToastContainer/>
            <header>
                <ToolBar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Artist/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/artist/:id" element={<FullArtist/>}/>
                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
