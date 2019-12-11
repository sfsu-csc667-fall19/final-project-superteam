module.exports = {
  apps: [
    {
      name: "service1",
      script: "./service1.js",
      watch: true,
      instances: 2,
      exec_mode: "cluster",
      ignore_watch : ["node_modules"],
      watch: true,
    },
    {
      name: "service2",
      script: "./service2.js",
      watch: true,
      ignore_watch : ["node_modules"],
      watch: true,
    },
    {
      name: "service3",
      script: "./service3.js",
      watch: true,
      ignore_watch : ["node_modules"],
      watch: true,
    },
    {
      name: "gateway",
      script: "./gateway.js",
      watch: true,
      ignore_watch : ["node_modules"],
      watch: true,
    },
  ]
}