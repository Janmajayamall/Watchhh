import {useState, useEffect} from "react";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function Profile({updateBaseSetup, userProfile, userWeb3StorageObj}) {
  const [profile, setProfile] = useState(userProfile ? userProfile : {username:""})
  const [web3StorageObj, setWeb3StorageObj] = useState(userWeb3StorageObj ? userWeb3StorageObj : {token:""})
  const [loading, setLoading] = useState(false)
  
  return (
      <div style={{minHeight:"100%", minWidth:"100%", display:"flex"}}>
        <Card variant="outlined" style={{width:"60%"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <TextField 
            id="outlined-basic" 
            label="Outlined" variant="outlined" 
            onChange={(e)=>{
              setProfile({...profile, username: e.target.value})
            }}
            value={profile.username}
            />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" 
            onChange={(e)=>{
              setWeb3StorageObj({...web3StorageObj, token: e.target.value})
            }}
            value={web3StorageObj.token}
          />
          <Button variant="contained" color="primary" disableElevation onClick={()=>{
            if(profile.username !== "" && web3StorageObj.token !== ""){
              updateBaseSetup(profile, web3StorageObj)
              setLoading(true)
            }
          }}

          >
            Enter details
          </Button>
          </div>
        </Card>
      </div>
  )
}

export default Profile;
