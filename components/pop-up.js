function renderPopUP() {
  return `
     <div id='pop-up' class="pop-up-container">
      <div class="pop-up-wrapper">
        <div class="pop-up">
          <div class="icon-wrapper">
            <div class="icon"><img src="./assests/icons/exclamation.png" alt="" /></div>
          </div>

          <div class="message">message example</div>

          <div class="pop-up-btn">
            <button class="popBtn" onclick="closeBtn()">ok</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

document.getElementById("pop-up-render").innerHTML = renderPopUP();

function showPopUP(message) {
  const popUp = document.getElementById("pop-up");
  const msg = document.querySelector(".message");

  msg.textContent = message;
  popUp.style.display = "flex";
}

function closePopUp(){
    const popUp = document.getElementById("pop-up"); 
    popUp.style.display = "none";
}

function closeBtn(){
    const btn = document.querySelector('.popBtn');

    btn.addEventListener("click", closePopUp);
}