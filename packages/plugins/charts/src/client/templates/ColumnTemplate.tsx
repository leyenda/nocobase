import JSON5 from 'json5';
import React from 'react';
import { i18n } from '@nocobase/client';

const validateJSON = {
  validator: `{{(value, rule)=> {
    if (!value) {
      return '';
    }
    try {
      const val = JSON5.parse(value);
      if(!isNaN(val)) {
        return false;
      }
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }}}`,
  message: '{{t("Invalid JSON format")}}',
};

const chartConfig = {
  appendPadding: 10,
  isGroup: true,
  yField: '{{metric}}',
  xField: '{{dimension}}',
  seriesField: '{{category}}',
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle', // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
};
export const columnTemplate = {
  description: '1 个「时间」或「有序名词」字段，1 个「数值」字段，0 ～ 1 个「无序名词」',
  type: 'Column',
  title: 'Column',
  iconId: 'icon-column',
  group: 2,
  renderComponent: 'G2Plot',
  defaultChartOptions: chartConfig,
  configurableProperties: {
    type: 'object',
    properties: {
      dimension: {
        required: true,
        type: 'string',
        title: '{{t("Category axis / Dimension")}}',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: '{{dataSource}}',
      },
      metric: {
        required: true,
        type: 'string',
        title: '{{t("Value axis / Metrics")}}',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: '{{dataSource}}',
      },
      category: {
        type: 'string',
        title: '{{t("Color legend / Dimensional")}}',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: '{{dataSource}}',
      },
      jsonConfig: {
        type: 'void',
        'x-component': 'div',
        properties: {
          jsonConfig: {
            required: true,
            title: '{{t("JSON config")}}',
            type: 'string',
            default: JSON5.stringify(chartConfig, null, 2),
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              autoSize: { minRows: 8, maxRows: 16 },
            },
            'x-validator': validateJSON,
          },
          references: {
            type: 'string',
            'x-decorator': 'div',
            'x-content': <span>{i18n.t('Json config references: ')}<a
              href={'https://g2plot.antv.antgroup.com/api/plots/column'} target='_blank'>{i18n.t('Column | G2Plot')}</a></span>,
          },
        },
      },
    },
  },
};
