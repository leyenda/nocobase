import type { CollectionOptions } from '@nocobase/database';
import { generateNTemplate } from '../locale';

export default {
  namespace: 'api-keys',
  duplicator: 'optional',
  name: 'apiKeys',
  title: '{{t("API keys")}}',
  sortable: 'sort',
  model: 'ApiKeyModel',
  createdBy: true,
  updatedAt: false,
  updatedBy: false,
  logging: true,
  fields: [
    {
      name: 'id',
      type: 'bigInt',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      interface: 'id',
    },
    {
      type: 'string',
      name: 'name',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("name")}}',
        'x-component': 'Input',
      },
    },
    {
      interface: 'obo',
      type: 'belongsTo',
      name: 'role',
      target: 'roles',
      foreignKey: 'roleName',
      uiSchema: {
        type: 'object',
        title: '{{t("Roles")}}',
        'x-component': 'Select',
        'x-component-props': {
          fieldNames: {
            label: 'title',
            value: 'name',
          },
          objectValue: true,
          options: '{{ currentRoles }}',
        },
      },
    },
    {
      name: 'expiresIn',
      type: 'string',
      uiSchema: {
        type: 'string',
        title: generateNTemplate('Expires'),
        'x-component': 'ExpiresSelect',
        enum: [
          {
            label: generateNTemplate('Never'),
            value: 'never',
          },
          {
            label: generateNTemplate('1 Day'),
            value: '1d',
          },
          {
            label: generateNTemplate('7 Days'),
            value: '7d',
          },
          {
            label: generateNTemplate('30 Days'),
            value: '30d',
          },
          {
            label: generateNTemplate('90 Days'),
            value: '90d',
          },
          {
            label: generateNTemplate('Custom'),
            value: 'custom',
          },
        ],
      },
    },
    {
      name: 'token',
      type: 'string',
      hidden: true,
    },
  ],
} as CollectionOptions;
