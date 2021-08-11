import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { Image } from 'react';

function WelcomeHeader() {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography style={styles.headingText}>Archive your twitter</Typography>
        <Typography style={styles.headingText}>forever</Typography>
        <Typography style={styles.headingText}>on Decentralized Web</Typography>
        <LinearProgress color="secondary" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

const styles = {
  headingText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 80,
  },
};

export default WelcomeHeader;
