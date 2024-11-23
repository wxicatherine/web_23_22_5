document.addEventListener("DOMContentLoaded", () => {
    // Анімація прогрес-барів
    const progressBars = document.querySelectorAll(".bar");
    progressBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.transition = "width 5s";
        bar.style.width = width;
      }, 300);
    });
  
    // Розширення тексту "Про себе"
    const aboutSection = document.querySelector(".about p");
    const moreText = `
          <span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>`;
    const button = document.createElement("button");
    button.textContent = "Read more";
    button.classList.add("read-more-btn");
    aboutSection.after(button);
  
    button.addEventListener("click", () => {
      aboutSection.innerHTML += moreText;
      button.style.display = "none";
    });
  
    // Приближення кругових діаграм
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
  
    // Підпис до діаграм
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
  });
  