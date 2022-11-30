import { Hono } from 'hono'

import { sha256 } from 'hono/utils/crypto'
import { basicAuth } from 'hono/basic-auth'
import { detectType,GenerateCID } from './utils'
import { web3StoreFile,web3FetchFile } from './web3storage.helper'

export interface Bindings {
  BUCKET: R2Bucket
  USER: string
  PASS: string
}

interface Data {
  body: string
}


const app = new Hono()

app.put('/upload', async (c, next) => {
  const auth = basicAuth({ username: c.env.USER, password: c.env.PASS })
  await auth(c, next)
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

  web3StoreFile( c.env.IPFS_WORKER_MNEMONIC,file )
 
  
  return c.json({ image: key, cid:cid })  

})
