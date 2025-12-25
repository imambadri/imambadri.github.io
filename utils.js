// utils.js
function getURLParam(name) {
  var params = new URLSearchParams(window.location.search)
  return params.get(name)
}

function performRedirect(linkRedirectFromMikrotik) {
  console.log("performRedirect() called.")
  var dst = getURLParam("dst")
  var finalTargetUrl = ""

  console.log("Current dst parameter:", dst)
  console.log("Current linkRedirectFromMikrotik (from Mikrotik):", linkRedirectFromMikrotik)

  // Prioritize 'dst' parameter if it's a valid, non-Mikrotik login URL
  if (dst && dst !== "http://redir.mikrotik.com/login" && dst !== "http://redir.mikrotik.com/status") {
    finalTargetUrl = dst
    console.log("Using dst as finalTargetUrl:", finalTargetUrl)
  } else if (
    linkRedirectFromMikrotik &&
    linkRedirectFromMikrotik !== "http://redir.mikrotik.com/login" &&
    linkRedirectFromMikrotik !== "http://redir.mikrotik.com/status"
  ) {
    // Then use Mikrotik's $(link-redirect) if it's valid
    finalTargetUrl = linkRedirectFromMikrotik
    console.log("Using Mikrotik linkRedirectFromMikrotik as finalTargetUrl:", finalTargetUrl)
  } else {
    // Fallback to status.html if no valid redirect URL is found
    console.warn("No valid redirect URL found. Falling back to status.html.")
    finalTargetUrl = "status.html"
  }

  console.log("Attempting to redirect to:", finalTargetUrl)
  window.location.href = finalTargetUrl
  return false
}
