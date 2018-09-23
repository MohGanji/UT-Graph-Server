module.exports = {
  apps: [
    {
      name: 'UT-Graph-Server',
      script: 'app.js',
      env: {
        NODE_ENV: 'development',
        URL: 'http://localhost:8080',
        PUBLIC_URL: 'http://localhost:8080/public/'
      },
      env_production: {
        NODE_ENV: 'production',
        URL: 'http://188.166.114.43',
        PUBLIC_URL: 'http://188.166.114.43/public/'
      }
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
