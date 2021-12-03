import { ColorProvider, } from '../utils/ColorContext'
import MainApp from '../components/Main'

export default function Home() {
  return (
    <ColorProvider>
      <MainApp />
    </ColorProvider>
  )
}
