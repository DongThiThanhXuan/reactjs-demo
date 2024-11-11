import { PATH } from "../constant/Route.constant";
import { ComponentType, Suspense } from "react";
import { Navigate, Route, Routes } from 'react-router';
import { IRoute, ROUTES } from "./routes";

const RenderRouter = () => {
    return (
        <Suspense fallback={<h1>loading....</h1>}>
            <Routes>
                <Route path={PATH.BLANK} element={<Navigate to={PATH.HOME} replace />} />
                {ROUTES.map((route: IRoute) => (
                    <Route key={route.path} path={route.path} Component={route.element as ComponentType} />
                ))}
                <Route path='*' element={<Navigate to={PATH.HOME} replace />} />
            </Routes>
        </Suspense>
    );
};

export default RenderRouter;