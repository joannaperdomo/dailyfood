// Fetch food items from the Google Sheets database
function fetchFoodItems() {
    fetch('https://script.google.com/macros/s/AKfycbxxEQ2wq_UkFrVY4x1vIzb3I72FBn5ieUJsfJqwbAdxDTy3LjWkDcb23bIvk-jArp4/exec') // Replace with your Google Apps Script web app URL
      .then(response => response.json())
      .then(items => populateItems(items))
      .catch(err => console.error('Error fetching food items:', err));
  }
  
  // Populate the dropdown with fetched food items
  function populateItems(items) {
    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      nombreSelect.appendChild(option);
    });
    
    // Add "Nuevo" option
    const nuevoOption = document.createElement("option");
    nuevoOption.value = "Nuevo";
    nuevoOption.textContent = "Nuevo";
    nombreSelect.appendChild(nuevoOption);
  }
  
  // Handle form submission
  document.getElementById("foodForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    // Add today's date in dd/mm/yyyy format
    const today = new Date();
    data.fecha = today.toLocaleDateString("es-ES");
  
    // Send the data to the Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbxxEQ2wq_UkFrVY4x1vIzb3I72FBn5ieUJsfJqwbAdxDTy3LjWkDcb23bIvk-jArp4/exec", { // Replace with your Web App URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(response => {
      alert("Datos enviados correctamente.");
      location.reload(); // Optional: Reload form after submission
    })
    .catch(err => alert("Error al enviar: " + err));
  });
  
  window.onload = function () {
    fetchFoodItems();
  };