module.exports = {
    apps: [
      {
        name: 'tabOrders-Frontend',
        script: 'react-scripts start',
        args: 'start',
        env: {
          NODE_OPTIONS: '--openssl-legacy-provider'
        }
      }
    ]
  };
  