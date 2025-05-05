// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css:["~/assets/css/main.css"],
  modules:['@pinia/nuxt'],
  vite:{
    plugins:[
      tailwindcss()
    ],
  },
  app:{
    head:{
      link:[
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        },{
         rel:"preconnect", 
         href:"https://fonts.googleapis.com"
        },{
          rel:"preconnect", 
          href:"https://fonts.gstatic.com",
          crossorigin: ""
        },{
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap" 
        }
      ]
    }
  }
});
