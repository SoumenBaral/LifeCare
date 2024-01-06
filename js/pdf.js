const handlePdf = ()=>{
    const doctor_id = new URLSearchParams(window.location.search).get('doctorId')
    console.log(doctor_id);
    const user_id = localStorage.getItem('user_id')
    console.log(user_id);
    fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
        .then((res) => res.json())
        .then((pdData) => {
            const newData = [data, pdData];
            console.log(newData);
            const parent = document.getElementById('pdf-container')
            const Div = document.createElement('div')
            Div.innerHTML =` <div class="d-flex flex-wrap justify-content-center gap-5 text-center">
            <div class="patient">
                <h3 class="text-success">Patient</h3>
                <div class="info">
                    <div class="text-center">
                        <img class="infoImg" src="../Images/./Me.jpeg" alt="">
                    </div>
                    <p>Name: </p>
                    <h5>${newData[1].username}</h5>
                    <p>Email: </p>
                    <h5>${newData[1].email}</h5>
                </div>

            </div>
            <div class="doctor">
                <h3 class="text-primary ">Doctor</h3>
                <div class="info">
                    <div class="text-center">
                        <img class="infoImg" src=${newData[0].image} alt="">
                    </div>
                    <p>Name: </p>
                    <h5>${newData[0].full_name}</h5>
                    <p>specialization : </p>
                    <h6>${newData[0].specialization[0]} , ${newData[0]?.specialization[1]} </h6>
                    <p>Details: </p>
                    <p class="w-90"><small> Enim esse incidunt distinctio qui quasi fugiat nostrum iste iusto alias doloremque.</small></p>
                </div>
            
             </div>
  
         </div>`
         parent.appendChild(Div)
        })})

}

handlePdf()