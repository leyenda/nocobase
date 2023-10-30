import { SchemaInitializer } from '../../application';
import { gridRowColWrap, useCustomBulkEditFormItemInitializerFields } from '../utils';

export const bulkEditFormItemInitializers = new SchemaInitializer({
  name: 'BulkEditFormItemInitializers',
  wrap: gridRowColWrap,
  icon: 'SettingOutlined',
  title: '{{t("Configure fields")}}',
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Display fields")}}',
      useChildren: useCustomBulkEditFormItemInitializerFields,
    },
    {
      type: 'divider',
    },
    {
      name: 'add-text',
      title: '{{t("Add text")}}',
      Component: 'BlockItemInitializer',
      schema: {
        type: 'void',
        'x-editable': false,
        'x-decorator': 'FormItem',
        'x-designer': 'Markdown.Void.Designer',
        'x-component': 'Markdown.Void',
        'x-component-props': {
          content: '{{t("This is a demo text, **supports Markdown syntax**.")}}',
        },
      },
    },
  ],
});
