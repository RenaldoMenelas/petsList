window.addEventListener("load", async (e) => {

    try {
        const response = await fetch('http://localhost:3000/pets')
        const pets = await response.json()
        const petsContainer = document.getElementById('pets-container');
        console.log(pets)
        // Create HTML elements for each pet
        pets.forEach(pet => {
            const petElement = document.createElement('div');
            petElement.classList.add('pet');

            const petName = document.createElement('h3');
            petName.textContent = `Name: ${pet.pet_name}`;
            
            const petPic = document.createElement('img')
            petPic.src = `${pet.picture_pic}`

            const petSpecies = document.createElement('p');
            petSpecies.textContent = `Species: ${pet.species}`;

            const removeBtn = document.createElement('button')
            removeBtn.classList.add('btn')
            removeBtn.id = `${pet.id}`
            removeBtn.textContent = 'remove'

            // Append the created elements to the container
            petElement.appendChild(petName);
            petElement.appendChild(petPic)
            petElement.appendChild(petSpecies);
            petElement.appendChild(removeBtn)
            petsContainer.appendChild(petElement);
           
        });
       
    } catch (error) {
       console.error('Error:', error);
    }
    removePet()
   
});

const removePet = () => {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', async e => {
            const petId = btn.id
            try {
                const response = await fetch(`http://localhost:3000/delete-pet/${petId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    // Optionally, include a body if required
                });

                if (response.ok) {
                    console.log(`Pet with ID ${petId} deleted successfully`);
                    // Optionally, remove the deleted pet from the client-side UI
                    btn.parentNode.remove(); // Remove the parent element of the clicked button
                } else {
                    console.error('Failed to delete pet');
                }
            } catch (error) {
                console.error('Error:', error);
            }
       })

    })


}
   
  


document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault(); 
  
    const pet_name = document.getElementById('pet-name').value;
    const picture = document.getElementById('Profile-pic').value;
    const animal = document.querySelector('input[name="animal"]:checked').value;
    const isFriendly = document.getElementById('checkbox').checked;
  
    try {
      const response = await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ pet_name, picture, animal, isFriendly })
      });
  
      if (response.ok) {
        console.log('Form data sent successfully');
      } else {
        console.error('Error sending form data');
      }
    } catch (error) {
      console.error('Error sending form data:', error.message);
    }
    window.location.reload();
  });
