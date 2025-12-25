
function formatPhoneNumber(rawNumber) {
    let formatted = rawNumber.replace(/^62/, '0'); 
    if (formatted.length >= 10) { 
        return `${formatted.substring(0, 4)}-${formatted.substring(4, 8)}-${formatted.substring(8)}`;
    }
    return formatted;
}


document.addEventListener('DOMContentLoaded', function() {
    // Pengecekan dasar
    if (typeof config === 'undefined' || !config.contactNumber) {
        console.error("Variabel konfigurasi atau nomor kontak tidak ditemukan.");
        return;
    }
    
    const titleElement = document.getElementById('appTitle');
    if (titleElement) {
        titleElement.textContent = config.appName;
    }
    
    const numberDisplay = document.getElementById('contactNumberDisplay');
    if (numberDisplay) {
        const formattedNumber = formatPhoneNumber(config.contactNumber); 
        
     numberDisplay.innerHTML = `${formattedNumber}`;
}
    
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    const whatsappUrl = `https://wa.me/${config.contactNumber}`; 

    whatsappLinks.forEach(link => {
        link.href = whatsappUrl;
    });
});