#!/usr/bin/env node

import { resolve } from 'path';
import { create } from '@beuluis/create-helper';
import packageNameRegex from 'package-name-regex';

void create({
    templatesDirectory: resolve(__dirname, '..', 'templates'),
    partials: resolve(__dirname, '..', 'templates', 'partials'),
    defaultTemplate: 'typescript',
    templatesPrefix: 'template-',
    setupInteractiveUI: (engine, buildInQuestions) => {
        engine.registerQuestions([
            {
                type: 'input',
                message:
                    'What is the name of your project? (needs to start with create- or @scope/create- and be a valid npm package name)',
                validate: (input: string) => {
                    if (!packageNameRegex.test(input)) {
                        return `${input} is not a valid npm package name`;
                    }

                    if (!/^(?:create-|[^/]*\/create-).+$/u.test(input)) {
                        return `${input} should start with create- or @scope/create-`;
                    }

                    return true;
                },
                name: 'name',
            },
            buildInQuestions.description,
            buildInQuestions.license,
        ]);
    },
    afterCreationHook: async ({ getAfterHookHelper }) => {
        const helper = getAfterHookHelper();

        await helper.initGit();
        await helper.installDependencies();
    },
});
