
const GetPrams =()=>{
    const params = new URLSearchParams(document.location.search).get('doctorId')
    const Loader = document.getElementById('Loader')
    Loader.style.display='block'
    LoadTime(params)
    const url = `https://testing-8az5.onrender.com/doctor/list/${params}`
    fetch(url)
        .then(res=> res.json())
        .then(data => DisplayDoctorDetails(data))

    
  fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${params}`)
    .then((res) => res.json())
    .then((data) => doctorReview(data));
}
const doctorReview = ReviewerDetails =>{
    console.log(ReviewerDetails);
    console.log('what happened baby ');
    ReviewerDetails.forEach(item => {
        console.log(item);
        const parent = document.getElementById("reviewers")
        const Div = document.createElement('div')
        Div.classList.add('reviewer-container')
        Div.innerHTML=` <div  class="d-flex align-items-center justify-content-center my-3 gap-3">
        <img src='../Images/girl.png' class="ReviewImg" loading="lazy" alt="...">
        <div>
            <h4>${item.reviewer}</h4>
            <h6>${item.rating}</h6>
        </div>
    </div>
    <div class="card-body ">
        <h2>An amazing service</h2>
        
        <p class="card-text">${item.body.slice(0,210)}</p>
        
    </div>`
    parent.appendChild(Div)
    });

}
const DisplayDoctorDetails=(doctor)=>{
console.log(doctor);
const Loader = document.getElementById('Loader')
Loader.style.display='none'
const parent = document.getElementById('details_Container')
const Div = document.createElement('div')
Div.innerHTML = ` <div class=" d-md-flex justify-content-between align-items-center gap-5">

<div class="doctorImg my-4 m-md-0 ">
  <img src=${doctor.image} alt="" srcset="">
</div>
<div class="docInfo text-center">
  <h2 id="DocName">${doctor.full_name}</h2>
  <h5>${doctor.designation[0]}</h5>
  <p class="w-100">Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.</p>
  <h4>Fees: ${doctor.fee} BDT</h4>
  <button class="AppointmentBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Take Appointment</button>


</div>`
parent.appendChild(Div)

}

const LoadTime =(id)=>{
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach(item => {
                console.log(item);
                const parent = document.getElementById('time-container')
                const option = document.createElement('option')
                option.value = item.id
                option.innerText = item.name;
                parent.appendChild(option);
             
            });
        })
}

const HandleAppointment = ()=>{
    const patient_id = localStorage.getItem('patient_id');

    const param = new URLSearchParams(window.location.search).get("doctorId");
    const status = document.getElementsByName('status')
    const Selected = Array.from(status).find(btn=>btn.checked)
    const symptom = document.getElementById("symptom").value

    const time = document.getElementById('time-container')
    const SelectedTime = time.options[time.selectedIndex]
    console.log(Selected.value,symptom,SelectedTime.value);

    const info = {

    "appointment_type":Selected.value,
    "appointment_status":"Pending",
    "time": SelectedTime.value,
    "symptom": symptom,
    "cancel": false,
    "patient": patient_id,
    "doctor": param

    }
console.log(info);
fetch('https://testing-8az5.onrender.com/appointment/',{
    method:"POST",
    headers : {"content-type":"application/json"},
    body: JSON.stringify(info)
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
    window.location.href ='../pages/allAppoinment.html'

})
}

const patientId = ()=>{
    const UserId = localStorage.getItem('user_id');
    fetch(`https://testing-8az5.onrender.com/appointment/?user_id=${UserId}`)
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem("patient_id", data[0].id);
        })
}
patientId()
GetPrams()