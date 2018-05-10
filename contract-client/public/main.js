$.ajax({
  url: 'http://localhost:3000/contract',
  type: 'GET',
  success: function(response) {
    console.log(response);
    var datalength = response.data.length;
    console.log(datalength);
    for (var i = 0; i < datalength; i++) {
      $('#my-container').append(`<div class="col-md-6" style="display:inline-block;" id="my_`+response.data[i]._id+`"><div class="jumbotron">
          <h1 class="display-6">`+response.data[i].contractor_name+`</h1>
          <p class="lead">`+response.data[i].type_proc+`</p>
          <hr class="my-4">
          <p>Contract Price: €`+response.data[i].contract_price + ` / Total Price: €`+response.data[i].total_price + `</p>
          <p class="lead">
            <a id="`+response.data[i]._id+`" class="btn btn-primary btn-small edit" data-toggle="modal" data-target="#exampleModalLong"href="#" role="button"data-toggle="modal" data-target="#exampleModalLong">Edit contract</a>
            <a id="`+response.data[i]._id+`" class="btn btn-primary btn-small delete" href="#" role="button">Delete contract</a>
          </p>
        </div></div>`);
    }
  }
})

$('#submit-contract').click(function(e) {
  let ob = {
    nr_proc:$('#nr_proc').val(),
    type_proc:$('#type_proc').val(),
    act_proc:$('#act_proc').val(),
    date_init:$('#date_init').val(),
    date_publish:$('#date_publish').val(),
    date_signing:$('#date_signing').val(),
    time_imp_1:$('#time_imp_1').val(),
    time_imp_2:$('#time_imp_2').val(),
    date_close:$('#date_close').val(),
    contract_price:$('#contract_price').val(),
    total_price:$('#total_price').val(),
    contractor_name:$('#contractor_name').val(),
  }


  $.ajax({
    url:'http://localhost:3000/contract',
    type: 'POST',
    data:ob,
    success: function(response) {
      console.log(ob);
      location.reload();
    }
  });
});

$('#my-container').on('click', '.delete', (e) => {
    $.ajax({
        url: 'http://localhost:3000/contract/delete/' + e.target.id,
        type: 'DELETE',
        success: (response) => {
           $(e.target).parent().parent().remove();
           location.reload();
        }
    })
})

let id;
$('#my-container').on('click', '.edit', (e) => {
    id = e.target.id;
    $.ajax({
        url: 'http://localhost:3000/contract/' + id,
        type: 'GET',
        success: (response) => {
            console.log(response);
            $('#nr_proc').val(response.data.nr_proc),
            $('#type_proc').val(response.data.type_proc),
            $('#act_proc').val(response.data.act_proc),
            $('#date_init').val(response.data.date_init),
            $('#date_publish').val(response.data.date_publish),
            $('#date_signing').val(response.data.date_signing),
            $('#time_imp_1').val(response.data.time_imp_1),
            $('#time_imp_2').val(response.data.time_imp_2),
            $('#date_close').val(response.data.date_close),
            $('#contract_price').val(response.data.contract_price),
            $('#total_price').val(response.data.total_price),
            $('#contractor_name').val(response.data.contractor_name),
            $('#exampleModalLong').modal()
        }
    })
})

$('#exampleModalLong').on('click', '#contractEdit', (e) => {
    let object = {
      nr_proc:$('#nr_proc').val(),
      type_proc:$('#type_proc').val(),
      act_proc:$('#act_proc').val(),
      date_init:$('#date_init').val(),
      date_publish:$('#date_publish').val(),
      date_signing:$('#date_signing').val(),
      time_imp_1:$('#time_imp_1').val(),
      time_imp_2:$('#time_imp_2').val(),
      date_close:$('#date_close').val(),
      contract_price:$('#contract_price').val(),
      total_price:$('#total_price').val(),
      contractor_name:$('#contractor_name').val(),
    }
    e.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/contract/update/' + id,
        type: 'PUT',
        data: object,
        success: (response) => {
            console.log(response);
            $('#exampleModalLong').modal('hide');
            $($('#my_'+id)).html(`
              <div class="jumbotron">
                  <h1 class="display-6">${response.data.contractor_name}</h1>
                  <p class="lead">${response.data.type_proc}</p>
                  <hr class="my-4">
                  <p>Contract Price: € ${response.data.contract_price} / Total Price: € ${response.data.total_price}</p>
                  <p class="lead">
                    <a id="${response.data._id}" class="btn btn-primary btn-small edit" data-toggle="modal" data-target="#exampleModalLong"href="#" role="button"data-toggle="modal" data-target="#exampleModalLong">Edit contract</a>
                    <a id="${response.data._id}" class="btn btn-primary btn-small delete" href="#" role="button">Delete contract</a>
                  </p>
                </div>
            `);
        }
    })
})
