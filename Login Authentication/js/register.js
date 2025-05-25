(async function(){
    const form = document.getElementById('register-form');
    const msg = document.getElementById('msg');
    function showMessage(text, isError = false){
      msg.textContent = text;
      msg.className = 'message ' + (isError ? 'error' : 'success');
    }
    // SHA-256 hash function
    async function hashPassword(password){
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashedBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashedBuffer));
      return hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
    }
    form.addEventListener('submit', async e => {
      e.preventDefault();
      showMessage('');
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      let users = JSON.parse(localStorage.getItem('users') || '{}');
      if(users[username]){
        showMessage('Username already exists, try a different one.', true);
        return;
      }
      // Optional: Check if email is used
      for(const user of Object.values(users)){
        if(user.email === email){
          showMessage('Email is already registered.', true);
          return;
        }
      }
      const hashedPassword = await hashPassword(password);
      users[username] = {
        fullname,
        email,
        password: hashedPassword
      };
      localStorage.setItem('users', JSON.stringify(users));
      showMessage('Registration successful! You may now login.');
      form.reset();
    });
  })();