import Ceramic from '@ceramicnetwork/http-client'

export async function createCeramic() {
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
//   window.ceramic = ceramic
  return Promise.resolve(ceramic)
}
