function clear(){
  $('#nav-my-profile').hide()
  $('#nav-sign-in').hide()
  $('#content-utama').hide()
  $('#login-form-panel').hide()
  $('#register-form-panel').hide()
  $('#hello').hide()
  $('#content-project').hide()
  

}


$(document).ready(function () {
  if (!localStorage.access_token) {
    console.log('belum login')
    preLogin()

  } else {
    console.log('sedang login', localStorage.access_token)
    postLogin()
    loadHalaman()
    $('#hello').show()

  }
  $('#form-register').submit(function () {
    register()

  })

  

  $('#form-login').submit(function () {
    login()
  })

  $('#create-task').submit(function (e) {
    e.preventDefault()
    createTask()

  })
  $('#create-task-project').submit(function (e) {
    e.preventDefault()
    createTaskProject()

  })
  $('#edit-task').submit(function (e) {
    e.preventDefault()
    editTask()
  })
  $('#edit-task-project').submit(function (e) {
    e.preventDefault()
    editTaskProject()
  })
  $('#create-project').submit(function (e) {
    e.preventDefault()
    createProject()
  })

  $('#edit-project').submit(function (e) {
    e.preventDefault()
    updateProject()
  })

  $('#add-member').submit(function (e) {
    e.preventDefault()
    addMember()
  })
})

