// Function to update current time and date
function updateDateTime() {
  const now = new Date()
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }
  const dateOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }

  const currentTimeElement = document.getElementById("current-time")
  const currentDateElement = document.getElementById("current-date")

  if (currentTimeElement) {
    currentTimeElement.textContent = now.toLocaleTimeString("id-ID", timeOptions)
  }
  if (currentDateElement) {
    currentDateElement.textContent = now.toLocaleDateString("id-ID", dateOptions)
  }
}

// Function to handle tab switching
function setupTabSwitching() {
  const tabTriggers = document.querySelectorAll(".nav-tabs .nav-tab")
  const tabContents = document.querySelectorAll(".tab-content")
  const tabIndicator = document.querySelector(".tab-indicator")

  // Set initial indicator position
  const activeTab = document.querySelector(".nav-tabs .nav-tab.active")
  if (activeTab && tabIndicator) {
    const tabWidth = activeTab.offsetWidth
    const tabLeft = activeTab.offsetLeft
    tabIndicator.style.width = `${tabWidth}px`
    tabIndicator.style.transform = `translateX(${tabLeft}px)`
  }

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault()
      const targetTab = trigger.dataset.tab

      tabTriggers.forEach((t) => t.classList.remove("active"))
      trigger.classList.add("active")

      // Move indicator
      if (tabIndicator) {
        const tabWidth = trigger.offsetWidth
        const tabLeft = trigger.offsetLeft
        tabIndicator.style.width = `${tabWidth}px`
        tabIndicator.style.transform = `translateX(${tabLeft}px)`
      }

      tabContents.forEach((content) => {
        if (content.id === `${targetTab}-content`) {
          content.classList.add("active")
        } else {
          content.classList.remove("active")
        }
      })
    })
  })
}

// Function to display Mikrotik status or login form
function handleMikrotikStatus() {
  // These values are typically injected by Mikrotik RouterOS
  const mikrotikStatusInput = document.getElementById("mikrotik-status")
  const mikrotikErrorInput = document.getElementById("mikrotik-error")
  const mikrotikUptimeInput = document.getElementById("mikrotik-uptime")
  const mikrotikBytesInInput = document.getElementById("mikrotik-bytes-in")
  const mikrotikBytesOutInput = document.getElementById("mikrotik-bytes-out")
  const mikrotikLinkLogoutInput = document.getElementById("mikrotik-link-logout")

  const mikrotikStatus = mikrotikStatusInput ? mikrotikStatusInput.value : ""
  const mikrotikError = mikrotikErrorInput ? mikrotikErrorInput.value : ""
  const mikrotikUptime = mikrotikUptimeInput ? mikrotikUptimeInput.value : ""
  const mikrotikBytesIn = mikrotikBytesInInput ? mikrotikBytesInInput.value : ""
  const mikrotikBytesOut = mikrotikBytesOutInput ? mikrotikBytesOutInput.value : ""
  const mikrotikLinkLogout = mikrotikLinkLogoutInput ? mikrotikLinkLogoutInput.value : ""

  const loginSection = document.getElementById("login-section")
  const statusSection = document.getElementById("status-section")
  const errorMessageDiv = document.getElementById("error-message")
  const errorTextSpan = document.getElementById("error-text")

  // Handle error messages
  if (mikrotikError && mikrotikError !== "ok") {
    if (errorTextSpan) errorTextSpan.textContent = mikrotikError
    if (errorMessageDiv) errorMessageDiv.style.display = "flex" // Show error alert
  } else {
    if (errorMessageDiv) errorMessageDiv.style.display = "none" // Hide error alert
  }

  // Show login form or status section based on Mikrotik status
  if (mikrotikStatus === "logged-in") {
    if (loginSection) loginSection.style.display = "none"
    if (statusSection) {
      statusSection.style.display = "block"
      if (document.getElementById("status-uptime"))
        document.getElementById("status-uptime").textContent = mikrotikUptime
      if (document.getElementById("status-bytes-in"))
        document.getElementById("status-bytes-in").textContent = mikrotikBytesIn
      if (document.getElementById("status-bytes-out"))
        document.getElementById("status-bytes-out").textContent = mikrotikBytesOut

      const logoutForm = statusSection.querySelector("form")
      if (logoutForm && mikrotikLinkLogout) logoutForm.action = mikrotikLinkLogout
    }
  } else {
    if (loginSection) loginSection.style.display = "block"
    if (statusSection) statusSection.style.display = "none"
  }
}

// Set password = username (for voucher login)
function setpass() {
  if (document.login && document.login.username && document.login.password) {
    document.login.password.value = document.login.username.value
  }
}

// New function to handle main login button click
function handleLoginSubmit() {
  const usernameInput = document.login.username
  const errorMessageDiv = document.getElementById("error-message")
  const errorTextSpan = document.getElementById("error-text")

  // Clear previous error message
  if (errorMessageDiv) errorMessageDiv.style.display = "none"
  if (errorTextSpan) errorTextSpan.textContent = ""

  // Validate username input
  if (!usernameInput || usernameInput.value.trim() === "") {
    if (errorTextSpan) errorTextSpan.textContent = "Kode voucher tidak boleh kosong."
    if (errorMessageDiv) errorMessageDiv.style.display = "flex" // Show error alert
    console.log("Validation failed: Username is empty.") // ADD THIS LINE
    return false // Prevent form submission
  }

  setpass() // Memastikan bidang password terisi dari username

  // Ini akan langsung mengirimkan formulir ke Mikrotik.
  // Mikrotik akan menangani pengalihan ke alogin.html atau error.html.
  if (typeof window.doLogin === "function") {
    console.log("Attempting CHAP login via doLogin().") // ADD THIS LINE
    window.doLogin() // Ini akan mengirimkan formulir 'sendin' untuk otentikasi CHAP
  } else {
    console.log("Attempting direct form submission.") // ADD THIS LINE
    document.login.submit() // Jika CHAP tidak diaktifkan, kirimkan formulir 'login' secara langsung
  }

  return false // Mencegah pengiriman formulir default jika fungsi ini dipanggil oleh onclick pada type="button"
}

// Functions for QR Code Modal
function showQrModal() {
  const qrModal = document.getElementById("qr-modal")
  if (qrModal) {
    qrModal.style.display = "flex"
  }
}

function hideQrModal() {
  const qrModal = document.getElementById("qr-modal")
  if (qrModal) {
    qrModal.style.display = "none"
  }
}

// Function to set footer attribution and current year
function setFooterContent() {
  const attributionTextElement = document.getElementById("attribution-text")
  const currentYearElement = document.getElementById("current-year")

  if (attributionTextElement) {
    // Updated to only show AFR-Cloud.NET attribution
    attributionTextElement.innerHTML =
      'Project by: <a href="https://t.me/afrcloud" target="_blank" class="editor-link">AFR-Cloud.NET</a>'
  }

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
}

// Function to hide the loading overlay
function hideLoadingOverlay() {
  const loadingOverlay = document.getElementById("loading-overlay")
  if (loadingOverlay) {
    loadingOverlay.style.opacity = "0"
    setTimeout(() => {
      loadingOverlay.style.display = "none"
    }, 500) // Match the fade-out duration
  }
}

// Run functions when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  updateDateTime()
  setInterval(updateDateTime, 1000) // Update every second

  setupTabSwitching()
  handleMikrotikStatus() // Check and display Mikrotik status on load
  setFooterContent() // Set footer content

  // Attach setpass to username input change
  if (document.login && document.login.username) {
    document.login.username.addEventListener("input", setpass)
    // Removed toggleLoginButtonState as validation is now in handleLoginSubmit
  }
})

// Hide the loading overlay once the entire page (including all resources) is loaded
window.onload = () => {
  hideLoadingOverlay()
}
