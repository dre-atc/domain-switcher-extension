console.log("Popup script loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const domainInput = document.getElementById('domain-input');
  const saveButton = document.getElementById('save-domain');
  const savedDomainsList = document.getElementById('saved-domains-list');
  
  let savedDomains = [];
  
  // Load saved domains from Chrome storage
  try {
    const result = await chrome.storage.sync.get('savedDomains');
    savedDomains = result.savedDomains || [];
    renderSavedDomains();
  } catch (error) {
    console.error('Error loading saved domains:', error);
  }
  
  // Focus input when popup opens
  domainInput.focus();
  
  // Function to switch to a new domain
  async function switchDomain(newDomain) {
    if (!newDomain) {
      alert('Please enter a valid domain');
      return;
    }
    
    try {
      // Get the current active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Parse the current URL
      const currentUrl = new URL(activeTab.url);
      
      // Create the new URL with the same protocol, path, search params, etc.
      const newUrl = new URL(currentUrl);
      
      // Replace the hostname with the new domain
      // Remove 'http://' or 'https://' if the user included it
      const cleanDomain = newDomain.replace(/^(https?:\/\/)/, '');
      newUrl.hostname = cleanDomain;
      
      // Navigate to the new URL
      await chrome.tabs.update(activeTab.id, { url: newUrl.toString() });
      
      // Close the popup
      window.close();
    } catch (error) {
      console.error('Error switching domain:', error);
      alert('Error switching domain. Please check the console for details.');
    }
  }
  
  // Function to save current domain
  async function saveCurrentDomain() {
    try {
      const newDomain = domainInput.value.trim();
      
      // Save the current input value if available
      if (newDomain) {
        const cleanDomain = newDomain.replace(/^(https?:\/\/)/, '');
        
        // Check if domain already exists
        if (!savedDomains.includes(cleanDomain)) {
          savedDomains.push(cleanDomain);
          await chrome.storage.sync.set({ savedDomains });
          renderSavedDomains();
        }
      } else {
        // If no domain in input field, try to save current tab's domain
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const tabUrl = new URL(activeTab.url);
        const tabDomain = tabUrl.hostname;
        
        // Check if domain already exists
        if (!savedDomains.includes(tabDomain)) {
          savedDomains.push(tabDomain);
          await chrome.storage.sync.set({ savedDomains });
          renderSavedDomains();
        }
      }
    } catch (error) {
      console.error('Error saving domain:', error);
      alert('Error saving domain. Please check the console for details.');
    }
  }
  
  // Function to remove a saved domain
  async function removeDomain(domain) {
    try {
      savedDomains = savedDomains.filter(d => d !== domain);
      await chrome.storage.sync.set({ savedDomains });
      renderSavedDomains();
    } catch (error) {
      console.error('Error removing domain:', error);
    }
  }
  
  // Function to render saved domains in the list
  function renderSavedDomains() {
    savedDomainsList.innerHTML = '';
    
    if (savedDomains.length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.textContent = 'No saved domains yet';
      emptyItem.style.fontStyle = 'italic';
      emptyItem.style.color = '#666';
      emptyItem.style.cursor = 'default';
      savedDomainsList.appendChild(emptyItem);
      return;
    }
    
    savedDomains.forEach(domain => {
      const li = document.createElement('li');
      
      const domainSpan = document.createElement('span');
      domainSpan.textContent = domain;
      domainSpan.classList.add('domain-item');
      domainSpan.addEventListener('click', () => switchDomain(domain));
      
      const removeButton = document.createElement('span');
      removeButton.textContent = '✕';
      removeButton.classList.add('remove-domain');
      removeButton.title = 'Remove from saved domains';
      removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        removeDomain(domain);
      });
      
      li.appendChild(domainSpan);
      li.appendChild(removeButton);
      savedDomainsList.appendChild(li);
    });
  }
  
  // Handle the enter key press
  domainInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      const newDomain = domainInput.value.trim();
      switchDomain(newDomain);
    }
  });
  
  // Handle save button click
  saveButton.addEventListener('click', saveCurrentDomain);
});