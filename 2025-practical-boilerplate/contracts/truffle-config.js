module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Adjust to match your Ganache port (default is 8545 for CLI, 7545 for GUI)
      network_id: "*",
      gas: 6721975, // Match block gas limit
      gasPrice: 20000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.29",
      settings: {
        evmVersion: "london",
        optimizer: {
          enabled: false
        }
      }
    }
  }
};