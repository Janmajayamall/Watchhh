import { IDX } from '@ceramicstudio/idx'
import {definitions} from "./config.json"

export function createIDX(ceramic) {
  const idx = new IDX({
    ceramic,
    aliases: definitions
  })
  window.idx = idx
  return idx
}
