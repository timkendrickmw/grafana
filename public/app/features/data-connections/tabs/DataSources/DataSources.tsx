import React, { ReactElement } from 'react';

import { DataSourcesListPageContent } from 'app/features/datasources/components/DataSourcesListPageContent';

export function DataSources(): ReactElement | null {
  return (
    <DataSourcesListPageContent
      newDataSourceLink="/data-connections/data-sources/new"
      getDataSourcesEditLink={(uid: string) => `/data-connections/data-sources/edit/${uid}`}
    />
  );
}
