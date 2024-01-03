
const loadDetails = () => {
    fetch('https://testing-8az5.onrender.com/services/')
        .then(res => res.json())
        .then(data =>DisplayDetails(data))
        .catch(err => console.log(err))
}
const DisplayDetails=data=>{
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

const loadDoctors =(search)=>{
    document.getElementById("doctors").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    console.log(search);
    fetch(
        `https://testing-8az5.onrender.com/doctor/list/?search=${
          search ? search : ""
        }`
      )
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
            if (data.results.length > 0) {
              document.getElementById("spinner").style.display = "none";
              document.getElementById("nodata").style.display = "none";
              displayDoctors(data?.results);
            } else {
              document.getElementById("doctors").innerHTML = "";
              document.getElementById("spinner").style.display = "none";
              document.getElementById("nodata").style.display = "block";
            }
          });
}
const displayDoctors=(results)=>{
    console.log(results);
    results?.forEach(item => {
        console.log(item);
            const parent = document.getElementById("doctors");
            const Div = document.createElement('div');

            Div.classList.add('doctor-card')
            Div.innerHTML=`
                            <img  src=${item.image} alt="">
                            <h4 class="text-primary my-3">${item.full_name}</h4>
                            <h5>${item.designation[0]}</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                            numquam!</p>
                            <div class="d-flex flex-wrap gap-3">
                            ${item?.specialization?.map((it) => {
                                return `<button  class="special-btn">${it}</button>`
                              })}
                            </div>
                            <br>
                            <button class="search-btn mt-2"> <a class='text-decoration-none text-white' target="_blank" href="docDetails.html?doctorId=${item.id}">Details</a></button>

            `
            parent.appendChild(Div);
        
    });
}

const loadDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("drop-deg");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `
          <li onclick="loadDoctors('${item?.name}')"> ${item?.name}</li>
            `;
          parent.appendChild(li);
        });
      });
  };
  const loadSpecialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("drop-spe");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `
          <li onclick="loadDoctors('${item?.name}')"> ${item?.name}</li>
            `;
          parent.appendChild(li);
        });
      });
};
const SearchByValue=()=>{
    const search = document.getElementById('search')
    loadDoctors(search.value)
    
}
loadDoctors('Dermatologist')
loadSpecialization();
loadDetails();
loadDesignation();




