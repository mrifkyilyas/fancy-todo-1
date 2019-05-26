var idproject = ''
function createProject() {
  event.preventDefault()
  const name = $('#create-project-name').val()
  $.ajax({
    url: `${baseurl}/project/`,
    method: 'POST',
    data: {
      name
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log(response)
      $('#add-project').modal('hide')
      projectListShow()
      $('#create-project-name').val("")
      Swal.fire({
        type: 'success',
        title: 'Successfully create',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
      $('#create-project-name').val("")
    })
}

function getProjectlist() {
  $.ajax({
    url: `${baseurl}/project/`,
    method: 'GET',
    data: {
      name
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      let daftar = ``
      response.reverse().map(resp => {
        if (resp.owner.email === localStorage.email) {
          daftar += ` <li  class="list-group-item"> <a class="nav-link active" data-toggle="tab" 
          role="tab" onclick="projectDetailShow('${resp._id}')"><i class="fas fa-users"></i>
          <h5>${resp.name}</h5></a> <div style="float:right"><a onclick="deleteProject('${resp._id}')"><i class="fas fa-trash text-danger" ></i></a> | 
          <a onclick="editProjectShow('${resp.name}','${resp._id}')"><i class="fas fa-edit text-info" data-toggle="modal" data-target="#edit-project"></i></a></div></li>`

        } else {
          daftar += ` <li  class="list-group-item"> <a class="nav-link active" data-toggle="tab" 
          role="tab" onclick="projectDetailShow('${resp._id}')"><i class="fas fa-users"></i>
          <h5>${resp.name}</h5></a></li>`

        }

      })
      $('#project-name-list').html('')
      $('#project-name-list').append(daftar)
      getDataAllTaskProject()

      event.preventDefault()

    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}

function getOneProject(id) {
  $.ajax({
    url: `${baseurl}/project/${id}`,
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      let listMember = ``
      response.members.map(member => {
        if (response.owner.email == localStorage.email) {
          if (member.email === localStorage.email) {
            listMember += `<li class="list-group-item"> <a class="nav-link active" data-toggle="tab" href="#panel7"
          role="tab"><i class="fas fa-user"></i>
         ${member.name}</a>(owner)</li>`
          } else {
            listMember += `<li class="list-group-item"> <a class="nav-link active" data-toggle="tab" href="#panel7"
          role="tab"><i class="fas fa-user"></i>
         ${member.name}</a><a onclick="deleteMember('${member._id}','${response._id}')"><i class="fas fa-trash text-danger" ></i></a></li>`
          }
        } else {
          listMember += `<li class="list-group-item"> <a class="nav-link active" data-toggle="tab" href="#panel7"
          role="tab"><i class="fas fa-user"></i>
         ${member.name}</a></li>`
        }
      })
      $('#project-member').html('')
      $('#project-member').append(listMember)
      $('#name-title-project').html('')
      $('#name-title-project').append(response.name)
      idproject = response._id
      if (response.owner.email == localStorage.email) {
        $('#btnaddmember').html('')
        $('#btnaddmember').append(`<a href="" class="btn btn-info" data-toggle="modal" data-target="#add-member-project"><i
        class="fa fa-user-plus" aria-hidden="true"></i></a>`)
        $('#btnaddmember').show()
      } else {
        $('#btnaddmember').html('')
        $('#btnaddmember').hide()
      }

    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function deleteProject(id) {
  $.ajax({
    url: `${baseurl}/project/${id}`,
    method: 'DELETE',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log('berhasil delete project');
      event.preventDefault()
      projectListShow()

    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function updateProject() {
  event.preventDefault()
  const name = $('#edit-project-name').val()
  const id = $('#edit-project-id').val()
  $.ajax({
    url: `${baseurl}/project/${id}`,
    method: 'PATCH',
    data: {
      name
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      $('#edit-project').modal('hide')
      projectListShow()
      $('#edit-project-name').val("")
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
      $('#edit-project-name').val("")
    })

}

function editProjectShow(name, id) {
  console.log(name, 'edit project name')
  $('#edit-project-name').val(name)
  $('#edit-project-id').val(id)

}

function addMember() {
  const email = $('#add-member-email').val()
  $.ajax({
    url: `${baseurl}/user/${email}`,
    method: 'GET',
    data: {
      name
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (user) {
      if (user) {
        return $.ajax({
          url: `${baseurl}/project/addmember/${idproject}`,
          method: 'POST',
          data: {
            idMember: user._id
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
          .done(function (member) {
            $('#add-member-project').modal('hide')
            projectDetailShow(member._id)
          })
          .fail(function (jqXHR, textStatus) {
            console.log('request failed', textStatus)
          })
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function deleteMember(idMember, idproject) {
  $.ajax({
    url: `${baseurl}/project/deletemember/${idproject}`,
    method: 'DELETE',
    data: {
      idMember: idMember
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (member) {
      projectDetailShow(member._id)
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}
function createTaskProject() {
  event.preventDefault()
  const title = $('#create-name-taskproject').val()
  const description = $('#create-description-taskproject').val()
  const duedate = $('#create-duedate-taskproject').val()
  const status = false
  $.ajax({
    url: `${baseurl}/task/project/${idproject}`,
    method: 'POST',
    data: {
      title,
      description,
      duedate,
      status
    },
    headers: {
      access_token: localStorage.access_token,
      projectId:idproject
    }
  })
    .done(function (response) {
      console.log('berhasil create')
      $('#create-todo-project').modal('hide')
      event.preventDefault()
      $('#create-name-taskproject').val('')
      $('#create-description-taskproject').val('')
      $('#create-duedate-taskproject').val('')
      projectDetailShow(idproject)
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function getDataAllTaskProject(id) {
  $.ajax({
    url: `${baseurl}/task/project/${id}`,
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(function (response) {
      console.log(response)
      response = response.reverse()
      let daftar = ``
      response.map(resp => {
        if(resp.status == "true"){
          daftar += `<div class="p-2" style="border:10px;">
              <div class="form-check">
                  <input type="radio" class="form-check-input" id="materialUnchecked"
                      name="materialExampleRadios">
                  <label class="form-check-label" for="materialUnchecked">
                <strike>      <p class="font-weight-bold" style="font-size:18px;">${resp.title}</p> </strike>  
                  </label>
                  <strike>     <p class="font-italic">${resp.description}.</p> </strike>  
                  <strike>   <p class="font-weight-lighter">${resp.duedate}</p> </strike>  
                  <a href="#" onclick="deleteTaskProject('${resp._id}');"><i class="fas fa-trash text-danger"></i></a> |
                  <a href="#" data-toggle="modal" data-target="#edit-todo-project" onclick="showEditTaskProject('${resp._id}','${resp.description}','${resp.title}','${resp.duedate}');"><i class="fas fa-edit text-info" ></i></a>
                  | <a href="#" onclick="updateStatusTaskProject('${resp._id}');"><i class="fas fa-undo"></i></a> 
              </div>
          </div>`
        }else{
          daftar += `<div class="p-2" style="border:10px;">
              <div class="form-check">
                  <input type="radio" class="form-check-input" id="materialUnchecked"
                      name="materialExampleRadios">
                  <label class="form-check-label" for="materialUnchecked">
                      <p class="font-weight-bold" style="font-size:18px;">${resp.title}</p>
                  </label>
                  <p class="font-italic">${resp.description}.</p>
                  <p class="font-weight-lighter">${resp.duedate}</p>
                  <a href="#" onclick="deleteTaskProject('${resp._id}');"><i class="fas fa-trash text-danger"></i></a> |
                  <a href="#" data-toggle="modal" data-target="#edit-todo-project" onclick="showEditTaskProject('${resp._id}','${resp.description}','${resp.title}','${resp.duedate}');"><i class="fas fa-edit text-info" ></i></a>
                  | <a href="#" onclick="updateStatusTaskProject('${resp._id}');"><i class="fas fa-check"></i></a> 
              </div>
          </div>`
        }
      })
      idproject=id
      $('#todos-project').html('')
      $('#todos-project').append(daftar)
      event.preventDefault()
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}
function editTaskProject() {
  event.preventDefault()
  const title = $('#edit-name-project').val()
  const description = $('#edit-description-project').val()
  const duedate = $('#edit-duedate-project').val()
  const id = $('#edit-id-project').val()
  console.log(id)
  $.ajax({
    url: `${baseurl}/task/project/${id}`,
    method: 'PUT',
    data: {
      title,
      description,
      duedate,
    },
    headers: {
      access_token: localStorage.access_token,
      projectId:idproject
    }
  })
    .done(function (response) {
      console.log('berhasil edit')
      $('#edit-todo-project').modal('hide')
      getDataAllTaskProject(idproject)
      event.preventDefault()
      $('#edit-id-project').val('')
      $('#edit-name-project').val('')
      $('#edit-description-project').val('')
      $('#edit-duedate-project').val('')
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}
function showEditTaskProject(id, desc, title, duedate) {
  console.log('masuk ke sini')
  $('#edit-name-project').val(title)
  $('#edit-description-project').val(desc)
  $('#edit-duedate-project').val(duedate)
  $('#edit-id-project').val(id)
}

function deleteTaskProject(id) {
  event.preventDefault()
 
  console.log(id)
  $.ajax({
    url: `${baseurl}/task/project/${id}`,
    method: 'DELETE',
    data: {
    },
    headers: {
      access_token: localStorage.access_token,
      projectId:idproject
    }
  })
    .done(function (response) {
      console.log('berhasil Delete')
      getDataAllTaskProject(idproject)
      event.preventDefault()
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}
function updateStatusTaskProject(id) {
  event.preventDefault()
 
  console.log(id)
  $.ajax({
    url: `${baseurl}/task/project/status/${id}`,
    method: 'PUT',
    data: {
    },
    headers: {
      access_token: localStorage.access_token,
      projectId:idproject
    }
  })
    .done(function (response) {
      getDataAllTaskProject(idproject)
      event.preventDefault()
    })
    .fail(function (jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })

}


function projectShow() {
  clear()
  $('#nav-my-profile').show()
  $('#hello').html('')
  $('#hello').show()
  $('#hello').append(`hello, ${localStorage.name}`)
  $('#content-project').show()
}

function projectListShow() {
  projectShow()
  $('#project-list').show()
  $('#project-detail').hide()
  getProjectlist()


}
function projectDetailShow(id) {
  projectShow()
  $('#project-list').hide()
  $('#project-detail').show()
  getOneProject(id)
  getDataAllTaskProject(id)

}