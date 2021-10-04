module.exports = {
  info: {
    version: "1.0.0",
    title: "Ecclesiast API",
    description: "This Api for Ecclesiast projects",
    contact: {
      name: "Alex Dolid", // your name
      email: "admin@admin.com", // your email
      url: "web.com" // your website
    }
  },
  openapi: "3.0.0",
  servers: [
    {
      url: "http://localhost:3030",
      description: "Local server"
    }
  ],
  components: {
    securitySchemes: {
      JWT: {
        name: "Authorization",
        description: "This is JWT bearer token API",
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{
    JWT: []
  }],
  apis: [ "src/modules/**/sw.yaml", "src/modules/**/index.**" ]
};
