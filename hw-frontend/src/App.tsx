import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ToolBar from "./components/ToolBar/ToolBar.tsx";
import Artist from "./features/Artists/Albums.tsx";
import FullAlbum from "./features/Artists/FullAlbum.tsx";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import TrackHistoryList from "./features/TrackHistory/TrackHistory.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/Users/userSlice.ts";
import NewAlbum from "./features/Artists/NewAlbum.tsx";


const App = () => {

    const user = useAppSelector(selectUser);

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
                        <Route path="/login" element={<Login/>}/>

                        <Route path='admin' element={
                            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                                <Route path='/albums/new' element={<NewAlbum/>}/>
                                <Route path="/albums/:id" element={<FullAlbum/>}/>
                            </ProtectedRoute>
                        }>
                        </Route>
                        <Route path="/trackHistories" element={<TrackHistoryList/>}/>
                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
