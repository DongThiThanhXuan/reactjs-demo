import React, { FC, ReactElement, ReactNode } from 'react';
import { PATH } from '../constant/Route.constant';
import AddNewProductContainer from '@/container/AddNewProduct';
import TestContainer from '@/container/Test';



const HomeContainer = React.lazy(() => import('../container/Home'));

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
    ,
    {
        path: PATH.ADD_NEW_PRODUCT,
        element: AddNewProductContainer,
    },
    {
        path: PATH.TEST,
        element: TestContainer,
    }
];
