import React from 'react';

import { selectors as e2eSelectors } from '@grafana/e2e-selectors';
import { Alert } from '@grafana/ui';

export const DataSourceReadOnlyMessage = () => {
  return (
    <Alert aria-label={e2eSelectors.pages.DataSource.readOnly} severity="info" title="Provisioned data source">
      This data source was added by config and cannot be modified using the UI. Please contact your server admin to
      update this data source.
    </Alert>
  );
};
