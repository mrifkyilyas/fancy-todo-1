
function createTask() {
  event.preventDefault()
  const title = $('#create-name').val()
  const description = $('#create-description').val()
  const duedate = $('#create-duedate').val()
  const status = false
  $.ajax({
    url: `${baseurl}/task/`,
    method: 'POST',
    data: {
      title,
      description,
      duedate,
      status
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log('berhasil create')
      $('#create-todo').modal('hide')
      getDataAllDataById()
      event.preventDefault()
      $('#create-name').val('')
      $('#create-description').val('')
      $('#create-duedate').val('')
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function getDataAllDataById() {
  $.ajax({
    url: `${baseurl}/task/mytask`,
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log(response, 'ini adlaah daftar fancytodo')
      response = response.reverse()
      let daftar = ``
      response.map(resp => {
        if (resp.status === "true") {
          daftar += `<div class="p-2" style="border:10px;">
          <div class="form-check">
              <label class="form-check-label" for="materialUnchecked">
                  <p class="font-weight-bold" style="font-size:18px;">${resp.title}</p>
              </label>
              <p class="font-italic">${resp.description}</p>
              <p class="font-weight-lighter">due date :${resp.duedate}</p>
              <a href="#" onclick="deleteTask('${resp._id}');"><i class="fas fa-trash text-danger"></i></a> |
              <a href="#" data-toggle="modal" data-target="#edit-todo" onclick="showEditTask('${resp._id}','${resp.description}','${resp.title}','${resp.duedate}');"><i class="fas fa-edit text-info" ></i></a>
              |   <a href="#" onclick="updateStatusTask('${resp._id}');"><i class="fas fa-check" aria-hidden="true"></i></a>
          </div>
      </div>
      <hr>`

        } else {
          daftar += `<div class="p-2" style="border:10px; " >
          <div class="form-check">
              <label class="form-check-label" for="materialUnchecked">
              <strike>  <p class="font-weight-bold" style="font-size:18px;">${resp.title}</p>   </strike> 
              </label>
             <strike> <p class="font-italic ">${resp.description}</p></strike>
             <strike>  <p class="font-weight-lighter">due date :${resp.duedate}</p>    </strike> 
              <a href="#" onclick="deleteTask('${resp._id}');"><i class="fas fa-trash text-danger"></i></a> |
              <a href="#" data-toggle="modal" data-target="#edit-todo" onclick="showEditTask('${resp._id}','${resp.description}','${resp.title}','${resp.duedate}');"><i class="fas fa-edit text-info" ></i></a>
              | 
              <a href="#" onclick="updateStatusTask('${resp._id}');"><i class="fas fa-undo" aria-hidden="true"></i></a>
          </div>
      </div>
      <hr>`

        }

      })
      $('#todos').html('')
      $('#todos').append(daftar)
      event.preventDefault()
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function showEditTask(id, desc, title, duedate) {
  $('#edit-name').val(title)
  $('#edit-description').val(desc)
  $('#edit-duedate').val(duedate)
  $('#edit-id').val(id)
}

function editTask() {
  event.preventDefault()
  const title = $('#edit-name').val()
  const description = $('#edit-description').val()
  const duedate = $('#edit-duedate').val()
  const id = $('#edit-id').val()
  $.ajax({
    url: `${baseurl}/task/${id}`,
    method: 'PUT',
    data: {
      title,
      description,
      duedate,
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log('berhasil edit')
      $('#edit-todo').modal('hide')
      getDataAllDataById()
      event.preventDefault()
      $('#edit-name').val('')
      $('#edit-description').val('')
      $('#edit-duedate').val('')
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}




function updateStatusTask(id) {
  event.preventDefault()
  $.ajax({
    url: `${baseurl}/task/status/${id}`,
    method: 'PUT',
    data: {
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      loadHalaman()
      getDataAllDataById()
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}



function deleteTask(id) {
  console.log(id)
  $.ajax({
    url: `${baseurl}/task/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log(response)
      loadHalaman()

    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
  event.preventDefault()
}

function loadHalaman() {
  clear()
  $('#nav-my-profile').show()
  $('#content-utama').show()
  getDataAllDataById()
  $('#hello').html('')
  $('#hello').show()
  $('#hello').append(`hello, ${localStorage.name}`)


}

function todoShow() {
  loadHalaman()

}

