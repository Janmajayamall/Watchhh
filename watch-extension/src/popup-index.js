import * as React from "react";
// import { createCeramic } from "./utils/ceramic";
// import { getProvider, metamask } from "./utils/wallet";

const App = () => {
    // async function authenticate() {
    //     const [ceramic, provider] = await Promise.all([createCeramic(),getProvider()])
    //     const did = new DID({
    //         provider,
    //         resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
    //     })
    //     await did.authenticate()
    //     // window.did = did
    //     ceramic.did = did
    //     const idx = createIDX(ceramic)
    //     console.log(did, idx)
    //     return idx.id
    // }

    return <div>
        <button onClick={()=>{
            console.log("called")
            // authenticate()
        }}>dawiodnaoidano</button>
        {/* <Button variant="contained" color="primary" onClick={() => { authenticate() }}>
            Primary
        </Button> */}
    </div>;
};

export default App;
