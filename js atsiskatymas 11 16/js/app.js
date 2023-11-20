

// mygtukas rodyti
document.querySelector('button.rodyti').addEventListener('click',(e)=>{

  const ul = document.querySelector('ul');

  for (let i=1; i <= 10; i++){

      const li = document.createElement('li');
      li.className = "col-sm-3 abc";
      const img = document.createElement('img');
      img.src = "galerija/" + i + ".jpg";
      img.ondblclick = (e)=>{
       e.target.src = "galerija/11.jpg";
      }
      li.appendChild(img);
      ul.appendChild(li);
  }
  e.target.style.display = "none";


})

// mygtukas maisyti
document.querySelector('button.maisyti').addEventListener('click',()=>{

  const imgs = document.querySelectorAll('img');

  let i =0;
  let sk = Skaiciai();
  for (let img of imgs){
    img.src = "galerija/" + sk[i] + ".jpg";
    i++;
  }

})

// Random skaiciu funkcija
function Skaiciai() {
  let unikalusSk = [];  

  while (unikalusSk.length < 10) {
      let atsitiktinisSk = Math.floor(Math.random() * 10) + 1;

      if (!unikalusSk.includes(atsitiktinisSk)) {
          unikalusSk.push(atsitiktinisSk);
      }
  }

  return unikalusSk;
}







