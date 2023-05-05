import { Link } from 'react-router-dom';
import global from "../global.module.css"

function DeviceList() {
  return (
    <Link to="/add"><button className={global.button}>+ Novo dispositivo</button></Link>
  )
}

export default DeviceList