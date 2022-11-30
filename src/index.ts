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
  const base64 = data.body

  if (!base64) return c.notFound()

  const type = detectType(base64)
  if (!type) return c.notFound()

  let cid = await GenerateCID(base64);
  const body = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))

  const key = (await sha256(body)) + '.' + type?.suffix
  await c.env.BUCKET.put(key, body, { httpMetadata: { contentType: type.mimeType } })
  
  return c.json({ image: key, cid:cid })  

})
