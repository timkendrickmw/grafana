import { DataSourceSettings } from '@grafana/data';

import { getMockDataSourceSettings } from '../../../../features/datasources/__mocks__';
import { PromOptions } from '../types';

export function createDefaultConfigOptions(): DataSourceSettings<PromOptions> {
  return getMockDataSourceSettings<PromOptions>({
    timeInterval: '1m',
    queryTimeout: '1m',
    httpMethod: 'GET',
    directUrl: 'url',
  });
}
