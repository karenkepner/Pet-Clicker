/**** View *****/
let model = {
  currentPet: null,
  pets: [
    {
      name:   'Amigo',
      photo:  'amigo.jpg',
      clicks: 0,
      altTxt: 'Amigo the chocolate lab dog'
    },
    {
      name:   'Bindy',
      photo:  'bindy.jpg',
      clicks: 0,
      altTxt: 'Bindy the australian shepard dog'   
    },
    {
      name:   'Category3',
      photo:  'category3.jpg',
      clicks: 0,
      altTxt: 'three kittens sleeping in position that looks like the hurricane icon'
    },
    {
      name:   'Earl',
      photo:  'earl.jpg',
      clicks: 0,
      altTxt: 'earl the giant german shepard with his ball that you can not see'
    },
    {
      name:   'Hoyt',
      photo:  'hoyt.jpg',
      clicks: 0,
      altTxt: 'hoyt the border collie'
    },
    {
      name:   'Maya',
      photo:  'maya.jpg',
      clicks: 0,
      altTxt: 'maya the golden retriever'
    },
    {
      name:   'Ollie',
      photo:  'ollie.jpg',
      clicks: 0,
      altTxt: 'ollie the striped cat'
    },
    {
      name:   'Remi',
      photo:  'remi.jpg',
      clicks: 0,
      altTxt: 'remi the border collie'
    }
  ]
}


/**** Octopus *****/
let controller = {

  init: function() {
    model.currentPet = model.pets[0];

    viewPetList.init();
    viewSinglePet.init(model.currentPet.name);
  },

  getPets: function() {
    return model.pets;
  },

  updateClicks: function(name, clicks) {
    return 'pie';
  }



}




/**** View *****/
let viewPetList = {

  init: function() {
    let pets = controller.getPets();
    let list = document.querySelector('#list');
    for(let i = 0; i < pets.length; i++) {
      list.insertAdjacentHTML('afterbegin', `<button class="pet" data-name="${pets[i].name}">${pets[i].name}</button>`);
    }
    viewPetList.buttonClick();
  },

  buttonClick: function() {
    let petButtons = document.querySelectorAll('.pet');
    let petButtonsArray = Array.from(petButtons);
    for(let i = 0; i < petButtonsArray.length; i++) {
      petButtonsArray[i].addEventListener('click', function(event) {
        let et = event.target;
        let petName = et.dataset.name;
        //set currentPet to the clicked button pet.

        console.log('et button click petName: ', petName)
        //then take that target (the clicked item) and use it to build the clickable pet.
        console.log('current pet name: ', model.currentPet.name)
        viewSinglePet.init(petName);
      })
    }
  }


}

let viewSinglePet = {
  init: function(name) {
    let putPetHere = document.querySelector('#petSpace');
    let petIndex = model.pets.findIndex(obj => obj.name === name);
    console.log('petIndex: ', petIndex)
    let count = model.pets[petIndex].clicks;
    count = parseInt(count);
    let yard = document.createElement('article');
    
    yard.className = 'clickBox';
    yard.innerHTML = `<div class="title">
                          <h2>${name}</h2>
                          <h2>Clicks: <span id="${name}Count">${count}</span></h2>
                      </div>
                      <img class="space" src="images/${name}.jpg" alt="picture of ${name}" />`;
    putPetHere.replaceChild(yard, putPetHere.firstChild );
  }
}

controller.init();