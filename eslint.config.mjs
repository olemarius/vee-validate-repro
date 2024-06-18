/**
 * We're using @antfu/eslint-config for the entire monorepo.
 * Later we can add it to /packages/eslint-config and use it as a dependency.
 * (tried it and couldn't figure out how to extend root config from it)
 */
import antfu from '@antfu/eslint-config';
import oxlint from 'eslint-plugin-oxlint';

const oxlintRules = oxlint.configs['flat/recommended'];
export default antfu({
    typescript: true,
    vue: true,
    stylistic: {
        indent: 4,
        quotes: 'single',
        semi: true,
        jsx: true,
    },
    plugins: {
        oxlintRules,
    },
    rules: {
        'import/order': 'off', // enforce a convention in module import order
        'import/first': 'off', // ensure all imports appear before other statements
        'curly': 'off', // require curly braces around all control statements
        'no-alert': 'off', // disallow the use of alert, confirm, and prompt
        'vue/html-closing-bracket-newline': 'off',
        'no-console': 'off',
        'jsonc/indent': 'off',
    },
});
