var originalData = {};
var moveTo = {}; // Store new size and position
var totalHappiness = 0;


function buttonClick(containerToShow, containerToHide) {
  const spriteContainerToShow = document.querySelector(containerToShow);
  const spriteContainerToHide = document.querySelector(containerToHide);
  const sprite = document.getElementById(lastSelectedId); // Assuming lastSelectedId is defined elsewhere

  // Hide the containerToHide
  spriteContainerToHide.style.display = 'none';

  // Show the containerToShow
  spriteContainerToShow.style.display = 'block';

  // Move the sprite container to the new containerToShow
  spriteContainerToShow.appendChild(sprite);

  if (containerToHide === '.image-container:nth-of-type(2)') {
    // Store new size and position
    moveTo = spriteContainerToShow.getAttribute('spriteposition');
    var attributes = spriteContainerToShow.attributes;
    console.log(attributes[2])
    for (var i = 0; i < attributes.length; i++) {
        var attributeName = attributes[i].name;
        var attributeValue = attributes[i].value;
        console.log(attributeName + ': ' + attributeValue);
    }
    originalData = {
      bottom: sprite.style.bottom,
      right: sprite.style.right,
      transform: sprite.style.transform,
    };
    
    // Override position and size
    sprite.style.bottom = moveTo.bottom;
    sprite.style.right = moveTo.right;
    sprite.transform = moveTo.transform;
  } else {
    // Restore original position and size
    sprite.style.bottom = originalData.bottom;
    sprite.style.right = originalData.right;
    sprite.style.transform = originalData.transform;
  }
}

class Sprite {
  isDead = false;
  constructor(id) {
    this.id = id;
    if (this.id === 'Sprite1') {
      this.age = 15;
      this.education = 4;
    } else if (this.id == 'Sprite2') {
      this.age = 13;
      this.education = 3;
    } else if (this.id == 'Sprite3') {
      this.age = 37;
      this.education = 5;
    } else if (this.id == 'Sprite4') {
      this.age = 36;
      this.education = 5;
    } else if (this.id == 'Sprite5') {
      this.age = 10;
      this.education = 2;
    } else if (this.id == 'Sprite6') {
      this.age = 6;
      this.education = 1;
    }

    this.health = 10;
    this.happiness = 8;
    
  }

}

let yearsPassed = 0;
document.getElementById('years-passed').innerHTML = 'Years Passed: ' + yearsPassed;

let money = 100; 
document.getElementById('money-display').innerHTML = `Money: $${money}`;

let sprites = {
    Sprite1: new Sprite('Sprite1'),
    Sprite2: new Sprite('Sprite2'),
    Sprite3: new Sprite('Sprite3'),
    Sprite4: new Sprite('Sprite4'),
    Sprite5: new Sprite('Sprite5'),
    Sprite6: new Sprite('Sprite6')
};

let livingCosts = 270;

document.addEventListener("DOMContentLoaded", function() {  // this is the market place
    // Get all clickable objects
    const objects = document.querySelectorAll('.clickable');

    // Define an array to store information about objects
    let objectInfo = [];
    let objectCost = [];

    // Populate objectInfo array with information about each object
    objects.forEach(object => {
        const info = object.getAttribute('data-info');
        const cost = object.getAttribute('data-cost');
        objectInfo.push(info);
        objectCost.push(cost);
    });

    // Add mouseover event listener to each object
    objects.forEach((object, index) => {
        object.addEventListener('mouseover', function() {
            // Display information about the hovered object
            const info = objectInfo[index];
            displayInfo(info);
        });

        // Add mouseout event listener to hide the displayed information
        object.addEventListener('mouseout', function() {
            hideInfo();
        });

        // Add click event listener to delete the object when clicked
      object.addEventListener('click', function() {
          const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(5)');
          const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

          // Check if the container has any child elements with the class "sprites"
          const spriteElement = spriteContainerToHide.querySelector('.Sprite');

          if (spriteElement) {
              console.log('The container has a sprite.');

              // Access the id of the sprite element
              const sprite = spriteElement.id;
              console.log(sprite);

              // Access the age and education properties of the sprite instance
              console.log('Sprite Age:', sprites[sprite].age);
              console.log('Sprite Education:', sprites[sprite].education);
              console.log('Sprite health:', sprites[sprite].health);
              console.log('Sprite happiness:', sprites[sprite].happiness);

              var healthChangeValue = parseInt(object.getAttribute('healthchange'));
              var educationChangeValue = parseInt(object.getAttribute('educationchange'));
              var happinessChangeValue = parseInt(object.getAttribute('happinesschange'));
              console.log(healthChangeValue);
              sprites[sprite].health += healthChangeValue;
              sprites[sprite].happiness += happinessChangeValue;
              sprites[sprite].education += educationChangeValue;
            
              if (sprites[sprite].health < 5){
                sprites[sprite].happiness--;
              }
              if (sprites[sprite].health < 1){
                money = -3;
                moneyGone();
              }
              if (sprites[sprite].health > 8){
                sprites[sprite].happiness++;
              }

              // Remove the clicked object from the DOM
              object.style.display = "none";
              const spriteToRemove = document.getElementById(lastSelectedId);
              spriteToRemove.style.bottom = originalData.bottom;
              spriteToRemove.style.right = originalData.right;
              spriteToRemove.style.transform = originalData.transform;
              spriteToRemove.style.display = "none";

              money -= parseInt(objectCost[index]);

              moneyGone();
              document.getElementById('money-display').innerHTML = `Money: $${money}`;
              // Remove any existing tooltips
              hideInfo();
          } else {
              console.log('The container does not have a sprite.');
          }
      });
    });

    // Function to display information
    function displayInfo(info) {
        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = info;

        // Position the tooltip below the mouse pointer
        tooltip.style.top = (event.clientY + 10) + 'px';
        tooltip.style.left = (event.clientX + 10) + 'px';

        // Append the tooltip to the body
        document.body.appendChild(tooltip);
    }

    // Function to hide information
    function hideInfo() {
        // Remove any existing tooltips
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
});




document.addEventListener("DOMContentLoaded", function() { // for the job place
    // Get all clickable objects
    const objects = document.querySelectorAll('.clickable-2');

    // Define an array to store information about objects
    let objectInfo = [];
    let objectCost = [];

    // Populate objectInfo array with information about each object
    objects.forEach(object => {
        const info = object.getAttribute('data-info');
        const cost = object.getAttribute('data-cost');
        objectInfo.push(info);
        objectCost.push(cost);
    });

    // Add mouseover event listener to each object
    objects.forEach((object, index) => {
        object.addEventListener('mouseover', function() {
            // Display information about the hovered object
            const info = objectInfo[index];
            displayInfo(info);
        });

        // Add mouseout event listener to hide the displayed information
        object.addEventListener('mouseout', function() {
            hideInfo();
        });

        // Add click event listener to delete the object when clicked
      object.addEventListener('click', function() {
          const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(9)');
          const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

          // Check if the container has any child elements with the class "sprites"
          const spriteElement = spriteContainerToHide.querySelector('.Sprite');

          if (spriteElement) {
              console.log('The container has a sprite.');

              // Access the id of the sprite element
              const sprite = spriteElement.id;
              console.log(sprite);

              // Access the age and education properties of the sprite instance
              console.log('Sprite Age:', sprites[sprite].age);
              console.log('Sprite Education:', sprites[sprite].education);
              console.log('Sprite health:', sprites[sprite].health);
              console.log('Sprite happiness:', sprites[sprite].happiness);
              if (sprites[sprite].education > parseInt(object.getAttribute('educationrequirement'))){
                // Move the sprite element to another container
                spriteContainerToShow.appendChild(spriteElement);
                sprites[sprite].health--;
                if (sprites[sprite].health < 5){
                  sprites[sprite].happiness--;
                }
                if (sprites[sprite].health < 1){
                  money = -3;
                  moneyGone();
                }
                if (sprites[sprite].health > 8){
                  sprites[sprite].happiness++;
                }

                // Remove the clicked object from the DOM
                object.style.display = "none";
                const spriteToRemove = document.getElementById(lastSelectedId);
                spriteToRemove.style.bottom = originalData.bottom;
                spriteToRemove.style.right = originalData.right;
                spriteToRemove.style.transform = originalData.transform;
                spriteToRemove.style.display = "none";

                money += parseInt(objectCost[index]);
                document.getElementById('money-display').innerHTML = `Money: $${money}`;
                // Remove any existing tooltips
                hideInfo();
              }

              
          } else {
              console.log('The container does not have a sprite.');
          }
      });

    });

    // Function to display information
    function displayInfo(info) {
        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = info;

        // Position the tooltip below the mouse pointer
        tooltip.style.top = (event.clientY + 10) + 'px';
        tooltip.style.left = (event.clientX + 10) + 'px';

        // Append the tooltip to the body
        document.body.appendChild(tooltip);
    }

    // Function to hide information
    function hideInfo() {
        // Remove any existing tooltips
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
});
function yearClick() {
  yearsPassed++;
  if (yearsPassed == 12){
    money = -2;
  }
  money -= livingCosts;

  moneyGone();
  
  document.getElementById('money-display').innerHTML = `Money: $${money}`;
  
  document.getElementById('years-passed').innerHTML = 'Years Passed: ' + yearsPassed;

  // Select all sprites and make their style.display = 'block'
  const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');
  const spritess = spriteContainerToShow.querySelectorAll('.Sprite');

  spritess.forEach(sprite => {
    const sprit = sprite.id;
    console.log(sprit);

    // Access the age and education properties of the sprite instance
    console.log('Sprite health:', sprites[sprit].health);
    console.log('Sprite age:', sprites[sprit].age);
    sprite.style.display = 'block';
    sprites[sprit].age++;
  });
  const objects = document.querySelectorAll('.clickable-2');
  objects.forEach(object => {
      object.style.display = "block";
  });
  const objects2 = document.querySelectorAll('.clickable');
  objects2.forEach(object => {
      object.style.display = "block";
  });
}


document.getElementById('restartButton').addEventListener('click', function() {
  location.reload();
});

function moneyGone() {
  if (money < 0) {
    const thing = document.querySelector('.container');
    thing.style.display = "none";
    const thing2 = document.querySelector('.endscreen');
    thing2.style.display = "block";
    const things = sprites;
    document.getElementById('totalHappiness').innerHTML = calculateTotalHappiness(things);
  }
}
function calculateTotalHappiness(sprites) {
    let totalHappiness = 0;
    for (const spriteName in sprites) {
        if (sprites.hasOwnProperty(spriteName)) {
            const sprite = sprites[spriteName];
            totalHappiness += sprite.happiness;
        }
    }
    return totalHappiness;
}

function goodHospital(){
  const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(7)');
  const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

  // Check if the container has any child elements with the class "sprites"
  const spriteElement = spriteContainerToHide.querySelector('.Sprite');

  if (spriteElement) {
      console.log('The container has a sprite.');

      // Access the id of the sprite element
      const sprite = spriteElement.id;
      console.log(sprite);

      // Access the age and education properties of the sprite instance
      console.log('Sprite Age:', sprites[sprite].age);
      console.log('Sprite Education:', sprites[sprite].education);
      console.log('Sprite health:', sprites[sprite].health);
      console.log('Sprite happiness:', sprites[sprite].happiness);

      // Move the sprite element to another container
      spriteContainerToShow.appendChild(spriteElement);
      sprites[sprite].health = 10;
      sprites[sprite].happiness++;
      money -= 30;
      moneyGone()
      document.getElementById('money-display').innerHTML = `Money: $${money}`;

      if (sprites[sprite].health > 10) {
        sprites[sprite].health = 10; // If health is greater than 10, set it to 10
      }
      if (sprites[sprite].happiness > 10) {
        sprites[sprite].happiness = 10; // If health is greater than 10, set it to 10
      }

      if (sprites[sprite].health < 5){
        sprites[sprite].happiness--;
      }
      if (sprites[sprite].health < 1){
        money = -3;
        moneyGone();
      }
      if (sprites[sprite].health > 8){
        sprites[sprite].happiness++;
      }

      // Remove the clicked object from the DOM
      spriteElement.style.display = "none";
      const spriteToRemove = document.getElementById(lastSelectedId);
      spriteToRemove.style.bottom = originalData.bottom;
      spriteToRemove.style.right = originalData.right;
      spriteToRemove.style.transform = originalData.transform;
      spriteToRemove.style.display = "none";

      money += parseInt(objectCost[index]);
      document.getElementById('money-display').innerHTML = `Money: $${money}`;
  } else {
      console.log('The container does not have a sprite.');
  }
}
function badHospital(){
  const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(6)');
  const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

  // Check if the container has any child elements with the class "sprites"
  const spriteElement = spriteContainerToHide.querySelector('.Sprite');

  if (spriteElement) {
      console.log('The container has a sprite.');

      // Access the id of the sprite element
      const sprite = spriteElement.id;
      console.log(sprite);

      // Access the age and education properties of the sprite instance
      console.log('Sprite Age:', sprites[sprite].age);
      console.log('Sprite Education:', sprites[sprite].education);
      console.log('Sprite health:', sprites[sprite].health);
      console.log('Sprite happiness:', sprites[sprite].happiness);

      // Move the sprite element to another container
      spriteContainerToShow.appendChild(spriteElement);
      sprites[sprite].health+=3;
      if (sprites[sprite].health > 10) {
        sprites[sprite].health = 10; // If health is greater than 10, set it to 10
      }
      if (sprites[sprite].happiness > 10) {
        sprites[sprite].happiness = 10; // If health is greater than 10, set it to 10
      }

      if (sprites[sprite].health < 5){
        sprites[sprite].happiness--;
      }
      if (sprites[sprite].health < 1){
        money = -3;
        moneyGone();
      }
      if (sprites[sprite].health > 8){
        sprites[sprite].happiness++;
      }
      money -= 10;
      moneyGone()
      document.getElementById('money-display').innerHTML = `Money: $${money}`;

      // Remove the clicked object from the DOM
      spriteElement.style.display = "none";
      const spriteToRemove = document.getElementById(lastSelectedId);
      spriteToRemove.style.bottom = originalData.bottom;
      spriteToRemove.style.right = originalData.right;
      spriteToRemove.style.transform = originalData.transform;
      spriteToRemove.style.display = "none";

      money += parseInt(objectCost[index]);
      document.getElementById('money-display').innerHTML = `Money: $${money}`;
  } else {
      console.log('The container does not have a sprite.');
  }
}
function house(){
  const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(3)');
  const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

  // Check if the container has any child elements with the class "sprites"
  const spriteElement = spriteContainerToHide.querySelector('.Sprite');

  if (spriteElement) {
      console.log('The container has a sprite.');

      // Access the id of the sprite element
      const sprite = spriteElement.id;
      console.log(sprite);

      // Access the age and education properties of the sprite instance
      console.log('Sprite Age:', sprites[sprite].age);
      console.log('Sprite Education:', sprites[sprite].education);
      console.log('Sprite health:', sprites[sprite].health);
      console.log('Sprite hapiness:', sprites[sprite].happiness);

      // Move the sprite element to another container
      spriteContainerToShow.appendChild(spriteElement);
      sprites[sprite].health++;
      sprites[sprite].happiness++;
      if (sprites[sprite].health > 10) {
        sprites[sprite].health = 10; // If health is greater than 10, set it to 10
      }
      if (sprites[sprite].happiness > 10) {
        sprites[sprite].happiness = 10; // If health is greater than 10, set it to 10
      }

      if (sprites[sprite].health < 5){
        sprites[sprite].happiness--;
      }
      if (sprites[sprite].health < 1){
        money = -3;
        moneyGone();
      }
      if (sprites[sprite].health > 8){
        sprites[sprite].happiness++;
      }

      // Remove the clicked object from the DOM
      spriteElement.style.display = "none";
      const spriteToRemove = document.getElementById(lastSelectedId);
      spriteToRemove.style.bottom = originalData.bottom;
      spriteToRemove.style.right = originalData.right;
      spriteToRemove.style.transform = originalData.transform;
      spriteToRemove.style.display = "none";

      money += parseInt(objectCost[index]);
      document.getElementById('money-display').innerHTML = `Money: $${money}`;
  } else {
      console.log('The container does not have a sprite.');
  }
}
function badschool(){
  const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(4)');
  const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

  // Check if the container has any child elements with the class "sprites"
  const spriteElement = spriteContainerToHide.querySelector('.Sprite');

  console.log('Sprite Age:', spriteElement)

  if (spriteElement) {
      console.log('The container has a sprite.');

      // Access the id of the sprite element
      const sprite = spriteElement.id;
      console.log(sprite);

      // Access the age and education properties of the sprite instance
      console.log('Sprite Age:', sprites[sprite].age);
      console.log('Sprite Education:', sprites[sprite].education);
      console.log('Sprite health:', sprites[sprite].health);
      console.log('Sprite happiness:', sprites[sprite].happiness);

      // Move the sprite element to another container
      spriteContainerToShow.appendChild(spriteElement);
      sprites[sprite].education++;
      sprites[sprite].health--;
      if (sprites[sprite].health > 10) {
        sprites[sprite].health = 10; // If health is greater than 10, set it to 10
      }
      if (sprites[sprite].happiness > 10) {
        sprites[sprite].happiness = 10; // If health is greater than 10, set it to 10
      }

      if (sprites[sprite].health < 5){
        sprites[sprite].happiness--;
      }
      if (sprites[sprite].health < 1){
        money = -3;
        moneyGone();
      }
      if (sprites[sprite].health > 8){
        sprites[sprite].happiness++;
      }

      money -= 100;
      moneyGone()
      document.getElementById('money-display').innerHTML = `Money: $${money}`;

      // Remove the clicked object from the DOM
      spriteElement.style.display = "none";
      const spriteToRemove = document.getElementById(lastSelectedId);
      spriteToRemove.style.bottom = originalData.bottom;
      spriteToRemove.style.right = originalData.right;
      spriteToRemove.style.transform = originalData.transform;
      spriteToRemove.style.display = "none";

      money += parseInt(objectCost[index]);
      document.getElementById('money-display').innerHTML = `Money: $${money}`;
  } else {
      console.log('The container does not have a sprite.');
  }
}
function goodschool(){
  const spriteContainerToHide = document.querySelector('.image-container:nth-of-type(8)');
  const spriteContainerToShow = document.querySelector('.image-container:nth-of-type(2)');

  // Check if the container has any child elements with the class "sprites"
  const spriteElement = spriteContainerToHide.querySelector('.Sprite');

  if (spriteElement) {
      console.log('The container has a sprite.');

      // Access the id of the sprite element
      const sprite = spriteElement.id;
      console.log(sprite);

      // Access the age and education properties of the sprite instance
      console.log('Sprite Age:', sprites[sprite].age);
      console.log('Sprite Education:', sprites[sprite].education);
      console.log('Sprite health:', sprites[sprite].health);
      console.log('Sprite happiness:', sprites[sprite].happiness);

      // Move the sprite element to another container
      spriteContainerToShow.appendChild(spriteElement);
      sprites[sprite].education+=3;
      sprites[sprite].happiness++;
      if (sprites[sprite].health > 10) {
        sprites[sprite].health = 10; // If health is greater than 10, set it to 10
      }
      if (sprites[sprite].happiness > 10) {
        sprites[sprite].happiness = 10; // If health is greater than 10, set it to 10
      }

      if (sprites[sprite].health < 5){
        sprites[sprite].happiness--;
      }
      if (sprites[sprite].health < 1){
        money = -3;
        moneyGone();
      }
      if (sprites[sprite].health > 8){
        sprites[sprite].happiness++;
      }
      money -= 500;
      moneyGone()
      document.getElementById('money-display').innerHTML = `Money: $${money}`;

      // Remove the clicked object from the DOM
      spriteElement.style.display = "none";
      const spriteToRemove = document.getElementById(lastSelectedId);
      spriteToRemove.style.bottom = originalData.bottom;
      spriteToRemove.style.right = originalData.right;
      spriteToRemove.style.transform = originalData.transform;
      spriteToRemove.style.display = "none";

      money += parseInt(objectCost[index]);
      document.getElementById('money-display').innerHTML = `Money: $${money}`;
  } else {
      console.log('The container does not have a sprite.');
  }
}