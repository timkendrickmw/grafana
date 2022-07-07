import { screen, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { DataSourceSettings, LayoutModes } from '@grafana/data';
// import { selectors } from '@grafana/e2e-selectors';
// import { cleanUpAction } from 'app/core/actions/cleanUp';
import { getRouteComponentProps } from 'app/core/navigation/__mocks__/routeProps';
// import { getMockPlugin } from 'app/features/plugins/__mocks__/pluginMocks';
import { configureStore } from 'app/store/configureStore';
import { DataSourcesState } from 'app/types';

// import { getMockDataSource } from '../../__mocks__/dataSourcesMocks';
import { navIndex } from '../../__mocks__/store.navIndex.mock';
import { initialState } from '../../state/reducers';
import { EditDataSourcePage } from '../EditDataSourcePage';

jest.mock('app/core/core', () => {
  return {
    contextSrv: {
      hasPermission: () => true,
      hasPermissionInMetadata: () => true,
    },
  };
});

// const getMockNode = () => ({
//   text: 'text',
//   subTitle: 'subtitle',
//   icon: 'icon',
// });

// const getMockNavModel = () => ({
//   node: getMockNode(),
//   main: getMockNode(),
// });

// const getProps = (): Props => ({
//   ...getRouteComponentProps(),
//   navModel: {
//   },
//   dataSource: getMockDataSource(),
//   dataSourceMeta: getMockPlugin(),
//   dataSourceId: 'x',
//   deleteDataSource: jest.fn(),
//   loadDataSource: jest.fn(),
//   setDataSourceName,
//   updateDataSource: jest.fn(),
//   initDataSourceSettings: jest.fn(),
//   testDataSource: jest.fn(),
//   setIsDefault,
//   dataSourceLoaded,
//   cleanUpAction,
//   page: null,
//   plugin: null,
//   loadError: null,
//   loading: false,
//   testingStatus: {},
// });

const renderPage = (stateOverride?: Partial<DataSourcesState>) => {
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
      <EditDataSourcePage
        {...getRouteComponentProps({
          // @ts-ignore
          match: {
            params: {
              uid: 'foo',
            },
          },
        })}
      />
    </Provider>
  );
};

describe('<EditDataSourcePage>', () => {
  it('should not render loading when props are ready', () => {
    renderPage();

    expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
  });

  // it('should render loading if datasource is not ready', () => {
  //   const mockProps = getProps();
  //   mockProps.dataSource.id = 0;
  //   mockProps.loading = true;

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByText('Loading ...')).toBeInTheDocument();
  // });

  // it('should render beta info text if plugin state is beta', () => {
  //   const mockProps = getProps();
  //   mockProps.dataSourceMeta.state = PluginState.beta;

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByTitle('This feature is close to complete but not fully tested')).toBeInTheDocument();
  // });

  // it('should render alpha info text if plugin state is alpha', () => {
  //   const mockProps = getProps();
  //   mockProps.dataSourceMeta.state = PluginState.alpha;

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(
  //     screen.getByTitle('This feature is experimental and future updates might not be backward compatible')
  //   ).toBeInTheDocument();
  // });

  // it('should not render is ready only message is readOnly is false', () => {
  //   const mockProps = getProps();
  //   mockProps.dataSource.readOnly = false;

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.queryByLabelText(selectors.pages.DataSource.readOnly)).not.toBeInTheDocument();
  // });

  // it('should render is ready only message is readOnly is true', () => {
  //   const mockProps = getProps();
  //   mockProps.dataSource.readOnly = true;

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByLabelText(selectors.pages.DataSource.readOnly)).toBeInTheDocument();
  // });

  // it('should render error message with detailed message', () => {
  //   const mockProps = {
  //     ...getProps(),
  //     testingStatus: {
  //       message: 'message',
  //       status: 'error',
  //       details: { message: 'detailed message' },
  //     },
  //   };

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByText(mockProps.testingStatus.message)).toBeInTheDocument();
  //   expect(screen.getByText(mockProps.testingStatus.details.message)).toBeInTheDocument();
  // });

  // it('should render error message with empty details', () => {
  //   const mockProps = {
  //     ...getProps(),
  //     testingStatus: {
  //       message: 'message',
  //       status: 'error',
  //       details: {},
  //     },
  //   };

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByText(mockProps.testingStatus.message)).toBeInTheDocument();
  // });

  // it('should render error message without details', () => {
  //   const mockProps = {
  //     ...getProps(),
  //     testingStatus: {
  //       message: 'message',
  //       status: 'error',
  //     },
  //   };

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByText(mockProps.testingStatus.message)).toBeInTheDocument();
  // });

  // it('should render verbose error message with detailed verbose error message', () => {
  //   const mockProps = {
  //     ...getProps(),
  //     testingStatus: {
  //       message: 'message',
  //       status: 'error',
  //       details: { message: 'detailed message', verboseMessage: 'verbose message' },
  //     },
  //   };

  //   render(<EditDataSourcePage {...mockProps} />);

  //   expect(screen.getByText(mockProps.testingStatus.details.verboseMessage)).toBeInTheDocument();
  // });
});
