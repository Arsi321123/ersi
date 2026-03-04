// ===== Pizza Ersi JS (simple, school-friendly) =====

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Open/closed badge (11:00–23:00)
(function setOpenClosedBadge() {
  const badge = document.getElementById("statusBadge");
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Open between 11:00 and 23:00 (23:00 not included)
  const open = (hour > 11 && hour < 23) || (hour === 11 && minute >= 0);

  if (open) {
    badge.textContent = "🟢 Jemi Hapur Tani";
    badge.style.background = "#eaffea";
    badge.style.color = "#0a7a0a";
    badge.style.border = "1px solid #b6f2b6";
  } else {
    badge.textContent = "🔴 Jemi Mbyllur (Hapemi 11:00)";
    badge.style.background = "#ffeaea";
    badge.style.color = "#b10000";
    badge.style.border = "1px solid #ffb7b7";
  }
})();

// Order calculator
const pizzaSelect = document.getElementById("pizzaSelect");
const qtyInput = document.getElementById("qtyInput");
const totalBox = document.getElementById("totalBox");
const smallInfo = document.getElementById("smallInfo");
const receipt = document.getElementById("receipt");
const receiptText = document.getElementById("receiptText");

function getSelectedPizzaPrice() {
  const opt = pizzaSelect.options[pizzaSelect.selectedIndex];
  return Number(opt.dataset.price || 0);
}

function getDeliveryFee() {
  const selected = document.querySelector('input[name="delivery"]:checked');
  return selected && selected.value === "yes" ? 150 : 0;
}

function formatLek(n) {
  return `${n.toLocaleString("sq-AL")} Lek`;
}

function calculateTotal() {
  const price = getSelectedPizzaPrice();
  let qty = Number(qtyInput.value);

  if (!Number.isFinite(qty) || qty < 1) qty = 1;
  qtyInput.value = String(qty);

  const deliveryFee = getDeliveryFee();
  const subtotal = price * qty;
  const total = subtotal + deliveryFee;

  totalBox.textContent = formatLek(total);

  const pizzaName = pizzaSelect.value;
  smallInfo.textContent = `Porosia: ${qty}x ${pizzaName} • Nëntotali: ${formatLek(subtotal)} • Delivery: ${formatLek(deliveryFee)}`;

  return { pizzaName, qty, subtotal, deliveryFee, total };
}

document.getElementById("calcBtn").addEventListener("click", () => {
  receipt.style.display = "none";
  calculateTotal();
});

document.getElementById("orderBtn").addEventListener("click", () => {
  const result = calculateTotal();

  const orderId = Math.floor(100000 + Math.random() * 900000);
  const time = new Date().toLocaleTimeString("sq-AL", { hour: "2-digit", minute: "2-digit" });

  receiptText.innerHTML = `
    <div><b>ID Porosie:</b> #${orderId}</div>
    <div><b>Ora:</b> ${time}</div>
    <div><b>Detaje:</b> ${result.qty}x ${result.pizzaName}</div>
    <div><b>Totali:</b> ${formatLek(result.total)}</div>
  `;

  receipt.style.display = "block";
  receipt.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Contact demo (local only)
document.getElementById("sendBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const msg = document.getElementById("msgInput").value.trim();
  const status = document.getElementById("sendStatus");

  if (!name || !msg) {
    status.textContent = "Ju lutem plotësoni emrin dhe mesazhin.";
    status.style.color = "#ffd6d6";
    return;
  }

  // Store in browser (demo)
  const messages = JSON.parse(localStorage.getItem("pizzaErsiMessages") || "[]");
  messages.push({ name, msg, date: new Date().toISOString() });
  localStorage.setItem("pizzaErsiMessages", JSON.stringify(messages));

  status.textContent = "✅ U dërgua! (ruhet vetëm në këtë browser, si demo)";
  status.style.color = "#d6ffdf";

  document.getElementById("nameInput").value = "";
  document.getElementById("msgInput").value = "";
});
