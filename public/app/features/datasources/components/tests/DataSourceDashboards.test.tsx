import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { DataSourceSettings, LayoutModes } from '@grafana/data';
import { getRouteComponentProps } from 'app/core/navigation/__mocks__/routeProps';
import { configureStore } from 'app/store/configureStore';
import { DataSourcesState } from 'app/types';

import { navIndex } from '../../__mocks__/store.navIndex.mock';
import { DataSourceDashboardsPage } from '../../pages/DataSourceDashboardsPage';
import { initialState } from '../../state/reducers';

const setup = (stateOverride?: Partial<DataSourcesState>) => {
  const store = configureStore({
    dataSources: {
      ...initialState,
      dataSources: [] as DataSourceSettings[],
      layoutMode: LayoutModes.Grid,
      hasFetched: false,
      ...stateOverride,
    },
    navIndex,
  });

  return render(
    <Provider store={store}>
      <DataSourceDashboardsPage {...getRouteComponentProps()} />
    </Provider>
  );
};

describe('Render', () => {
  it('should render without exploding', () => {
    expect(() => setup()).not.toThrow();
  });
  it('should render component', () => {
    setup();

    expect(screen.getByRole('heading', { name: 'nav-text' })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Documentation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Support' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Community' })).toBeInTheDocument();
  });
});
