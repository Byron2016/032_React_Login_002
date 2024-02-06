const RULES = {
    OFF: 'off',
    WARN: 'warn',
    ERROR: 'error'
}

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        'prettier'
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'react/prop-types': RULES.OFF,
        'react/react-in-jsx-scope': RULES.OFF,
        '@typescript-eslint/explicit-function-return-type': RULES.OFF,
    }
}
