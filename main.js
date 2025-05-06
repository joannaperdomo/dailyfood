document.addEventListener("DOMContentLoaded", async () => {
  const dropdown = document.getElementById("nombre");
  const nuevoFields = document.getElementById("nuevo-alimento");

  // Use CORS proxy for the API URL
  const API_URL = "https://corsproxy.io/?url=" + encodeURIComponent("https://script.google.com/macros/s/AKfycbyzDCn_iIw3jwCpK1s5gUZ2vhSmEMuNAhOiWDVAvDWdebkqh6eRdoVanrO0fGfBpzI5/exec");

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

// CODIGO PARA LOGEAR AL SHEETS

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("food-form");
  const dropdown = document.getElementById("nombre");
  const comidaSelect = document.getElementById("comida");
  const porcionInput = document.getElementById("porcion");

  // Use CORS proxy for the API URL
  const API_URL = "https://corsproxy.io/?url=" + encodeURIComponent("https://script.google.com/macros/s/AKfycbyzDCn_iIw3jwCpK1s5gUZ2vhSmEMuNAhOiWDVAvDWdebkqh6eRdoVanrO0fGfBpzI5/exec");

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Collect form data
    const comida = comidaSelect.value;
    const nombre = dropdown.value;
    const porcion = parseFloat(porcionInput.value);
    const fecha = new Date().toLocaleDateString("en-GB"); // Format: day/month/year

    // Prepare the data to be sent to the Google Sheets log-test sheet
    const formData = {
      comida,
      nombre,
      porcion,
      fecha,
    };

    // Send the data to the Google Apps Script Web App using POST
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the collected form data as JSON
      });

      const result = await response.json(); // Assuming the response is JSON
      if (result.success) {
        alert("Datos enviados con éxito");
        form.reset(); // Reset the form after successful submission
      } else {
        alert("Hubo un error al enviar los datos.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al intentar enviar los datos.");
    }
  });
});
