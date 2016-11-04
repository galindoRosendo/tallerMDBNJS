var del = document.getElementById('delete');

del.addEventListener('click', function () {
  var  control = document.getElementById('control').value;
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'control': control
    })
  }).then(res => {
  if (res.ok) return res.json()
}).then(data => {
  console.log(data);
  window.location.reload(true)
})
});
