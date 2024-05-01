/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/ip.jsontest.com", // Fix: Add a leading slash
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://example.com", // Replace this with your actual origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
