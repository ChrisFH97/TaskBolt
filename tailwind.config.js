module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'taskbolt-green': '#4ecca3',
        'taskbolt-blue': '#053e5c',
        'taskbolt-background': '#053e5c',
        'stat-card-background': '#053e5c',
        'stat-card-text': '#4ecca3',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        modal: '480px',
      }
    },
  },
  plugins: [],
};
