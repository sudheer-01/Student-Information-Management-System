function switchTab(role) {
   entiredata = document.querySelectorAll(".allDetails");
   entiredata.forEach((element) => {
    element.style.display = "none";
   });
   selectedData = document.querySelector(`.${role}`);
   selectedData.style.display = "block";
   heading = document.getElementsByTagName("h1");
   heading[0].style.display="none";
}
