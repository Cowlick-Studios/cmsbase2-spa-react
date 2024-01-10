import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link as A } from 'react-router-dom';
import {http, axios} from '../../services/http';
import { AppContext } from '../../contexts/AppContext';

import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertProps} from '@mui/material/Alert';

function ClientAnalyticsPage( {}: any ) {
  const navigate = useNavigate();
  const AppContextState: any = useContext(AppContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const copyAnalyticsScript = () => {
    navigator.clipboard.writeText(`
<script>
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
</script>
    `);

    setSnackbarMessage("Copied analytics script to clipboard");
    setSnackbarOpen(true);
  }

  return (
    <>
      <p>Client Analytics</p>

      <button onClick={() => {copyAnalyticsScript()}}>Copy Embedded Analytics Script Tag</button>

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

export {ClientAnalyticsPage};
