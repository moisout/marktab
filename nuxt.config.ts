// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  runtimeConfig: {
    public: {
      mockData: process.env.MOCK_DATA === 'true',
    },
  },
});
