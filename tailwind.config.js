/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 부분이 src 안의 모든 jsx 파일을 감시하여 스타일을 입혀줍니다!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}