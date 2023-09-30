import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MUIModal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

function Modal({open, onClose, children}: any) {

  return (
    <>
      <MUIModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500
        }}>
          {children}
        </Box>
        
      </MUIModal>
    </>
  );
}

export default Modal;
