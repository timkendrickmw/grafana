import React from 'react';

import Page from 'app/core/components/Page/Page';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';

import { DataSourceSettings } from '../components/DataSourceSettings';
import { useDataSourceSettingsNav } from '../state';

export interface Props extends GrafanaRouteComponentProps<{ uid: string }> {}

export const EditDataSourcePage = (props: Props) => {
  const dataSourceId = props.match.params.uid;
  const params = new URLSearchParams(props.location.search);
  const pageId = params.get('page');
  const nav = useDataSourceSettingsNav(dataSourceId, pageId);

  return (
    <Page navModel={nav}>
      <Page.Contents>
        <DataSourceSettings id={dataSourceId} pageId={pageId} />
      </Page.Contents>
    </Page>
  );
};

export default EditDataSourcePage;
