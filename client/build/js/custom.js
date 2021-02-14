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
//     let burger=document.querySelector('.navbar-collapse')
//       let navAbaut =document.querySelectorAll('.nav-item ')
      
//       navAbaut.addEventListener('click',function () {
       
//         burger.classList.toggle('hiden ')
          
//       })
  
//   }
//   navColps()


