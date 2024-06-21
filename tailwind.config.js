/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './drivers/views/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        waitDown: 'down 5s ease',
        waitDown2: 'down2 5s ease',
        waitAppear: 'appear 5s ease',
      },
      keyframes: {
        down: {
          '0%': { transform: 'translateY(0%)' },
          '20%': { transform: 'translateY(0%)' },
          '40%': { transform: 'translateY(50%)' },
        },
        down2: {
          '0%': { transform: 'translateY(0%)' },
          '40%': { transform: 'translateY(0%)' },
          '60%': { transform: 'translateY(50%)' },
        },
        appear: {
          '0%': { opacity: '0%' },
          '70%': { opacity: '0%' },
          '80%': { opacity: '100%' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              // 長いURLをそのまま貼ると改行されないのを修正
              wordBreak: 'break-all',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    logs: !process.env.CI,
  },
}
