function onSignIn(googleUser) {
  if (!localStorage.getItem('access_token')) {
    const id_token = googleUser.getAuthResponse().id_token
    console.log('masuk')
    $.ajax({
      url: `${baseurl}/google-login`,
      method: 'POST',
      data: {
        token: id_token
      }
    })
      .done(response => {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('name', response.name)
        localStorage.setItem('email', response.email)
        console.log(`berhasil login dengan google dan ini tokennya`, localStorage.access_token)
        postLogin()
        Swal.fire({
          type: 'success',
          title: 'berhasil login',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .fail(err => {
        console.log(err)
      })
  }
}

function login() {
  event.preventDefault()
  const email = $('#login-email').val()
  const password = $('#login-password').val()
  console.log(email, password)
  $.ajax({
    url: `${baseurl}/login`,
    method: 'POST',
    data: {
      email,
      password
    }
  })
    .done(function (response) {
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('name', response.name)
      localStorage.setItem('email', response.email)
      console.log(`berhasil login dengan google dan ini tokennya`, localStorage.access_token)
      postLogin()
      Swal.fire({
        type: 'success',
        title: 'berhasil login',
        showConfirmButton: false,
        timer: 1500
      })
      

    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function register() {
  event.preventDefault()
  const name = $('#register-name').val()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  $.ajax({
    url: `${baseurl}/register`,
    method: 'POST',
    data: {
      name,
      email,
      password
    }
  })
    .done(function (response) {
      console.log(`berhasil register`)
      showLoginPanel()
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'regiter Succesfully',
        showConfirmButton: false,
        timer: 1500
      })

    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}

function signOut() {

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');

  });
  localStorage.clear()
  showLoginPanel()


  Swal.fire({
    position: 'top-end',
    type: 'success',
    title: 'logout successfull',
    showConfirmButton: false,
    timer: 1500
  })
}

function showLoginPanel() {
  event.preventDefault()
  clear()
  $('#login-form-panel').show()
  $('#nav-sign-in').show()
  $('#project-nav').hide()
  $('#my-todo-nav').hide()
}

function showRegisterPanel() {
  event.preventDefault()
  clear()
  $('#register-form-panel').show()
  $('#nav-sign-in').show()
  $('#project-nav').hide()
  $('#my-todo-nav').hide()

}

function preLogin() {
  clear()
  $('#nav-sign-in').show()
  $('#project-nav').hide()
  $('#my-todo-nav').hide()


}

function postLogin() {
  clear()
  $('#nav-my-profile').show()
  $('#content-utama').show()
  $('#hello').html('')
  $('#hello').show()
  $('#hello').append(`hello, ${localStorage.name}`)
  $('#project-nav').show()
  $('#my-todo-nav').show()
  getDataAllDataById()

}

function afterLogout() {
  clear()
  $('#nav-sign-in').show()

}

