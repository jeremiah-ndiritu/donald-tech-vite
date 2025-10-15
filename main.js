if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
      .catch((err) =>
        console.log("❌ Service Worker registration failed:", err)
      );
  });
}
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Stop default mini-infobar
  deferredPrompt = e;

  // Show your "App available" UI
  const installBanner = document.getElementById("install-banner");
  installBanner.style.display = "block";
});

// Handle the click on your custom install button
document.getElementById("install-btn").addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt(); // Show native install prompt
  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response: ${outcome}`);
  deferredPrompt = null;

  // Hide your banner after prompt
  document.getElementById("install-banner").style.display = "none";
});
