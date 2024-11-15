import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { PATH } from '@/constant/Route.constant';
import i18n from '@/i18n/i18n';
import { HomeFilled, PlusSquareFilled } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';

const { Header } = Layout;

interface MenuItem {
    key: string;
    path: string;
    icon: JSX.Element;
    label: string;
}

const items: MenuItem[] = [
    {
        key: '1',
        path: PATH.HOME,
        icon: <HomeFilled />,
        label: i18n.t('page.title.home'),
    },
    {
        key: '2',
        path: PATH.ADD_NEW_PRODUCT,
        icon: <PlusSquareFilled />,
        label: i18n.t('page.title.add-new-product'),
    },

    {
        key: '3',
        path: PATH.TEST,
        icon: <PlusSquareFilled />,
        label: 'Test',
    },
];

const HeaderArchitect: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [current, setCurrent] = useState<string>('1');

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const selectedItem = items.find((item) => item.key === e.key);
        if (selectedItem) {
            setCurrent(e.key);
            navigate(selectedItem.path);
        }
    };

    useEffect(() => {
        const currentRoute = items.find((item) =>
            location.pathname.includes(item.path)
        );
        if (currentRoute) setCurrent(currentRoute?.key);
    }, [location.pathname]);

    return (
        <>
            <div className="logo" />
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[current]}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                    onClick={handleMenuClick}
                />
            </Header>
        </>
    );
};

export default HeaderArchitect;