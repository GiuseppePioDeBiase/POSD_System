import axios from "axios";
import PropTypes from "prop-types";

function LogOUT(props){

function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            <img src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RRkqYzxFXLjlCCm3JIc7BwHaE7%26pid%3DApi%26h%3D160&f=1&ipt=6d725695cb76cc64f4e4f34b3643f3179ee193a7923ff2d4b8610caccfb57b99&ipo=images"} className="LogOUT" alt="logo" />
            <button onClick={logMeOut}>
                Logout
            </button>
        </header>
    )
}
LogOUT.propTypes = {
    token: PropTypes.func.isRequired
};
export default LogOUT