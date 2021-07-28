$(document).ready(function() {
  //Default data table
  $('#default-datatable').DataTable();


  var table = $('#example').DataTable( {
    lengthChange: false,
    buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
  } );

  table.buttons().container()
    .appendTo( '#example_wrapper .col-md-6:eq(0)' );

} );
