document.addEventListener("DOMContentLoaded", async () => {
  const dropdown = document.getElementById("nombre");
  const nuevoFields = document.getElementById("nuevo-alimento");

  const API_URL = "https://script.google.com/macros/s/AKfycbxqixHjWFh1k5Uqp9geVHh4rYwAQJq6yOpP8YwtJFCUDQ_tqdBa7061KEFgBN1UAXft/exec"; // Replace with your actual Web App URL

    try {
      const response = await fetch(API_URL);
      const items = await response.json();
  
      // Clear current options
      dropdown.innerHTML = "";
  
      // Add "Nuevo" option first
      const nuevoOption = document.createElement("option");
      nuevoOption.value = "Nuevo";
      nuevoOption.textContent = "Nuevo";
      dropdown.appendChild(nuevoOption);
  
      // Add the rest of the items
      items.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        dropdown.appendChild(option);
      });
  
    } catch (error) {
      console.error("Error fetching data from sheet:", error);
      dropdown.innerHTML = '<option value="">Error cargando datos</option>';
    }
  
    // Show/hide extra fields based on selection
    dropdown.addEventListener("change", () => {
      if (dropdown.value === "Nuevo") {
        nuevoFields.style.display = "block";
      } else {
        nuevoFields.style.display = "none";
      }
    });
  });
  