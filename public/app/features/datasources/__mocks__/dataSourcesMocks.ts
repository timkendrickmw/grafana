import { DataSourceSettings } from '@grafana/data';

export const getMockDataSources = (amount: number) => {
  const dataSources = [];

  for (let i = 0; i < amount; i++) {
    dataSources.push({
      access: '',
      basicAuth: false,
      database: `database-${i}`,
      id: i,
      isDefault: false,
      jsonData: { authType: 'credentials', defaultRegion: 'eu-west-2' },
      name: `dataSource-${i}`,
      orgId: 1,
      readOnly: false,
      type: 'cloudwatch',
      typeLogoUrl: 'public/app/plugins/datasource/cloudwatch/img/amazon-web-services.png',
      url: '',
      user: '',
    });
  }

  return dataSources as DataSourceSettings[];
};

export const getMockDataSource = (): DataSourceSettings => {
  return {
    access: '',
    basicAuth: false,
    basicAuthUser: '',
    withCredentials: false,
    database: '',
    id: 13,
    uid: 'x',
    isDefault: false,
    jsonData: { authType: 'credentials', defaultRegion: 'eu-west-2' },
    name: 'gdev-cloudwatch',
    typeName: 'Cloudwatch',
    orgId: 1,
    readOnly: false,
    type: 'cloudwatch',
    typeLogoUrl: 'public/app/plugins/datasource/cloudwatch/img/amazon-web-services.png',
    url: '',
    user: '',
    secureJsonFields: {},
  };
};

export function getMockDataSourceSettings<T>(jsonData: T): DataSourceSettings<T> {
  return {
    id: 0,
    uid: 'x',
    orgId: 0,
    name: 'datasource-test',
    typeLogoUrl: '',
    type: 'datasource',
    typeName: 'Datasource',
    access: 'server',
    url: 'http://localhost',
    user: '',
    database: '',
    basicAuth: false,
    basicAuthUser: '',
    isDefault: false,
    jsonData,
    readOnly: false,
    withCredentials: false,
    secureJsonFields: {},
  };
}
