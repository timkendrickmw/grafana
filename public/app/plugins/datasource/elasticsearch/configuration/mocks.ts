import { DataSourceSettings } from '@grafana/data';

import { getMockDataSourceSettings } from '../../../../features/datasources/__mocks__';
import { ElasticsearchOptions } from '../types';

export function createDefaultConfigOptions(
  options?: Partial<ElasticsearchOptions>
): DataSourceSettings<ElasticsearchOptions> {
  return getMockDataSourceSettings<ElasticsearchOptions>({
    timeField: '@time',
    esVersion: '7.0.0',
    interval: 'Hourly',
    timeInterval: '10s',
    maxConcurrentShardRequests: 300,
    logMessageField: 'test.message',
    logLevelField: 'test.level',
    ...options,
  });
}
