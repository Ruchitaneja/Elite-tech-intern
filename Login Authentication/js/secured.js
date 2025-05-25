(function(){
    const fullnameDisplay = document.getElementById('user-fullname');
    const logoutBtn = document.getElementById('logout-btn');
  
    // Check if logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser){
      // Not logged in: redirect to login page
      window.location.href = 'login.html';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[loggedInUser];
    if(!user){
      // Invalid user session
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
      return;
    }
  
    fullnameDisplay.textContent = user.fullname;
  
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  })();
  