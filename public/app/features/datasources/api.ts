import { DataSourceSettings } from '@grafana/data';
import { getBackendSrv } from 'app/core/services/backend_srv';
import { lastValueFrom } from 'rxjs';

import { DataSourcePluginMeta, DataSourceSettings, locationUtil } from '@grafana/data';
import {
  DataSourceWithBackend,
  getDataSourceSrv,
  HealthCheckError,
  HealthCheckResultDetails,
  isFetchError,
  locationService,
} from '@grafana/runtime';
import { updateNavIndex } from 'app/core/actions';
import { getBackendSrv } from 'app/core/services/backend_srv';
import { contextSrv } from 'app/core/services/context_srv';
import { accessControlQueryParam } from 'app/core/utils/accessControl';
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { getPluginSettings } from 'app/features/plugins/pluginSettings';
import { importDataSourcePlugin } from 'app/features/plugins/plugin_loader';
import { DataSourcePluginCategory, ThunkDispatch, ThunkResult } from 'app/types';

import { nameExits, findNewName } from '../utils';
import * as api from '../api';

import { buildCategories } from './buildCategories';
import { buildNavModel } from './navModel';
import {
  dataSourceLoaded,
  dataSourceMetaLoaded,
  dataSourcePluginsLoad,
  dataSourcePluginsLoaded,
  dataSourcesLoaded,
  initDataSourceSettingsFailed,
  initDataSourceSettingsSucceeded,
  testDataSourceFailed,
  testDataSourceStarting,
  testDataSourceSucceeded,
} from './reducers';
import { getDataSource, getDataSourceMeta } from './selectors';

export const getDataSources = async (): Promise<DataSourceSettings[]> => {
  return await getBackendSrv().get('/api/datasources');
};

/**
 * @deprecated Use `getDataSourceByUid` instead.
 */
export const getDataSourceById = async (id: string) => {
  const response = await lastValueFrom(
    getBackendSrv().fetch<DataSourceSettings>({
      method: 'GET',
      url: `/api/datasources/${id}`,
      params: accessControlQueryParam(),
      showErrorAlert: false,
    })
  );

  // If the uid is a number, then this is a refresh on one of the settings tabs
  // and we can return the response data
  if (response.ok && typeof uid === 'number' && response.data.id === uid) {
    return response.data;
  }

  // Not ideal to do a full page reload here but so tricky to handle this
  // otherwise We can update the location using react router, but need to
  // fully reload the route as the nav model page index is not matching with
  // the url in that case. And react router has no way to unmount remount a
  // route
  if (response.ok && response.data.id.toString() === uid) {
    window.location.href = locationUtil.assureBaseUrl(`/datasources/edit/${response.data.uid}`);
    return {} as DataSourceSettings; // avoids flashing an error
  }

  return null;
};

export const getDataSourceByUid = async (uid: string) => {
  const response = await lastValueFrom(
    getBackendSrv().fetch<DataSourceSettings>({
      method: 'GET',
      url: `/api/datasources/uid/${uid}`,
      params: accessControlQueryParam(),
      showErrorAlert: false,
    })
  );

  if (response.ok) {
    return response.data;
  }

  return null;
};

/**
 * Get data source by uid or id, if old id detected handles redirect
 */
export async function getDataSourceUsingUidOrId(uid: string | number): Promise<DataSourceSettings> {
  // Try first with uid api
  try {
    const dataSource = await getDataSourceByUid();

    if (byUid.ok) {
      return byUid.data;
    }
  } catch (err) {
    console.log('Failed to lookup data source by uid', err);
  }

  // try lookup by old db id
  const id = typeof uid === 'string' ? parseInt(uid, 10) : uid;
  if (!Number.isNaN(id)) {
    const response = await lastValueFrom(
      getBackendSrv().fetch<DataSourceSettings>({
        method: 'GET',
        url: `/api/datasources/${id}`,
        params: accessControlQueryParam(),
        showErrorAlert: false,
      })
    );

    // If the uid is a number, then this is a refresh on one of the settings tabs
    // and we can return the response data
    if (response.ok && typeof uid === 'number' && response.data.id === uid) {
      return response.data;
    }

    // Not ideal to do a full page reload here but so tricky to handle this
    // otherwise We can update the location using react router, but need to
    // fully reload the route as the nav model page index is not matching with
    // the url in that case. And react router has no way to unmount remount a
    // route
    if (response.ok && response.data.id.toString() === uid) {
      window.location.href = locationUtil.assureBaseUrl(`/datasources/edit/${response.data.uid}`);
      return {} as DataSourceSettings; // avoids flashing an error
    }
  }

  throw Error('Could not find data source');
}
