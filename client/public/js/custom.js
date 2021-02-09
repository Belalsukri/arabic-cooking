function showModal(error, title, content) {
    const modal = document.querySelector('#resultModal')
    const modal_header = modal.querySelector('.modal-header')
    const modal_body = modal.querySelector('.modal-body')
    if (error) {
        modal_header.classList.add('bg-danger')
        modal_header.classList.remove('bg-success')
    } else {
        modal_header.classList.remove('bg-danger')
        modal_header.classList.add('bg-success')
    }
    modal_header.innerHTML = title
    modal_body.innerHTML = '<p>' + content + '</p>'
    $('#resultModal').show('modal')
  }
//   function navColps() {
//       let burger=document.querySelector('.navbar-toggler')
//       let navAbaut =document.querySelector('.list-group')
//       burger.addEventListener('click',function () {
//            navAbaut.classList.toggle('hiden')
          
//       })
  
//   }
//   navColps()
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Or using the CommonJS version:
// const ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );

ClassicEditor
	.create( document.querySelector( '#editor' ) )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( error => {
		console.error( 'There was a problem initializing the editor.', error );
	} );