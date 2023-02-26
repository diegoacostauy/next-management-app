const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [
    plugin(function ({addBase, addUtilities}) {
      addBase({
        "[data-nextjs-scroll-focus-boundary]": {
          display: "contents",
        },
      });
      addUtilities({
        ".glass": {
          "backdrop-filter": "blur(16px) saturate(180%)",
          "background-color": "rgba(255, 255, 255, 0.4)",
        },
        ".rainbow-mesh": {
          backgroundColor: "hsla(0, 100%, 50%, 1)",
          backgroundImage: `
            radial-gradient(
            at 40% 20%,
            hsla(28, 100%, 74%, 1) 0px,
            transparent 50%
            ), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%),
            radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%)
          `,
        },
        ".candy-mesh": {
          backgroundColor: "#ff99ee",
          backgroundImage: `
            radial-gradient(
              at 99% 6%,
              hsla(195, 69%, 67%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(at 55% 88%, hsla(189, 74%, 69%, 1) 0px, transparent 50%),
            radial-gradient(at 53% 27%, hsla(271, 78%, 63%, 1) 0px, transparent 50%),
            radial-gradient(at 89% 89%, hsla(317, 89%, 70%, 1) 0px, transparent 50%),
            radial-gradient(at 35% 44%, hsla(337, 92%, 61%, 1) 0px, transparent 50%);
          `,
        },
      });
    }),
  ],
};
