// content.js - скрипт, який буде автоматично ін'єктуватися на сторінки сайтів
// відповідно до налаштувань у manifest.json

// Повідомляємо про готовність розширення
console.log('Розширення "Авто-оцінювання Добре" завантажено і готове до роботи');

// Можемо додати функцію, яка буде викликатися з popup.js
function selectAllGoodRatings() {
  // Знаходимо всі елементи, які відповідають оцінкам "Добре"
  // Цей селектор потрібно адаптувати під вашу конкретну сторінку
  const goodOptions = document.querySelectorAll('.mdc-radio__inner-circle');
  
  if (goodOptions.length === 0) {
    alert('Не знайдено елементів оцінювання на сторінці');
    return;
  }
  
  // Вибираємо перші 7 елементів або всі, якщо їх менше 7
  const count = Math.min(goodOptions.length, 7);
  
  for (let i = 0; i < count; i++) {
    // Емулюємо клік по радіокнопці
    const radioInput = goodOptions[i].closest('input[type="radio"]');
    if (radioInput) {
      radioInput.click();
    } else {
      // Якщо не можемо знайти input, пробуємо зробити елемент видимим і емулювати клік
      goodOptions[i].classList.remove('web-inspector-hide-shortcut');
      goodOptions[i].click();
    }
  }
  
  alert(`Успішно вибрано ${count} оцінок "Добре"`);
}

// Додаємо слухач повідомлень від popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "selectGood") {
    selectAllGoodRatings();
    sendResponse({status: "completed"});
  }
  return true; // Keep the message channel open for asynchronous response
});