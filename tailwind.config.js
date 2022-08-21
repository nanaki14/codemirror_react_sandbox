module.exports = {
  mode: 'jit',
  plugins: [],
  purge: {
    content: ['./src/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
    enabled: process.env.NODE_ENV === 'production',
  },
  variants: {},
}
