import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import './Message.scss';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Message extends React.Component {

  constructor() {
    super()
    this.state = {
        open: false, 
        title: "", 
        message: ""
    }
  }

  open = (title, message) => {
    this.setState({
        open: true,
        title: title,
        message: message
    });
  };

  hide = () => {
    this.setState({
        open: false,
        title: "",
        message: ""
    });
  };

  render() {
    return (
      <div>
          <Dialog
            open={this.state.open}
            transition={Transition}
            keepMounted
            onClose={this.hide}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
              <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.hide} color="primary" autoFocus>
                  Awesome
                </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
  }
}

export default Message;