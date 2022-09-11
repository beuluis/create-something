#!/usr/bin/env node

import { create } from '@beuluis/create-helper';
import { resolve } from 'path';
import packageNameRegex from 'package-name-regex';

create({
    questionsSelectors: ['name', 'description', 'license'],
    templatesDirectory: resolve(__dirname, '..', 'templates'),
    partials: resolve(__dirname, '..', 'templates', 'partials'),
    defaultTemplate: 'typescript',
    templatesPrefix: 'template-',
    setupInteractiveUI: engine => {
        engine.registerQuestion({
            type: 'input',
            message:
                'What is the name of your project? (needs to start with create- or @scope/create- and be a valid npm package name)',
            validate: (input: string) => {
                if (!packageNameRegex.test(input)) {
                    return `${input} is not a valid npm package name`
                }
                if (!RegExp(/^(create-|([^\/]*)\/create-).+$/).test(input)) {
                    return `${input} should start with create- or @scope/create-`
                }

                return true;
            },
            name: 'name',
        }, true);
    },
    afterCreationHook: async ({ getAfterHookHelper }) => {
        const helper = getAfterHookHelper();

        await helper.initGit();
        await helper.installDependencies();
    },
});
