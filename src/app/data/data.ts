import { Vertical, Template, Asset } from '../models/models';

export const DUMMIES = {

  VERTICALS: <Vertical[]>[
    { verticalId: '1', verticalname: 'Restaurant' },
    { verticalId: '2', verticalname: 'E-Commerce' },
    { verticalId: '3', verticalname: 'Fashion' },
  ],

  TEMPLATES: <Template[]>[
    { verticalId: '1', templateId: '10', templatename: 'Fine Dining' },
    { verticalId: '1', templateId: '11', templatename: 'Family Feast' },
    { verticalId: '2', templateId: '20', templatename: 'Flash Sale' },
    { verticalId: '3', templateId: '30', templatename: 'Spring Collection' },
  ],

  ASSETS: <Asset[]>[
    { assetId: '100', assetname: 'Asset 1', description: 'Desc 1', figmaURL:'', figmaId:'', templateId:'10', verticalId:'1' },
    { assetId: '101', assetname: 'Asset 2', description: 'Desc 2', figmaURL:'', figmaId:'', templateId:'10', verticalId:'1' },
    { assetId: '102', assetname: 'Asset 3', description: 'Desc 3', figmaURL:'', figmaId:'', templateId:'11', verticalId:'1' },
    { assetId: '103', assetname: 'Asset 4', description: 'Desc 4', figmaURL:'', figmaId:'', templateId:'20', verticalId:'2' },
    { assetId: '104', assetname: 'Asset 5', description: 'Desc 5', figmaURL:'', figmaId:'', templateId:'30', verticalId:'3' },
  ]
};
