import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from 'key-did-resolver'

async function authenticate() {
    console.log("triggered")
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const threeID = new ThreeIdConnect()
    await threeID.connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
    const provider = threeID.getDidProvider()
    console.log(provider, "the provider is herr")
    const ceramic = await new Ceramic('https://ceramic-clay.3boxlabs.com')
    console.log(ceramic, provider)
    
    // const [ceramic, provider] = await Promise.all([createCeramic(),getProvider()])
    const did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
    })
    console.log(did, " new did is here")
    const d = await did.authenticate()
    console.log("did has been authenticated")
    // // window.did = did
    ceramic.did = did
    const idx = new IDX({ ceramic, aliases:{sds:"dawjdioajoi"} })
    console.log(idx, " the idx is here")
    // console.log(did, idx, "this is here")
    // return idx.id
}

authenticate();