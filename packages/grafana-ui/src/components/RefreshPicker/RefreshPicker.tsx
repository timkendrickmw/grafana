import { i18n, MessageDescriptor } from '@lingui/core';
import { t, defineMessage } from '@lingui/macro';
import formatDuration from 'date-fns/formatDuration';
import React, { PureComponent } from 'react';

import { SelectableValue, parseDuration } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';

import { ButtonGroup } from '../Button';
import { ButtonSelect } from '../Dropdown/ButtonSelect';
import { ToolbarButtonVariant, ToolbarButton } from '../ToolbarButton';

// Default intervals used in the refresh picker component
// TODO: How to translate these?
export const defaultIntervals = ['5s', '10s', '30s', '1m', '5m', '15m', '30m', '1h', '2h', '1d'];

export interface Props {
  intervals?: string[];
  onRefresh?: () => any;
  onIntervalChanged: (interval: string) => void;
  value?: string;
  tooltip?: string;
  isLoading?: boolean;
  isLive?: boolean;
  text?: string;
  noIntervalPicker?: boolean;
  width?: string;
  primary?: boolean;
}

interface UntranslatedOption {
  label: MessageDescriptor;
  value: string;
  ariaLabel: MessageDescriptor;
}

export class RefreshPicker extends PureComponent<Props> {
  static offOption = {
    label: defineMessage({
      id: 'grafana-ui.refresh-picker.off-label',
      message: 'Off',
    }),
    value: '',
    ariaLabel: defineMessage({
      id: 'grafana-ui.refresh-picker.off-arialabel',
      message: 'Turn off auto refresh',
    }),
  };
  static liveOption = {
    label: defineMessage({
      id: 'grafana-ui.refresh-picker.live-label',
      message: 'Live',
    }),
    value: 'LIVE',
    ariaLabel: defineMessage({
      id: 'grafana-ui.refresh-picker.live-arialabel',
      message: 'Turn on live streaming',
    }),
  };
  static isLive = (refreshInterval?: string): boolean => refreshInterval === RefreshPicker.liveOption.value;
  static translateOption = (option: UntranslatedOption) => ({
    value: option.value,
    label: i18n._(option.label),
    ariaLabel: i18n._(option.ariaLabel),
  });

  constructor(props: Props) {
    super(props);
  }

  onChangeSelect = (item: SelectableValue<string>) => {
    const { onIntervalChanged } = this.props;
    if (onIntervalChanged) {
      // @ts-ignore
      onIntervalChanged(item.value);
    }
  };

  getVariant(): ToolbarButtonVariant {
    if (this.props.isLive) {
      return 'primary';
    }
    if (this.props.isLoading) {
      return 'destructive';
    }
    if (this.props.primary) {
      return 'primary';
    }
    return 'default';
  }

  render() {
    const { onRefresh, intervals, tooltip, value, text, isLoading, noIntervalPicker, width } = this.props;

    const currentValue = value || '';
    const variant = this.getVariant();
    const options = intervalsToOptions({ intervals });
    const option = options.find(({ value }) => value === currentValue);
    const translatedOffOption = RefreshPicker.translateOption(RefreshPicker.offOption);
    let selectedValue = option || translatedOffOption;

    if (selectedValue.label === translatedOffOption.label) {
      selectedValue = { value: '' };
    }

    const durationAriaLabel = selectedValue.ariaLabel;
    const ariaLabel =
      selectedValue.value === ''
        ? t({
            id: 'grafana-ui.refresh-picker.off-description',
            message: 'Auto refresh turned off. Choose refresh time interval',
          })
        : t({
            id: 'grafana-ui.refresh-picker.on-description',
            message: `Choose refresh time interval with current interval ${durationAriaLabel} selected`,
          });

    return (
      <ButtonGroup className="refresh-picker">
        <ToolbarButton
          aria-label={text}
          tooltip={tooltip}
          onClick={onRefresh}
          variant={variant}
          icon={isLoading ? 'fa fa-spinner' : 'sync'}
          style={width ? { width } : undefined}
          data-testid={selectors.components.RefreshPicker.runButtonV2}
        >
          {text}
        </ToolbarButton>
        {!noIntervalPicker && (
          <ButtonSelect
            value={selectedValue}
            options={options}
            onChange={this.onChangeSelect as any}
            variant={variant}
            data-testid={selectors.components.RefreshPicker.intervalButtonV2}
            aria-label={ariaLabel}
          />
        )}
      </ButtonGroup>
    );
  }
}

export function intervalsToOptions({ intervals = defaultIntervals }: { intervals?: string[] } = {}): Array<
  SelectableValue<string>
> {
  const intervalsOrDefault = intervals || defaultIntervals;
  const options = intervalsOrDefault.map((interval) => {
    const duration = parseDuration(interval);
    const ariaLabel = formatDuration(duration);

    return {
      label: interval,
      value: interval,
      ariaLabel: ariaLabel,
    };
  });

  options.unshift(RefreshPicker.translateOption(RefreshPicker.offOption));
  return options;
}
