document.getElementById('fillButton').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: selectRadioOptions
  });
});

document.getElementById('submitButton').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: clickSubmitButton
  });
});

function selectRadioOptions() {
  const targetLabels = ["Добре", "Нема коментарів"];
  const labels = document.querySelectorAll('label');

  labels.forEach(label => {
    const text = label.textContent.trim();
    if (targetLabels.includes(text)) {
      const inputId = label.getAttribute('for');
      const input = document.getElementById(inputId);

      if (input && input.type === 'radio') {
        input.click();
      }
    }
  });
}

function clickSubmitButton() {
  const buttons = document.querySelectorAll('button');
  for (let button of buttons) {
    if (button.textContent.trim() === "Створити") {
      button.click();
      break;
    }
  }
}

