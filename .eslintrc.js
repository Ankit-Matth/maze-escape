module.exports = {
    parser: "@babel/eslint-parser",
    plugins: ["p5js"],
    env: {
        browser: true,
        es2021: true,
        "p5js/p5": true
    },
    extends: ["airbnb-base","plugin:p5js/p5"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "no-console": "error",
        "no-alert": "error",
        "indent": ["error", 4],
        "no-unused-vars": "error",
        "no-use-before-define": "error",
        "space-before-function-paren": ["error", "never"],
        "linebreak-style": 0,
        "quotes": 0,
        "no-plusplus": 0,
        "prefer-template": "error",
        "no-param-reassign": 0
    },
};
