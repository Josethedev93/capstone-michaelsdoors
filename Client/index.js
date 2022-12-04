const form = document.querySelector('form')
const nameInput = document.querySelector('#customer-input')
const formList = document.querySelector('#form-list')
const addressInput = document.querySelector('#add-input')
const hingeInput = document.querySelector('#hinge')
const widthInput = document.querySelector('#width')
const heightInput = document.querySelector('#height')
const thickenessInput = document.querySelector('#thickeness')
const swingInput = document.querySelector('#swing')
const prepInput = document.querySelector('#prep')
const frameInput = document.querySelector('#frame')

// const inputs = [nameInput, addressInput, hingeInput, widthInput, heightInput, thickenessInput, swingInput, prepInput, frameInput]

// inputs.forEach(input => {
//     input.addEventListener('change', (e) => {
//         input.value = e.target.value
//         console.log(input.value)
//     })
// })

function search_form() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('form-card');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else{
            x[i].style.display="";     
        }
        
    }
}
function handleSubmit(e) {
    e.preventDefault()
    
    if (nameInput.value < 1) {
        alert ('You must enter all fields')
        return
    }

    let body = {
        name: nameInput.value,
        address: addressInput.value,
        hinge: hingeInput.value,
        width: widthInput.value,
        height: heightInput.value,
        thickeness: thickenessInput.value,
        swing: swingInput.value,
        prep: prepInput.value,
        frame: frameInput.value,
    }

    axios.post('/door_form', body)
        .then(() => {
            
            nameInput.value = ''
            addressInput.value = ''
            hingeInput.value = ''
            widthInput.value = ''
            heightInput.value = ''
            thickenessInput.value = ''
            swingInput.value = ''
            prepInput.value = ''
            frameInput.value = ''
            getDoorForm()
        })
}

// function updateCard() {
//     let body = {
//         name: nameInput.value,
//         address: addressInput.value,
//         hinge: hingeInput.value,
//         width: widthInput.value,
//         height: heightInput.value,
//         thickeness: thickenessInput.value,
//         swing: swingInput.value,
//         prep: prepInput.value,
//         frame: frameInput.value,
       
//     }

//     axios.put(`http://localhost:4069/door_form`, body)
//         .then(res => getDoorForm(res))
//         .catch(err => console.log(err))
// }

function deleteCard(id) {
    let result = confirm("Are You Sure You Want To Delete?");
if (result) {
    axios.delete(`/door_form/${id}`)
        .then(() => getDoorForm())
        .catch(err => console.log(err))
}
}

function getDoorForm() {
    formList.innerHTML = ''

    axios.get('/door_form/')
        .then(res => {
            res.data.forEach(elem => {
                let formCard = `<div class="form-card">
                    <h2>${elem.name}<h2> 
                    <h3>${elem.address}</h3>
                    <p>hinge: ${elem.hinge}</p>
                    <p>width: ${elem.width}</p>
                    <p>height: ${elem.height}</p>
                    <p>thickness: ${elem.thickeness}</p>
                    <p>swing: ${elem.swing}</p>
                    <p>prep: ${elem.prep}</p>
                    <p>frame: ${elem.frame}</p>
                    <button onclick="deleteCard(${elem['form_id']})">Delete</button>
                    </div>
                `

                formList.innerHTML += formCard
            })
        })
}
getDoorForm()
form.addEventListener('submit', handleSubmit)
