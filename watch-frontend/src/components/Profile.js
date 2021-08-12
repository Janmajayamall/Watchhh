import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TextInput from './TextInput';

function Profile({ updateBaseSetup, userProfile, userWeb3StorageObj }) {
  const [profile, setProfile] = useState(
    userProfile ? userProfile : { username: '' },
  );
  const [web3StorageObj, setWeb3StorageObj] = useState(
    userWeb3StorageObj ? userWeb3StorageObj : { token: '' },
  );
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vh',
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000000',
        }}
      >
        <Typography
          style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 60 }}
        >
          Update your details
        </Typography>
        <TextInput
          label={'Username'}
          value={profile.username}
          placeholder={'Username'}
          onChange={(e) => {
            setProfile({ ...profile, username: e.target.value });
          }}
        />
        <TextInput
          label={'Web3 Storage Token'}
          value={web3StorageObj.token}
          placeholder={'Web3 Storage Token'}
          onChange={(e) => {
            setWeb3StorageObj({ ...web3StorageObj, token: e.target.value });
          }}
        />

        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            if (profile.username !== '' && web3StorageObj.token !== '') {
              updateBaseSetup(profile, web3StorageObj);
              setLoading(true);
            }
          }}
        >
          Update
        </Button>
      </Card>
    </div>
  );
}

const styles = {
  inputBox: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 20,
    borderColor: '#000000',
  },
  textInput: { color: '#ffffff' },
  // updateButton:{}
};

export default Profile;
