import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      // ← 覆盖默认断点，只留三套
      xs: "375px", // 移动端（最小常见屏）
      tb: "768px", // 平板
      pc: "1280px", // PC
    },
    extend: {
      width: {
        // 自定义宽度变量（可按需增减）
        320: "20rem",
        384: "24rem",
        448: "28rem",
        512: "32rem",
        640: "40rem",
      },
    },
  },
  plugins: [typography],
};
export default config;
