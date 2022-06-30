import { SafeDynamicImport } from 'app/core/components/DynamicImports/SafeDynamicImport';
import { config } from 'app/core/config';
import { RouteDescriptor } from 'app/core/navigation/types';

import { ROUTE_BASE_ID } from './constants';

// We are having this as a separate function due to only adding it to the app routes in case the feature toggle is enabled
export function getRoutes(): RouteDescriptor[] {
  if (config.featureToggles.dataConnectionsConsole) {
    return [
      {
        path: `/${ROUTE_BASE_ID}`,
        exact: false,
        component: SafeDynamicImport(
          () => import(/* webpackChunkName: "DataConnectionsPage"*/ 'app/features/data-connections/DataConnectionsPage')
        ),
      },
    ];
  }

  return [];
}
