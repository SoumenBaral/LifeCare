
const loadDetails = () => {
    fetch('https://testing-8az5.onrender.com/services/')
        .then(res => res.json())
        .then(data =>DisplayDetails(data))
        .catch(err => console.log(err))
}
const DisplayDetails=data=>{
    console.log(data);
data.forEach(item => {
    const parent = document.getElementById('slider-container')
    const LI = document.createElement('li')
    LI.classList.add('card-container') 
    LI.innerHTML=`
            <div class="card shadow h-100">
            <div class="ratio ratio-16x9">
                <img src=${item.image} class="card-img-top" loading="lazy" alt="...">
            </div>
            <div class="card-body p-3 p-xl-5">
                <h3 class="card-title h5">${item.name}</h3>
                <p class="card-text">${item.description.slice(0,210)}</p>
                <div><a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    `
    parent.appendChild(LI)
    
});
}

const loadDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          const parent = document.getElementById("drop-deg");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerText = item?.name;
          parent.appendChild(li);
        });
      });
  };
  const loadSpecialization = () => {
    fetch("http://testing-8az5.onrender.com/doctor/specialization/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          const parent = document.getElementById("drop-spe");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerText = item?.name;
          parent.appendChild(li);
        });
      });
  };
loadDetails();
loadDesignation();
loadSpecialization();



