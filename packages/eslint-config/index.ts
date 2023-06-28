import eslint from '@eslint/js';

export default {
	recommended: [
		eslint.configs.recommended,
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'next',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
};
