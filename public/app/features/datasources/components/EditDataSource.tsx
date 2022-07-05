import React from 'react';
import { useDispatch } from 'react-redux';

import { DataSourceSettings as DataSourceSettingsType } from '@grafana/data';
import PageLoader from 'app/core/components/PageLoader/PageLoader';

import {
  dataSourceLoaded,
  setDataSourceName,
  setIsDefault,
  updateDataSource,
  useDataSource,
  useDataSourceExploreUrl,
  useDataSourceMeta,
  useDataSourceRights,
  useDataSourceSettings,
  useDeleteLoadedDataSource,
  useInitDataSourceSettings,
  useTestDataSource,
} from '../state';

import BasicSettings from './BasicSettings';
import ButtonRow from './ButtonRow';
import { CloudInfoBox } from './CloudInfoBox';
import { DataSourceLoadError } from './DataSourceLoadError';
import { DataSourceMissingRightsMessage } from './DataSourceMissingRightsMessage';
import { DataSourcePluginConfigPage } from './DataSourcePluginConfigPage';
import { DataSourcePluginSettings } from './DataSourcePluginSettings';
import { DataSourcePluginState } from './DataSourcePluginState';
import { DataSourceReadOnlyMessage } from './DataSourceReadOnlyMessage';
import { DataSourceTestingStatus } from './DataSourceTestingStatus';

export type Props = {
  // The ID of the data source
  id: string;
  // The ID of the custom datasource setting page
  pageId?: string | null;
};

export const EditDataSource = ({ id, pageId }: Props) => {
  useInitDataSourceSettings(id);

  const dispatch = useDispatch();
  const dataSource = useDataSource(id);
  const dataSourceMeta = useDataSourceMeta(id);
  const { plugin, loadError, testingStatus, loading } = useDataSourceSettings(id);
  const { readOnly, hasWriteRights, hasDeleteRights } = useDataSourceRights(id);
  const hasDataSource = dataSource.id > 0;
  const exploreUrl = useDataSourceExploreUrl(id);
  const onDelete = useDeleteLoadedDataSource();
  const onDefaultChange = (value: boolean) => dispatch(setIsDefault(value));
  const onNameChange = (name: string) => dispatch(setDataSourceName(name));
  const onOptionsChange = (ds: DataSourceSettingsType) => dispatch(dataSourceLoaded(ds));
  const onTest = useTestDataSource(id);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(updateDataSource({ ...dataSource }));

    onTest();
  };

  if (loadError) {
    return <DataSourceLoadError loadError={loadError} dataSource={dataSource} onDelete={onDelete} />;
  }

  if (loading) {
    return <PageLoader />;
  }

  // TODO - is this needed?
  if (!hasDataSource) {
    return null;
  }

  if (pageId) {
    return <DataSourcePluginConfigPage pageId={pageId} plugin={plugin} />;
  }

  return (
    <form onSubmit={onSubmit}>
      {!hasWriteRights && <DataSourceMissingRightsMessage />}
      {readOnly && <DataSourceReadOnlyMessage />}
      {dataSourceMeta.state && <DataSourcePluginState state={dataSourceMeta.state} />}

      <CloudInfoBox dataSource={dataSource} />

      <BasicSettings
        dataSourceName={dataSource.name}
        isDefault={dataSource.isDefault}
        onDefaultChange={onDefaultChange}
        onNameChange={onNameChange}
      />

      {plugin && (
        <DataSourcePluginSettings
          plugin={plugin}
          dataSource={dataSource}
          dataSourceMeta={dataSourceMeta}
          onModelChange={onOptionsChange}
        />
      )}

      <DataSourceTestingStatus testingStatus={testingStatus} />

      <ButtonRow
        onSubmit={onSubmit}
        onDelete={onDelete}
        onTest={onTest}
        exploreUrl={exploreUrl}
        canSave={!readOnly && hasWriteRights}
        canDelete={!readOnly && hasDeleteRights}
      />
    </form>
  );
};
