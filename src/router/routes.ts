import React, { FC, ReactElement, ReactNode } from 'react';
import { PATH } from '../constant/Route.constant';



const HomeContainer = React.lazy(() => import('../container/product'));
export interface IRoute {
    path: string;
    element: ReactNode | ReactElement | FC;
}

export const ROUTES: IRoute[] = [
    {
        path: PATH.HOME,
        element: HomeContainer,
    },
    {
        path: PATH.BLANK,
        element: HomeContainer,
    }
];
