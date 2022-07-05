import React from 'react';

import { DataSourceSettings } from '@grafana/data';
import { Button } from '@grafana/ui';
import { contextSrv } from 'app/core/core';
import { DataSourceSettingsState, AccessControlAction } from 'app/types';

import { DataSourceReadOnlyMessage } from './DataSourceReadOnlyMessage';

export type Props = {
  loadError: DataSourceSettingsState['loadError'];
  dataSource: DataSourceSettings;
  onDelete: () => void;
};

export const DataSourceLoadError = ({ loadError, dataSource, onDelete }: Props) => {
  const isReadOnly = dataSource.readOnly === true;
  const hasDeleteRights = contextSrv.hasPermissionInMetadata(AccessControlAction.DataSourcesDelete, dataSource);
  const canDelete = !isReadOnly && hasDeleteRights;
  const navigateBack = () => history.back();

  return (
    <>
      {isReadOnly && <DataSourceReadOnlyMessage />}

      <div className="gf-form-button-row">
        {canDelete && (
          <Button type="submit" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        )}

        <Button variant="secondary" fill="outline" type="button" onClick={navigateBack}>
          Back
        </Button>
      </div>
    </>
  );
};
