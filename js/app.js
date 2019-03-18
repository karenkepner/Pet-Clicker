/**** View *****/
let model = {
  pets: [
    {
      name:   'Amigo',
      photo:  'amigo.jpg',
      clicks: 0,
      altTxt: 'Amigo the chocolate lab dog',
      imgURL: 'images/amigo.jpg'
    },
    {
      name:   'Bindy',
      photo:  'bindy.jpg',
      clicks: 0,
      altTxt: 'Bindy the australian shepard dog',
      imgURL: 'images/bindy.jpg'  
    },
    {
      name:   'Category3',
      photo:  'category3.jpg',
      clicks: 0,
      altTxt: 'three kittens sleeping in position that looks like the hurricane icon',
      imgURL: 'images/category3.jpg'
    },
    {
      name:   'Earl',
      photo:  'earl.jpg',
      clicks: 0,
      altTxt: 'earl the giant german shepard with his tennis ball',
      imgURL: 'images/earl.jpg'
    },
    {
      name:   'Hoyt',
      photo:  'hoyt.jpg',
      clicks: 0,
      altTxt: 'hoyt the border collie',
      imgURL: 'images/hoyt.jpg'
    },
    {
      name:   'Maya',
      photo:  'maya.jpg',
      clicks: 0,
      altTxt: 'maya the golden retriever',
      imgURL: 'images/maya.jpg'
    },
    {
      name:   'Ollie',
      photo:  'ollie.jpg',
      clicks: 0,
      altTxt: 'ollie the striped cat',
      imgURL: 'images/ollie.jpg'
    },
    {
      name:   'Remi',
      photo:  'remi.jpg',
      clicks: 0,
      altTxt: 'remi the border collie',
      imgURL: 'images/remi.jpg'
    }
  ]
};

/**** Octopus *****/
let controller = {

  init: function() {
    model.currentPet = model.pets[0];
    viewPetList.init();
    viewSinglePet.init(model.currentPet.name);
    admin.show();
    // admin.cancel();
  },

  getPets: function() {
    return model.pets;
  },

  updateClicks: function(name) {
    let pets = controller.getPets();
    let petIndex = pets.findIndex(obj => obj.name === name);
    model.pets[petIndex].clicks++;
    viewSinglePet.render(name);
  },

  updateAdmin: function(index, newName, photo, newClicks) {
    // debugger;
    model.pets[index].name = newName;
    model.pets[index].imgURL = photo;
    model.pets[index].clicks = newClicks;
    viewSinglePet.render(newName);
  }
};

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
        viewSinglePet.init(petName);
      })
    }
  }
};

let viewSinglePet = {

  init: function(name) {
    let putPetHere = document.querySelector('#petSpace');
    let pets = controller.getPets();
    let petIndex = pets.findIndex(obj => obj.name === name);
    let count = model.pets[petIndex].clicks;
    let imgURL = model.pets[petIndex].imgURL;
    let altText = model.pets[petIndex].altTxt;
    count = parseInt(count);
    let yard = document.createElement('article');
    yard.className = 'clickBox';
    yard.innerHTML = `<div class="title">
                          <h2 class="name">${name}</h2>
                          <h2>Clicks: <span id="${name}Count">${count}</span></h2>
                      </div>
                      <img class="space" src="${imgURL}" alt="${altText}" />`;
    putPetHere.replaceChild(yard, putPetHere.firstChild );
    viewSinglePet.upvote();
  },

  upvote: function() {
    let pet = document.querySelector('.clickBox');
    pet.addEventListener('click', function() {
      //find index of current pet
      let name = document.querySelector('.name');
      //use index to increment the click count by one. ++
      controller.updateClicks(name.textContent);
    })
  },

  render: function(name) {
    //update the count from the model.
    let pets = controller.getPets();
    let petIndex = pets.findIndex(obj => obj.name === name);
    let upvoteCount = document.querySelector(`#${name}count`);
    upvoteCount.textContent = pets[petIndex].clicks;
  }
};

let admin = {

  show: function() {
    let adButton = document.getElementById('adminButton');
    adButton.addEventListener('click', function() {
      document.querySelector('#adminForm').style.display = 'block';
    });
  },

  cancel: function() {
    let cancelBTN = document.getElementById('cancel');
    console.log('cancel button: ', cancelBTN);
    //this works, but hitting save btn does the same thing. weird. o.
    cancelBTN.addEventListener('click', function() {
      console.log('cancel btn click')
      document.querySelector('#adminForm').style.display = 'none';
    })
  },

  save: function() {
    //on save push new vaues thru controller to update the model.
    let saveBtn = document.querySelector('#save');
    console.log('save button loaded')
    saveBtn.addEventListener('click', function() {
      //collect values from inputs
      // debugger;
      let originalName = document.querySelector('.title .name').value;
      let pets = controller.getPets();
      let petIndex = pets.findIndex(obj => obj.name === originalName);
      let newName = document.querySelector('#petName').value;
      let newClicks = document.querySelector('#clicksUpdate').value;
      let newImageURL = document.querySelector('#imageURL').value;
      console.log('inputs: ', petIndex);
      //send values to controller to update the model.
      controller.updateAdmin(petIndex, newName, newClicks, newImageURL);
    })
  }
  
}

controller.init();
admin.cancel();
admin.save();
