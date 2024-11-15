import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from './router';
import localeVI from 'antd/locale/vi_VN';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { ConfigProvider, Layout, theme, Row, Col } from 'antd';
import HeaderArchitect from './components/layout/Header';
import { Content } from 'antd/es/layout/layout';
import BreadcrumbArchitect from './components/layout/Breadcrumb';
import { ELangSystem } from './constant/Enum.constant';

dayjs.extend(updateLocale);
dayjs.updateLocale(ELangSystem.VIETNAM, {
  weekStart: 1,
});
function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <React.Fragment>
      <ConfigProvider locale={localeVI}>
        <BrowserRouter>
          <Layout style={{ minHeight: '100vh' }}>
            <HeaderArchitect />
            <Content style={{ padding: '0 50px' }}>
              {/* <BreadcrumbArchitect /> */}
              <Layout
                style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
              >
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <RenderRouter />
                </Content>
              </Layout>
            </Content>
          </Layout>

        </BrowserRouter>
      </ConfigProvider>
    </React.Fragment>
  );
}

export default App;
