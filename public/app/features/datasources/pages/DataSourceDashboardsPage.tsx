import React from 'react';
import { useSelector } from 'react-redux';

import Page from 'app/core/components/Page/Page';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { getNavModel } from 'app/core/selectors/navModel';
import { StoreState } from 'app/types';

import { DataSourceDashboards } from '../components/DataSourceDashboards';

export interface Props extends GrafanaRouteComponentProps<{ uid: string }> {}

export const DataSourceDashboardsPage = (props: Props) => {
  const dataSourceId = props.match.params.uid;
  const navIndex = useSelector((s: StoreState) => s.navIndex);
  const navModel = getNavModel(navIndex, `datasource-dashboards-${dataSourceId}`);

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <DataSourceDashboards dataSourceId={dataSourceId} />
      </Page.Contents>
    </Page>
  );
};

export default DataSourceDashboardsPage;
