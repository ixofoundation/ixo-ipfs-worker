import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { sha256 } from 'hono/utils/crypto'
import { bearerAuth } from 'hono/bearer-auth'
import {GenerateCID } from './utils'
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
  const data = await c.req.json<Data>()
  const Request = JSON.parse(data.body);
  const base64 = Request.base64;
  const mimetype = Request.mimetype;

  let cid = await GenerateCID(base64);
  const body = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))

  const key = await sha256(body);

  const file = new File([body], key, {type: mimetype});

  web3StoreFile( c.env.IPFS_WORKER_TOKEN,file )
 
  
  return c.json({ meta: key, cid:cid })  

})

export default app