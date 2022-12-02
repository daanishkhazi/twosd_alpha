/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fee9eb",
          75: "#fbcace",
          100: "#fcd3d6",
          200: "#f8bdc3",
          300: "#f4a7af",
          400: "#ee909c",
          // 400: "#ef5b6b",
          500: "#e8798a",
          600: "#c85d6f",
          700: "#c85d6f",
          800: "#a94155",
          900: "#8b243d",
        },
        secondary: {
          400: "#8b99ff",
          600: "#3451ad",
          900: "#001561",
        },
      },
      fontFamily: {
        body: [
          "Noto Sans",
          "Helvetica Neue",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        heading: ["Helvetica Neue"],
        sans: [
          "Noto Sans",
          "Helvetica Neue",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
        bottom: {
          "0%": { transform: "translateY(20%)" },
          "20%": { transform: "translateY(0)" },
        },
        left: {
          "0%": { transform: "translateX(20%)" },
          "20%": { transform: "translateX(0)" },
        },
        right: {
          "0%": { transform: "translateX(-20%)" },
          "20%": { transform: "translateX(0)" },
        },
        pulser: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
        }
      },
      animation: {
        "fade-in": "fadeIn 1s linear",
        bottom: "bottom 2s ease-in-out",
        left: "left 2s ease-in-out",
        right: "right 2s ease-in-out",
        pulser: 'pulser 0.6s ease-in-out 1',
      },
    },
    boxShadow: {
      'neobrutalism-lg-black': '6px 6px black',
      'neobrutalism-md-black': '3px 3px black',
      'neobrutalism-md-primary': '3px 3px #d0919b',
      'neobrutalism-md-secondary': '3px 3px #535b99',
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e8798a",
          secondary: "#494949",
          accent: "#f5f1e3",
          neutral: "#222222",
          "base-100": "#FCFCFC",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
