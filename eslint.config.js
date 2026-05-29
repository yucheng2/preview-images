import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  rules: {
    'style/quotes': ['error', 'single'],
    'style/semi': ['error', 'never'],
  },
})
