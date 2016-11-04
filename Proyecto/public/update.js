var update = document.getElementById('update');

update.addEventListener('click', function () {

  var  name = document.getElementById('name').value;
  var  control = document.getElementById('control').value;

  // Send PUT Request here
  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': name,
    'control': control
  })
}).then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
});
