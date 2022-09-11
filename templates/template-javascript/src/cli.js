const { create } = require('@beuluis/create-helper');
const { resolve } = require('path');

create({
    questionsSelectors: ['name', 'description', 'license'],
    templatesDirectory: resolve(__dirname, '..', 'templates'),
    defaultTemplate: 'standard',
    templatesPrefix: 'template-',
    afterCreationHook: async ({ getAfterHookHelper }) => {
        const helper = getAfterHookHelper();

        await helper.initGit();
    },
});
