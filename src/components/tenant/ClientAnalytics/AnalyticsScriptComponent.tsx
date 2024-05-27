import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {useAxios, axios} from '../../../services/http';
import { AppContext } from '../../../contexts/AppContext';

import Grid from '@mui/material/Grid';
import { Card, CardContent, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertProps} from '@mui/material/Alert';
import { CopyBlock, a11yLight } from 'react-code-blocks';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

function AnalyticsScriptComponent( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);
  const http = useAxios();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [analyticsScript, setAnalyticsScript] = useState("");

  useEffect(() => {
    setAnalyticsScript(`<script>
  // Initialize the agent at application startup.
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load());

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // Send request data
      fetch("${AppContextState.url}/tenant/${AppContextState.tenant}/analytics/request", {
        method: "POST",
        body: JSON.stringify({
          fingerprint: result.visitorId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept": "application/json"
        }
      });
    })
</script>`);
  }, [AppContextState]);

  const copyAnalyticsScript = () => {
    navigator.clipboard.writeText(analyticsScript);
    setSnackbarMessage("Copied analytics script to clipboard");
    setSnackbarOpen(true);
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>

            <Grid item container xs={12} justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="h2">
                Analytics Script
              </Typography>
              <Button variant="contained" onClick={() => {copyAnalyticsScript()}}>Copy Embedded Script</Button>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom component="p">
                Copy this script and place it on each page of your website. Every time this script gets executed it will make a request to the CMS and count as a view.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography gutterBottom component="p">
                    View Script
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CopyBlock
                    text={analyticsScript}
                    language={"html"}
                    theme={a11yLight}
                    showLineNumbers={true}
                    onCopy={() => {
                      setSnackbarMessage("Copied analytics script to clipboard");
                      setSnackbarOpen(true);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="info">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}

export {AnalyticsScriptComponent};
