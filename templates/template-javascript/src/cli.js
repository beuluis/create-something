#!/usr/bin/env node

const { create } = require('@beuluis/create-helper');
const { resolve } = require('path');

create({
    templatesDirectory: resolve(__dirname, '..', 'templates'),
    defaultTemplate: 'standard',
    templatesPrefix: 'template-',
    setupInteractiveUI: (engine, buildInQuestions) => {
        engine.registerQuestions([
            buildInQuestions.name,
            buildInQuestions.description,
            buildInQuestions.license
        ])
    },
    afterCreationHook: async ({ getAfterHookHelper }) => {
        const helper = getAfterHookHelper();

        await helper.initGit();
    },
});
