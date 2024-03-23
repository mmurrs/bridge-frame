import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { ethers, parseEther } from 'ethers';

// import { neynar } from 'frog/hubs'
// HELPER FUNCTIONS
function validateInput(inputVal: string){

  return false;
}
export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

// app.frame('/', (c) => {
//   const { buttonValue, inputText, status } = c
//   const transactionAmt = inputText || buttonValue
//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           background:
//             status === 'response'
//               ? 'linear-gradient(to right, #432889, #17101F)'
//               : 'black',
//           backgroundSize: '100% 100%',
//           display: 'flex',
//           flexDirection: 'column',
//           flexWrap: 'nowrap',
//           height: '100%',
//           justifyContent: 'center',
//           textAlign: 'center',
//           width: '100%',
//         }}
//       >
//         <div
//           style={{
//             color: 'white',
//             fontSize: 60,
//             fontStyle: 'normal',
//             letterSpacing: '-0.025em',
//             lineHeight: 1.4,
//             marginTop: 30,
//             padding: '0 120px',
//             whiteSpace: 'pre-wrap',
//           }}
//         >
//           {status === 'response'
//             ? `Transact $${transactionAmt ? ` ${transactionAmt.toUpperCase()} USDC on Base` : ''}`
//             : 'Welcome!'}
//         </div>
//       </div>
//     ),
//     intents: [
//       <TextInput placeholder="Enter transaction amount..." />,
//       <Button.Transaction target="/send-ether"> Confirm </Button.Transaction>,
//       status === 'response' && <Button.Reset>Reset</Button.Reset>,
//     ],
//   })
// })

// //  Handle the transaction amount and receiver of the 
// app.frame('/send-ether', (c) => {
//   const { transactionId } = c
//   return c.res({
//     image: (
//       <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
//         Transaction ID: {transactionId}
//       </div>
//     )
//   })
// })

//  Testing transactions
app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-ether">Send Ether</Button.Transaction>,
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
app.transaction('/send-ether', (c) => {
  const { inputText } = c
  // Send transaction response.
  return c.send({
    chainId: 'eip155:10',
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther(inputText),
  })
})
 
app.transaction('/mint', (c) => {
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:10',
    functionName: 'mint',
    args: [69420n],
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther(inputText)
  })
})

// Devtools for debugging
devtools(app, { serveStatic })