import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageLoader from 'app/core/components/PageLoader/PageLoader';
import { importDashboard, removeDashboard } from 'app/features/dashboard/state/actions';
import { loadPluginDashboards } from 'app/features/plugins/admin/state/actions';
import { PluginDashboard, StoreState } from 'app/types';

import DashboardTable from '../components/DashboardsTable';
import { useLoadDataSource } from '../state/hooks';

export type Props = {
  dataSourceId: string;
};

export const DataSourceDashboards = ({ dataSourceId }: Props) => {
  useLoadDataSource(dataSourceId);

  const dispatch = useDispatch();
  const dataSource = useSelector((s: StoreState) => s.dataSources.dataSource);
  const dashboards = useSelector((s: StoreState) => s.plugins.dashboards);
  const isLoading = useSelector((s: StoreState) => s.plugins.isLoadingPluginDashboards);

  // Load plugin dashboards once the datasource is loaded
  useEffect(() => {
    if (dataSource.id > 0) {
      dispatch(loadPluginDashboards());
    }
  }, [dispatch, dataSource]);

  const onImportDashboard = (dashboard: PluginDashboard, overwrite: boolean) => {
    dispatch(
      importDashboard(
        {
          pluginId: dashboard.pluginId,
          path: dashboard.path,
          overwrite,
          inputs: [
            {
              name: '*',
              type: 'datasource',
              pluginId: dataSource.type,
              value: dataSource.name,
            },
          ],
        },
        dashboard.title
      )
    );
  };

  const onRemoveDashboard = (dashboard: PluginDashboard) => {
    dispatch(removeDashboard(dashboard.uid));
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return <DashboardTable dashboards={dashboards} onImport={onImportDashboard} onRemove={onRemoveDashboard} />;
};
