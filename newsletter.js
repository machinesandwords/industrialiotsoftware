(function () {
  var WORKER_URL = 'https://newsletter.industrialiotsoftware.com';

  function subscribe(email, groupId, onSuccess, onError) {
    fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, group_id: groupId })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.message === 'Subscribed') {
          onSuccess();
        } else {
          onError();
        }
      })
      .catch(function () { onError(); });
  }

  // Main subscribe page form
  var submitBtn = document.getElementById('nl-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var email = (document.getElementById('nl-email').value || '').trim();
      var msg = document.getElementById('nl-msg');
      if (!email || !email.includes('@')) {
        msg.textContent = 'Please enter a valid email address.';
        return;
      }
      submitBtn.disabled = true;
      subscribe(
        email,
        '189858333791880417',
        function () { msg.textContent = 'You\u2019re subscribed.'; },
        function () { msg.textContent = 'Something went wrong. Please try again.'; submitBtn.disabled = false; }
      );
    });
  }
})();
