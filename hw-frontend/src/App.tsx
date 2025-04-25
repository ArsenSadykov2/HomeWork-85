import {Container, CssBaseline, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ToolBar from "./components/ToolBar/ToolBar.tsx";


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
                        {/*<Route path="/" element={<Products/>}/>*/}
                        {/*<Route path="/register" element={<Register/>}/>*/}
                        {/*<Route path="/products/:id" element={<FullProduct/>}/>*/}
                        {/*<Route path="/products/:product_id/edit" element={<EditProduct/>}/>*/}
                        {/*<Route path="/products/new" element={<NewProduct/>}/>*/}
                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App
