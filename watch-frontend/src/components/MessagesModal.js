import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

function MessagesModal({ open, handleClose, messages }) {
  
    function LabelTextBox({ label, text }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
        <Typography
          style={{ ...styles.normalText, fontWeight: 'bold' }}
        >{`${label}: `}</Typography>
        <Typography style={styles.normalText}>{text}</Typography>
      </div>
    );
  }

  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          style={{
            backgroundColor: '#000000',
            border: '2px solid #ffffff',
            display: 'flex',
            flexDirection: 'column',
            height: 500,
            width: 700,
            overflowY: 'scroll',
            alignSelf: 'center',
            padding: 10,
            // boxShadow: theme.shadows[5],
            // padding: theme.spacing(2, 4, 3),
          }}
        >
          {messages.length === 0 ? (
            <Typography
              style={{ color: '#ffffff', fontSize: 50, alignSelf: 'center' }}
            >
              No DMs Archived
            </Typography>
          ) : undefined}
          {messages.map(({ messageCreate }) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 10,
                }}
              >
                <LabelTextBox
                  label={'Recipient'}
                  text={messageCreate.recipientId}
                />
                <LabelTextBox label={'Sender'} text={messageCreate.senderId} />
                <LabelTextBox label={'Message'} text={messageCreate.text} />
                <Divider
                  style={{
                    width: '100%',
                    height: 3,
                    backgroundColor: '#FF5A5F',
                  }}
                />
              </div>
            );
          })}
        </div>
      </Fade>
    </Modal>
  );
}

const styles = {
  normalText: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 2,
  },
};

export default MessagesModal;
