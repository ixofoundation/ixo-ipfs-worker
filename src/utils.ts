import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'


export type Type = {
  mimeType: string
  suffix: string
}

const signatures: Record<string, Type> = {
  R0lGODdh: { mimeType: 'image/gif', suffix: 'gif' },
  R0lGODlh: { mimeType: 'image/gif', suffix: 'gif' },
  iVBORw0KGgo: { mimeType: 'image/png', suffix: 'png' },
  '/9j/': { mimeType: 'image/jpg', suffix: 'jpg' },
  'UklGRg==': { mimeType: 'image/webp', suffix: 'webp' },
}

export const detectType = (b64: string): any => {
  for (const s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s]
    }
  }
}
export const GenerateCID = async (data: string): Promise<any> => {
  const bytes = json.encode({ data: data })
  const hash = await sha256.digest(bytes)
  const cid = CID.create(1, json.code, hash)
  return cid;
}
