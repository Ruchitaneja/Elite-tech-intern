(async function(){
    const form = document.getElementById('login-form');
    const msg = document.getElementById('msg');
  
    function showMessage(text, isError = false){
      msg.textContent = text;
      msg.className = 'message ' + (isError ? 'error' : 'success');
    }
  
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
  
      const username = form.username.value.trim();
      const password = form.password.value;
  
      const users = JSON.parse(localStorage.getItem('users') || '{}');
  
      const user = users[username];
  
      if(!user){
        showMessage('Username does not exist.', true);
        return;
      }
  
      const hashedPassword = await hashPassword(password);
  
      if(hashedPassword !== user.password){
        showMessage('Incorrect password.', true);
        return;
      }
  
      // Login success: save session
      localStorage.setItem('loggedInUser', username);
  
      showMessage('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = 'secured.html';
      }, 1000);
    });
  })();
  