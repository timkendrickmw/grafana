import { DataQuery, DataSourceApi, DataSourceJsonData, DataSourcePlugin } from '@grafana/data';

export type GenericDataSourcePlugin = DataSourcePlugin<DataSourceApi<DataQuery, DataSourceJsonData>>;
