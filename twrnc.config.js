// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.tsx'],
  theme: {
    extend: {
      colors: {
        'taskbolt-green': '#4ecca3',
        'taskbolt-blue': '#1a1a2e',
        'taskbolt-background': '#053e5c'
      },
    },
  },
};
