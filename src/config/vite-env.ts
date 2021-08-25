
import { ConfigEnv } from 'vite'
export default ({ command, mode }: ConfigEnv) => {
  console.log(`---com- ${command} --mode- ${mode} ---`)
}