import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditorCustom from 'ckeditor5-custom-build/build/ckeditor';

import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Editor({label = "", data = "", onChange}: any) {

  // const [data, setData] = useState<string>("");

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {label}
          </Typography>

          <CKEditor
            editor={ ClassicEditorCustom }
            data={data}
            onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
            }}
            onChange={ ( event, editor ) => {
              onChange( editor.getData() );
            }}
            onBlur={ ( event, editor ) => {
              console.log( 'Blur:', editor );
            }}
            onFocus={( event, editor ) => {
              console.log( 'Focus:', editor );
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default Editor;
