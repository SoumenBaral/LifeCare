const loadUserDetails = () => {
    const Loader = document.getElementById('Loader')
    Loader.style.display='block'
    const UserId = localStorage.getItem('user_id');
    console.log(UserId);
    fetch(`https://testing-8az5.onrender.com/users/${UserId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Loader.style.display='none'
            const parent = document.getElementById('user-profile');
            const Div = document.createElement('div');
            Div.classList.add('user-container');
            Div.innerHTML = `
                <div class=" d-md-flex justify-content-between align-items-center gap-5">
                    <div class="doctorImg my-4 m-md-0 ">
                        <img src='../Images/Me.jpeg' alt="" srcset="">
                    </div>
                    <div class="docInfo text-center">
                        <h2 id="DocName">${data?.username}</h2>
                        <h4>${data?.first_name + data?.last_name}</h4>
                        <h5>${data?.email}</h5>
                        <p class="w-100">Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.</p>
                    </div>
                </div>`;
            parent.appendChild(Div);
        });
};

loadUserDetails();
