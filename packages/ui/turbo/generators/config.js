"use strict";
exports.__esModule = true;
// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation
// eslint-disable-next-line import/no-default-export -- Turbo generators require default export
function generator(plop) {
    // A simple generator to add a new React component to the internal UI library
    plop.setGenerator("react-component", {
        description: "Adds a new react component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the component?"
            },
        ],
        actions: [
            {
                type: "add",
                path: "{{pascalCase name}}.tsx",
                templateFile: "templates/component.hbs"
            },
            {
                type: "append",
                path: "index.tsx",
                pattern: /(?<insertion>\/\/ component exports)/g,
                template: 'export * from "./{{pascalCase name}}";'
            },
        ]
    });
}
exports["default"] = generator;
