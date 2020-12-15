module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-unsafe-member-access": 1,
        '@typescript-eslint/no-unsafe-assignment': 1,
        "@typescript-eslint/no-unsafe-call": 1
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
};
