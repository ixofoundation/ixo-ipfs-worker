import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { sha256 } from 'hono/utils/crypto'
import { bearerAuth } from 'hono/bearer-auth'

import { web3StoreFile } from './web3storage.helper'

interface Data {
  body: any
}

const token = "INSERTHERE";

const app = new Hono()
app.use('/upload/*', bearerAuth({ token }))

app.use('*', poweredBy())

app.get('/', (c) => {
  return c.text('Api up and running')
})

app.get('/status', (c) => {
  return c.text('Api up and running')
})
app.put('/upload', async (c) => {
  const data = await c.req.json<{base64,mimetype}>();

  const base64 = data.base64;
  const mimetype = data.mimetype;


  const body = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))

  const key = await sha256(body);

  const file = new File([body], key, {type: mimetype});

 const cid = await web3StoreFile( c.env.IPFS_WORKER_TOKEN,file );
 
  
  return c.json({ meta: key, cid:cid })  

})

app.put('/upload8bit', async (c) => {
  const data = await c.req.json<{buffer,mimetype}>();

  const buffer = data.buffer;
  const mimetype = data.mimetype;


  const body = Uint8Array.from(buffer)

  const key = await sha256(body);

  const file = new File([body], key, {type: mimetype});

 const cid = await web3StoreFile( c.env.IPFS_WORKER_TOKEN,file );
 
  
  return c.json({ meta: key, cid:cid })  

})

export default app