function loadDataWithXMLHttpRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.56.1:8080/data.json", true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      populateResume(data);
      renderSkillsLanguagesHobbies(data);
      console.log(data);
      applyAnimations();
    } else {
      console.error(`HTTP error! status: ${xhr.status}`);
    }
  };

  xhr.onerror = function () {
    console.error("Error loading JSON via XMLHttpRequest");
  };

  xhr.send();
}

fetch("http://192.168.56.1:8080/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    populateResume(data);
    renderSkillsLanguagesHobbies(data);
    console.log(data);
    applyAnimations();
  })
  .catch((error) => console.error("Error loading JSON:", error));

function populateResume(data) {
  console.log(data.header);
  document.querySelector(
    ".header h1"
  ).innerHTML = `${data.header.name} <span class="normal">${data.header.surname}</span>`;
  document.querySelector(".header h2").textContent = data.header.title;
  document.querySelector(
    ".icon1"
  ).innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.header.location}`;
  document.querySelector(
    ".icon2"
  ).innerHTML = `<i class="fa-solid fa-phone-volume"></i> ${data.header.phone}`;
  document.querySelector(
    ".icon3"
  ).innerHTML = `<i class="fa-solid fa-globe"></i> ${data.header.website}`;

  document.querySelector(".about p").innerHTML = data.about.description;

  const educationSection = document.querySelector(".education");
  data.education.forEach((edu) => {
    const educationItem = `<div class="education-item">
        <div class="left-smallcolumn">
          <h6>${edu.institution}</h6>
          <h5>${edu.years}</h5>
        </div>
        <div class="right-smallcolumn">
          <h4>${edu.degree}</h4>
          <p>${edu.details}</p>
        </div>
      </div>`;
    educationSection.insertAdjacentHTML("beforeend", educationItem);
  });

  const experienceSection = document.querySelector(".experience");
  data.experience.forEach((job) => {
    const experienceItem = `<div class="experience-item">
        <div class="left-smallcolumn">
          <h6>${job.company}</h6>
          <p class="right-align">${job.location}</p>
          <h5>${job.years}</h5>
        </div>
        <div class="right-smallcolumn">
          <h4>${job.position}</h4>
          <p>${job.details}</p>
        </div>
      </div>`;
    experienceSection.insertAdjacentHTML("beforeend", experienceItem);
  });

  const referencesSection = document.querySelector(".references");
  data.references.forEach((ref) => {
    const referenceItem = `<div class="gap">
        <h4>${ref.name}</h4>
        <h5>${ref.address}</h5>
        <p>Tel: ${ref.phone}</p>
        <p>Email: ${ref.email}</p>
      </div>`;
    referencesSection.insertAdjacentHTML("beforeend", referenceItem);
  });
}

function renderSkillsLanguagesHobbies(data) {
  const skillsContainer = document.getElementById("skills-container");
  data.skills.forEach((skill) => {
    const skillElement = `<div class="skills">
        <span>${skill.name}</span>
        <div class="bar-container">
          <div class="bar" style="width: ${skill.level};"></div>
        </div>
      </div>`;
    skillsContainer.insertAdjacentHTML("beforeend", skillElement);
  });

  const languagesData = [
    { name: "English", proficiency: "95%" },
    { name: "German", proficiency: "60%" },
    { name: "Spanish", proficiency: "45%" },
  ];

  const languagesContainer = document.getElementById("languages-container");

  languagesData.forEach((language) => {
    const figure = document.createElement("figure");
    figure.classList.add("pie-chart", language.name.toLowerCase());

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `${language.proficiency}<br />${language.name}`;

    figure.appendChild(figcaption);
    languagesContainer.appendChild(figure);
  });

  const hobbiesContainer = document.getElementById("hobbies-container");
  data.hobbies.forEach((hobby) => {
    const hobbyElement = `<div class="hobbies">
        <span>${hobby.name}</span>
        <div class="bar-container">
          <div class="bar" style="width: ${hobby.level};"></div>
        </div>
      </div>`;
    hobbiesContainer.insertAdjacentHTML("beforeend", hobbyElement);
  });
}

function applyAnimations() {
  const progressBars = document.querySelectorAll(".bar");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.transition = "width 2s";
      bar.style.width = width;
    }, 300);
  });

  const aboutSection = document.querySelector(".about p");
  const moreText = `<span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>`;
  const button = document.createElement("button");
  button.textContent = "Read more";
  button.classList.add("read-more-btn");
  aboutSection.after(button);

  button.addEventListener("click", () => {
    aboutSection.innerHTML += moreText;
    button.style.display = "none";
  });

  const pieCharts = document.querySelectorAll(".pie-chart");

  pieCharts.forEach((chart, index) => {
    chart.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    chart.style.opacity = "0";

    setTimeout(() => {
      chart.style.opacity = "1";
    }, index * 300);

    chart.addEventListener("mouseenter", () => {
      chart.style.transform = "scale(1.5)";
      chart.style.zIndex = "10";
    });

    chart.addEventListener("mouseleave", () => {
      chart.style.transform = "scale(1)";
      chart.style.zIndex = "1";
    });
  });

  pieCharts.forEach((chart) => {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = "Це кругова діаграма.";
    document.body.appendChild(tooltip);

    chart.addEventListener("mouseenter", (e) => {
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.style.opacity = "1";
    });

    chart.addEventListener("mousemove", (e) => {
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
    });

    chart.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
}
