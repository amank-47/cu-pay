document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const upi = document.getElementById("upi").value;

  if (name && amount && upi) {
    document.getElementById("status").innerText = `✅ Payment of ₹${amount} by ${name} to ${upi} processed successfully (demo).`;
    document.getElementById("status").style.color = "green";

    // Here you would send data to backend (PHP/Node.js) to save in DB
    // Example: fetch('/save-payment', { method:'POST', body: JSON.stringify({name, amount, upi}) })
  } else {
    document.getElementById("status").innerText = "❌ Please fill all fields.";
    document.getElementById("status").style.color = "red";
  }
});
