
import React,{useState }from 'react';
import { Editor } from '@tinymce/tinymce-react';


    class Tinymce extends React.Component {
        constructor(props) {
            super(props);
        
            this.state = { content: '' };
            this.handleEditorChange = this.handleEditorChange.bind(this);
           
            console.log(this.state);
           
          }
        
          handleEditorChange(content, editor) {
            this.setState({ content });
            console.log('Content was updated:', content);
          }
         
          render() {
            return (
                <Editor
                init={{
                    statubar: true,
                    width: "100%",
                    height: 300,
                    theme: "silver",
                    skin: "oxide-dark",
                    selector: 'textarea#myTextArea',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
                    
                  
                }}

                  apiKey='wt8d5rcrexduz1zs6s5ck57ss7u6vwz3p4z5fpavlymw1wmg'
                  tinymceScriptSrc='/path/to/tinymce.min.js'
                  initialValue='Once upon a time...'
                // outputFormat='text'
                tinymceScriptSrc='/path/to/tinymce.min.js'
                value=''
                onEditorChange={this.handleEditorChange}
                
              />
            );
          }
        }

export default Tinymce;