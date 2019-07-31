import React from 'react';
// import { Link } from 'react-router-dom';
import * as scope from '@compositor/x0/components';
import { Provider as RebassProvider } from 'rebass'; // Flex, Box, Container
// import sortBy from 'lodash.sortby';

import LandingLayout from './_landing';
import theme from './_theme';
import Logo from './_logo';

const { ScopeProvider, SidebarLayout } = scope;

// const navOrder = [
//   'index',
//   'getting-started',
//   'markdown',
//   'react',
//   'MDX',
//   'JSX',
//   'routing',
//   'custom-app',
//   'components',
//   'ScopeProvider',
//   'SidebarLayout',
//   'LivePreview',
//   'LiveEditor',
//   'cli-options',
//   'exporting',
//   'examples',
// ];
const pageNames = {
  index: 'Home',
  'cli-options': 'CLI Options',
};

const hardRoutes = [
  {
    key: './coverage.md',
    name: 'Coverage',
    href: 'https://nmccready.github.io/react-extras/coverage/lcov-report/',
    path: 'https://nmccready.github.io/react-extras/coverage/lcov-report/',
  },
];

const sortRoutes = (routes) =>
  routes
    .map((route) => {
      if (!pageNames[route.name]) return route;
      return {
        ...route,
        name: pageNames[route.name],
      };
    })
    .concat(hardRoutes);

const App = (props) => {
  const { routes, route } = props;
  const { layout } = (route && route.props) || {};

  const Layout = layout === 'landing' ? LandingLayout : SidebarLayout;

  // ! all routes can be custom sorted again by the doc consumer
  // ! they come pre-sorted, see @compositor/x0/src/entry.js
  const nav = sortRoutes(routes);

  return (
    <ScopeProvider scope={scope}>
      <RebassProvider theme={theme}>
        <Layout {...props} title="react-extras" routes={nav} logo={<Logo size={24} />} />
      </RebassProvider>
    </ScopeProvider>
  );
};

App.defaultProps = {
  title: 'react-extras',
};

export default App;
