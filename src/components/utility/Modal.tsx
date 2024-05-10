import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MUIModal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Modal({open, setOpen, onClose, children}: any) {

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
          width: '80vw',
        }}>
          <Card>
            <CardContent sx={{}}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}>
                <IconButton aria-label="close" onClick={() => {setOpen(false)}}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{
                maxHeight: "80vh",
                overflowY: "scroll"
              }}>
                {children}
              </Box>
            </CardContent>
          </Card>
        </Box>
        
      </MUIModal>
    </>
  );
}

export default Modal;
