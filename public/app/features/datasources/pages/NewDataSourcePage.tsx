import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavModel } from '@grafana/data';
import { LinkButton, FilterInput } from '@grafana/ui';
import Page from 'app/core/components/Page/Page';
import { PluginsErrorsInfo } from 'app/features/plugins/components/PluginsErrorsInfo';
import { StoreState } from 'app/types';

import { DataSourceCategories } from '../components/DataSourceCategories';
import { DataSourceTypeCardList } from '../components/DataSourceTypeCardList';
import { useAddDatasource, useLoadDataSourcePlugins } from '../state';
import { setDataSourceTypeSearchQuery } from '../state/reducers';
import { getFilteredDataSourcePlugins } from '../state/selectors';

export const NewDataSourcePage = () => {
  useLoadDataSourcePlugins();
  const dispatch = useDispatch();
  const filteredDataSourcePlugins = useSelector((s: StoreState) => getFilteredDataSourcePlugins(s.dataSources));
  const searchQuery = useSelector((s: StoreState) => s.dataSources.dataSourceTypeSearchQuery);
  const isLoading = useSelector((s: StoreState) => s.dataSources.isLoadingDataSources);
  const categories = useSelector((s: StoreState) => s.dataSources.categories);
  const navModel = getNavModel();
  const onAddDataSource = useAddDatasource();
  const onSearchQueryChange = (q: string) => dispatch(setDataSourceTypeSearchQuery(q));

  return (
    <Page navModel={navModel}>
      <Page.Contents isLoading={isLoading}>
        {/* Search */}
        <div className="page-action-bar">
          <FilterInput value={searchQuery} onChange={onSearchQueryChange} placeholder="Filter by name or type" />
          <div className="page-action-bar__spacer" />
          <LinkButton href="datasources" fill="outline" variant="secondary" icon="arrow-left">
            Cancel
          </LinkButton>
        </div>

        {/* Show any plugin errors while not searching for anything specific */}
        {!searchQuery && <PluginsErrorsInfo />}

        {/* Search results */}
        <div>
          {searchQuery && (
            <DataSourceTypeCardList
              dataSourcePlugins={filteredDataSourcePlugins}
              onClickDataSourceType={onAddDataSource}
            />
          )}
          {!searchQuery && <DataSourceCategories categories={categories} onClickDataSourceType={onAddDataSource} />}
        </div>
      </Page.Contents>
    </Page>
  );
};

export function getNavModel(): NavModel {
  const main = {
    icon: 'database',
    id: 'datasource-new',
    text: 'Add data source',
    href: 'datasources/new',
    subTitle: 'Choose a data source type',
  };

  return {
    main: main,
    node: main,
  };
}
