import * as React from "react";
import { Route, Routes } from 'react-router-dom';
import { listRoutes } from "./listRoutes";

const AppRouter = () => {
    return (
        <Routes>
            {listRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
        </Routes>
    );
}

export default AppRouter;
