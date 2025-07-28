/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        mobile: { max: '639px' }, // 0 ~ 639px
        tablet: { min: '640px', max: '1023px' }, // 640 ~ 1023px
        desktop: '1024px', // 1024px 이상
      },
    },
    extend: {
      colors: {
        'primary-light': 'var(--primary-light)',
        'primary-normal': 'var(--primary-normal)',
        'primary--navy': 'var(--parimary-navy)',
        'gray-strong': 'var(--gray-strong)',
        'gray-normal': 'var(--gray-normal)',
        'gray-light': 'var(--gray-light)',
        'black-normal': 'var(--black-normal)',
        'black-alternative': 'var(--black-alternative)',
        'true-1': 'var(--true-1)',
        'true-2': 'var(--true-2)',
        'true-3': 'var(--true-3)',
        'true-4': 'var(--true-4)',
        'true-5': 'var(--true-5)',
      },
    },
  },
  plugins: [],
};
