import React, {Component} from "react";
import { returnErrors } from "../actions/errorActions";


const containerDivStyle = {
  minHeight:"100vh"
}

class LandingPage extends Component{
  render(){
    return(
      <div style={{minHeight:"92vh", background:"url('https://images2.alphacoders.com/743/thumb-1920-743487.jpg') no-repeat center ",
        backgroundSize:"cover",display:"flex",justifyContent:'center', alignContent:"center",flexDirection:"column"
      }}>


        <div className="container">
          <div>
            <h1 style={{color:"white",marginBottom:"50px"}}>WELCOME TO AUCTION BD</h1>
            <button style={{padding:"10px"}} className="btn btn-info">SHOP</button>
          </div>
          
        </div>
        

      </div>
    )
  }
}

export default LandingPage;