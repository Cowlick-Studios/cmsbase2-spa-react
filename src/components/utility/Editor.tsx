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
            onReady={ (editor: any) => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
              editor.ui.view.editable.element.style.minHeight = "400px";
              editor.ui.view.editable.element.style.maxHeight = "70vh";
            }}
            onChange={ ( event, editor: any ) => {
              onChange( editor.getData() );
              editor.ui.view.editable.element.style.minHeight = "400px";
              editor.ui.view.editable.element.style.maxHeight = "70vh";
            }}
            onBlur={ ( event, editor: any ) => {
              console.log( 'Blur:', editor );
              editor.ui.view.editable.element.style.minHeight = "400px";
              editor.ui.view.editable.element.style.maxHeight = "70vh";
            }}
            onFocus={( event, editor: any ) => {
              console.log( 'Focus:', editor );
              editor.ui.view.editable.element.style.minHeight = "400px";
              editor.ui.view.editable.element.style.maxHeight = "70vh";
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default Editor;
