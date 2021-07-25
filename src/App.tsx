import React, { useState } from 'react'
import './App.scss'

declare const window: any

function App () {
  const [chainId, setChainId] = useState<number | null>(null)
  const [log, setLog] = useState<string[]>([])

  const networkName = chainId === 30 ? 'Mainnet' : 'Testnet'

  const addNetwork = (params: any) =>
    window.ethereum.request({ method: 'wallet_addEthereumChain', params })
      .then(() => {
        setLog([...log, `Switched to ${params[0].chainName} (${parseInt(params[0].chainId)})`])
        setChainId(parseInt(params[0].chainId))
      })
      .catch((error: Error) => setLog([...log, `Error: ${error.message}`]))

  

  const addRskMainnet = () =>
    addNetwork([
      {
        chainId: '56',
        chainName: 'Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
      }
    ])

  const addToken = (params: any) =>
    window.ethereum.request({ method: 'wallet_watchAsset', params })
      .then(() => setLog([...log, 'Success, Token added!']))
      .catch((error: Error) => setLog([...log, `Error: ${error.message}`]))

  const addMusc = () =>
    addToken({
      type: 'ERC20',
      options: {
        address: '0x374D57178aaBf3d033cD0F2cBc28305CBBcd34D9',
        symbol: 'MUSC',
        decimals: 18,
        image: 'https://raw.githubusercontent.com/pierrot498/configure-bsc/main/logo.jpg'
      }
    })

  

  return (
    <div className="App">
      <header className="App-header">
        Add Mainnet BSC to Metamask.
      </header>

      <section>
        <h2>step 1</h2>
        Download Metamask.
      </section>

      {chainId && (
        <section>
          <h2>Current Network</h2>
          <p><strong>ChainId</strong> {chainId}</p>
          <p><strong>Name</strong> {networkName}</p>
        </section>
      )}

      <section>
        <h2>Step 2:</h2>
        <button onClick={addRskMainnet}>Add Binance Mainnet</button>
      </section>

      {chainId && (
        <section>
          <h2>Step 3:</h2>
          <p>Add the MUSC token!</p>
          <p>Click below to add the <strong>{networkName}</strong> MUSC token.</p>
          <button onClick={chainId === 56 ? addMuscToken }>Add MUSC Token</button>
        </section>
      )}

      <section>
        <h2>log</h2>
        <ul>
          {log.map((item: string, i: number) => <li key={i}>{item}</li>)}
        </ul>
      </section>

      <hr />
      <a href="https://github.com/rsksmart/metamask-rsk-custom-network">Github code</a>
    </div>
  )
}

export default App
