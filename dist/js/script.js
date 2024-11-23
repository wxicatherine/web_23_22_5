function loadDataWithXMLHttpRequest(){let t=new XMLHttpRequest;t.open("GET","http://192.168.56.1:8080/data.json",!0),t.onload=function(){var e;200<=t.status&&t.status<300?(populateResume(e=JSON.parse(t.responseText)),renderSkillsLanguagesHobbies(e),console.log(e),applyAnimations()):console.error("HTTP error! status: "+t.status)},t.onerror=function(){console.error("Error loading JSON via XMLHttpRequest")},t.send()}function populateResume(e){console.log(e.header),document.querySelector(".header h1").innerHTML=`${e.header.name} <span class="normal">${e.header.surname}</span>`,document.querySelector(".header h2").textContent=e.header.title,document.querySelector(".icon1").innerHTML='<i class="fa-solid fa-location-dot"></i> '+e.header.location,document.querySelector(".icon2").innerHTML='<i class="fa-solid fa-phone-volume"></i> '+e.header.phone,document.querySelector(".icon3").innerHTML='<i class="fa-solid fa-globe"></i> '+e.header.website,document.querySelector(".about p").innerHTML=e.about.description;let t=document.querySelector(".education"),n=(e.education.forEach(e=>{e=`<div class="education-item">
        <div class="left-smallcolumn">
          <h6>${e.institution}</h6>
          <h5>${e.years}</h5>
        </div>
        <div class="right-smallcolumn">
          <h4>${e.degree}</h4>
          <p>${e.details}</p>
        </div>
      </div>`;t.insertAdjacentHTML("beforeend",e)}),document.querySelector(".experience")),s=(e.experience.forEach(e=>{e=`<div class="experience-item">
        <div class="left-smallcolumn">
          <h6>${e.company}</h6>
          <p class="right-align">${e.location}</p>
          <h5>${e.years}</h5>
        </div>
        <div class="right-smallcolumn">
          <h4>${e.position}</h4>
          <p>${e.details}</p>
        </div>
      </div>`;n.insertAdjacentHTML("beforeend",e)}),document.querySelector(".references"));e.references.forEach(e=>{e=`<div class="gap">
        <h4>${e.name}</h4>
        <h5>${e.address}</h5>
        <p>Tel: ${e.phone}</p>
        <p>Email: ${e.email}</p>
      </div>`;s.insertAdjacentHTML("beforeend",e)})}function renderSkillsLanguagesHobbies(e){let t=document.getElementById("skills-container");e.skills.forEach(e=>{e=`<div class="skills">
        <span>${e.name}</span>
        <div class="bar-container">
          <div class="bar" style="width: ${e.level};"></div>
        </div>
      </div>`;t.insertAdjacentHTML("beforeend",e)});let s=document.getElementById("languages-container"),n=([{name:"English",proficiency:"95%"},{name:"German",proficiency:"60%"},{name:"Spanish",proficiency:"45%"}].forEach(e=>{var t=document.createElement("figure"),n=(t.classList.add("pie-chart",e.name.toLowerCase()),document.createElement("figcaption"));n.innerHTML=e.proficiency+"<br />"+e.name,t.appendChild(n),s.appendChild(t)}),document.getElementById("hobbies-container"));e.hobbies.forEach(e=>{e=`<div class="hobbies">
        <span>${e.name}</span>
        <div class="bar-container">
          <div class="bar" style="width: ${e.level};"></div>
        </div>
      </div>`;n.insertAdjacentHTML("beforeend",e)})}function applyAnimations(){document.querySelectorAll(".bar").forEach(e=>{let t=e.style.width;e.style.width="0",setTimeout(()=>{e.style.transition="width 2s",e.style.width=t},300)});let e=document.querySelector(".about p"),t=document.createElement("button");t.textContent="Read more",t.classList.add("read-more-btn"),e.after(t),t.addEventListener("click",()=>{e.innerHTML+="<span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>",t.style.display="none"});var n=document.querySelectorAll(".pie-chart");n.forEach((e,t)=>{e.style.transition="transform 0.5s ease, opacity 0.5s ease",e.style.opacity="0",setTimeout(()=>{e.style.opacity="1"},300*t),e.addEventListener("mouseenter",()=>{e.style.transform="scale(1.5)",e.style.zIndex="10"}),e.addEventListener("mouseleave",()=>{e.style.transform="scale(1)",e.style.zIndex="1"})}),n.forEach(e=>{let t=document.createElement("div");t.classList.add("tooltip"),t.textContent="Це кругова діаграма.",document.body.appendChild(t),e.addEventListener("mouseenter",e=>{t.style.left=e.pageX+10+"px",t.style.top=e.pageY+10+"px",t.style.opacity="1"}),e.addEventListener("mousemove",e=>{t.style.left=e.pageX+10+"px",t.style.top=e.pageY+10+"px"}),e.addEventListener("mouseleave",()=>{t.style.opacity="0"})})}fetch("http://192.168.56.1:8080/data.json").then(e=>{if(e.ok)return e.json();throw new Error("HTTP error! status: "+e.status)}).then(e=>{populateResume(e),renderSkillsLanguagesHobbies(e),console.log(e),applyAnimations()}).catch(e=>console.error("Error loading JSON:",e));