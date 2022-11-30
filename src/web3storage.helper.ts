import { Web3Storage } from 'web3.storage'

const web3StoreFile = async (Token:string, file: any ) => {
    const client = new Web3Storage({ token: Token })

    const cid = await client.put([file])
    return cid;
}

const web3FetchFile = async (cid:any, Token:string) => {
    const client = new Web3Storage({ token: Token })
    const res = await client.get(cid)
   //@ts-ignore
    if (!res.ok) {
        return new Error(`failed to get ${cid}`)
    }
    //@ts-ignore
    return res.files;
}


export {web3StoreFile,web3FetchFile}