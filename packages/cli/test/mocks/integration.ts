import {
  Integration,
  MetadataSchema,
} from '../../src/commands/integration/types';
import { client } from './client';

const metadataSchema1: MetadataSchema = {
  type: 'object',
  properties: {
    region: {
      'ui:control': 'select',
      'ui:label': 'Primary Region',
      default: 'us-east-1',
      description: 'Primary region where your database will be hosted',
      'ui:placeholder': 'Choose your region',
      type: 'string',
      'ui:hidden': 'update',
      'ui:options': [
        {
          value: 'us-west-1',
          label: 'West US (North California)',
        },
        {
          value: 'us-east-1',
          label: 'East US (North Virginia)',
        },
      ],
    },
  },
  required: ['region'],
};

const metadataSchema2: MetadataSchema = {
  type: 'object',
  properties: {
    version: {
      'ui:label': 'Version',
      'ui:control': 'select',
      description: 'Version to use',
      type: 'string',
      default: '5.6',
      'ui:options': [
        {
          value: '5.6',
          label: '5.6 (latest)',
        },
        {
          label: '5.4',
          value: '5.4',
        },
        {
          label: '5.2',
          value: '5.2',
        },
        {
          label: '4.5',
          value: '4.5',
        },
        {
          label: '4.2',
          value: '4.2',
        },
      ],
    },
    region: {
      'ui:label': 'Region',
      'ui:hidden': 'update',
      'ui:control': 'vercel-region',
      type: 'string',
      default: 'cle1',
      'ui:options': ['pdx1', 'cle1', 'dub1'],
    },
    compute: {
      'ui:label': 'Compute',
      description: '',
      'ui:control': 'select',
      'ui:hidden': true,
      type: 'string',
      'ui:options': [
        {
          value: '1/4',
          label: '1/4 compute unit',
          hidden: true,
        },
        {
          label: '1 compute unit (0.25vCPU, 2GiB RAM)',
          value: '1',
        },
        {
          label: '2 compute units (0.5vCPU, 4GiB RAM)',
          value: '2',
        },
        {
          label: '3 compute units (0.75vCPU, 6GiB RAM)',
          value: '3',
        },
        {
          label: '4 compute units (1vCPU, 8GiB RAM)',
          value: '4',
        },
        {
          label: '8 compute units (2vCPU, 16GiB RAM)',
          value: '8',
        },
        {
          label: '12 compute units (3vCPU, 24GiB RAM)',
          value: '12',
        },
      ],
    },
    storage: {
      type: 'number',
      'ui:control': 'input',
      'ui:hidden': true,
      'ui:label': 'Storage',
      description: 'Disk space in GiB',
      minimum: 1,
      maximum: 256,
    },
  },
  required: ['version', 'region'],
};

const metadataSchema3: MetadataSchema = {
  type: 'object',
  properties: {
    Region: {
      'ui:label': 'Region',
      description: '',
      default: 'us-east-1',
      'ui:read-only': true,
      'ui:control': 'vercel-region',
      type: 'string',
      'ui:options': [
        {
          value: 'us-east-1',
          label: 'US East (N. Virginia) us-east-1',
        },
      ],
    },
  },
  required: ['Region'],
};

const integrations: Record<string, Integration> = {
  acme: {
    id: 'acme',
    name: 'Acme Integration',
    slug: 'acme',
    products: [
      {
        id: 'acme-product',
        name: 'Acme Product',
        slug: 'acme',
        type: 'storage',
        shortDescription: 'The Acme product',
        metadataSchema: metadataSchema1,
      },
    ],
  },
  'acme-two-products': {
    id: 'acme-two-products',
    name: 'Acme Integration Two Products',
    slug: 'acme-two-products',
    products: [
      {
        id: 'acme-product-a',
        name: 'Acme Product A',
        slug: 'acme-a',
        type: 'storage',
        shortDescription: 'The Acme A product',
        metadataSchema: metadataSchema2,
      },
      {
        id: 'acme-product-b',
        name: 'Acme Product B',
        slug: 'acme-b',
        type: 'storage',
        shortDescription: 'The Acme B product',
        metadataSchema: metadataSchema3,
      },
    ],
  },
  'acme-external': {
    id: 'acme-external',
    name: 'Acme Integration External',
    slug: 'acme-external',
  },
  'acme-no-products': {
    id: 'acme-no-products',
    name: 'Acme Integration No Products',
    slug: 'acme-no-products',
    products: [],
  },
};

const integrationPlans: Record<string, unknown> = {
  acme: {
    plans: [
      {
        id: 'pro',
        type: 'subscription',
        name: 'Pro Plan',
        scope: 'installation',
        description:
          'Dedicated CPU • 1 GB RAM • 100K MAU • 8 GB database space • 250 GB bandwidth • 100 GB file storage',
        paymentMethodRequired: true,
        details: [
          {
            label: 'New Project - Micro Compute',
            value: '$10/m',
          },
          {
            label: 'Pro Plan',
            value: '$25/m',
          },
          {
            label: 'Compute Credits',
            value: '-$10/m',
          },
        ],
        highlightedDetails: [],
      },
      {
        id: 'team',
        type: 'subscription',
        name: 'Team Plan',
        scope: 'installation',
        description:
          'SOC2 • SSO for Supabase Dashboard • Priority email support & SLAs • 28-day log retention',
        paymentMethodRequired: true,
        details: [
          {
            label: 'New Project - Micro Compute',
            value: '$10/m',
          },
          {
            label: 'Team Plan',
            value: '$599/m',
          },
          {
            label: 'Compute Credits',
            value: '-$10/m',
          },
        ],
        highlightedDetails: [],
      },
      {
        id: 'free',
        type: 'subscription',
        name: 'Free Plan',
        scope: 'installation',
        description:
          'Unlimited API requests • Shared CPU • 500 MB RAM • 50K MAU • 500 MB database space • 5 GB bandwidth • 1 GB file storage',
        paymentMethodRequired: false,
        details: [],
        highlightedDetails: [
          {
            label:
              'Unavailable - The following members have reached their 2 project Free Plan limit: luka.hartwig@vercel.com. All active projects in Free Plan organizations count towards this limit.',
          },
        ],
        disabled: true,
      },
    ],
  },
};

export function useIntegration({
  withInstallation,
}: {
  withInstallation: boolean;
}) {
  let storeId = 'store_123';

  client.scenario.get(
    '/:version/integrations/integration/:slug',
    (req, res) => {
      const { slug } = req.params;
      const integration = integrations[slug];

      if (!integration) {
        res.status(404);
        res.end();
        return;
      }

      res.json(integration);
    }
  );

  client.scenario.get(
    `/:version/integrations/integration/:integrationId/installed`,
    (req, res) => {
      const { integrationId } = req.params;
      const { teamId, source } = req.query;

      if (!teamId) {
        res.status(500);
        res.end();
        return;
      }

      if (source !== 'marketplace') {
        res.status(500);
        res.end();
        return;
      }

      res.json(
        withInstallation
          ? [
              {
                id: `${integrationId}-install`,
                installationType: 'marketplace',
                ownerId: teamId,
              },
            ]
          : []
      );
    }
  );

  client.scenario.get(
    '/:version/integrations/integration/:integrationIdOrSlug/products/:productIdOrSlug/plans',
    (req, res) => {
      const { integrationIdOrSlug } = req.params;
      const plans = integrationPlans[integrationIdOrSlug];

      if (!plans) {
        res.status(404);
        res.end();
        return;
      }

      res.json(plans);
    }
  );

  client.scenario.post('/:version/storage/stores/integration', (_req, res) => {
    res.json({
      store: {
        id: storeId,
      },
    });
  });

  client.scenario.post(
    '/v1/storage/stores/:storeId/connections',
    (req, res) => {
      if (req.params.storeId !== storeId) {
        res.status(404);
        res.end();
        return;
      }

      res.status(200);
      res.end();
    }
  );
}