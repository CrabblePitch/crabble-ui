export const fetchChainInfo = async (netconfigURL) => {
    const response = await fetch(netconfigURL, {
        headers: { accept: 'application/json' },
    });
    const { rpcAddrs, chainName } = await response.json();

    return {
        rpc: rpcAddrs[Math.floor(Math.random() * rpcAddrs.length)],
        chainName,
    };
};