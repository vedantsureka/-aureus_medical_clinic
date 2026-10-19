import type { Config } from 'tailwindcss';
const config: Config = {
 content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
 theme: { extend: {
   colors: {navy:'#16324F', teal:'#138B91', gold:'#C5A46D', sage:'#EAF3EF', ice:'#EFF6FA', ink:'#24364A', muted:'#667788', paper:'#FCFCFA'},
   fontFamily: { sans: ['Inter', 'Arial', 'sans-serif'], heading: ['Manrope', 'Inter', 'sans-serif']},
   boxShadow: {soft:'0 20px 60px rgba(22,50,79,.08)', card:'0 12px 38px rgba(22,50,79,.08)'},
   borderRadius: {card:'1.7rem'}
 }}, plugins: []
};
export default config;
