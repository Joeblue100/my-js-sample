class Details{
    constructor(firstName, lastName, emailAddress, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}

class UI {
    addDetialsToList(details){
        const list = document.querySelector('#my-docs');
        //Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${details.firstName}</td>
        <td>${details.lastName}</td>
        <td>${details.emailAddress}</td>
        <td>${details.password}</td>
        <td><a href="#" class="delete">X<a></td>`;
      list.appendChild(row);
    }

    showAlert(message, className) {
        //Create div
        const div = document.createElement('div');
        //Add Classes
        div.className = `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector('#my-form');
        //Insert
        container.insertBefore(div, form);

        //Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('emailAddress').value = '';
        document.getElementById('password').value = '';
    }
}

//Delete book
UI.prototype.deleteDetails = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}
  // Clear Fields 
  UI.prototype.clearFields = function() {
    document.getElementById('first name').value = '';
    document.getElementById('last name').value = '';
    document.getElementById('email address').value = '';
    document.getElementById('password').value = '';
} 

// Local storage class
class Store {
   static getDetails() {
    let details;
    if(localStorage.getItem('details') === null) {
        details = [];
    } else {
        details = localStorage.getItem('details');
    }

    }
   static displayDetails() {

    }
   static addDetails() {

    }
   static removeDetails() {

    }
}

    

//Events Listeners for add Details
document.getElementById('my-form').addEventListener('submit', 
function(e){
    //Get form values
    const firstName = document.getElementById('first name').value;
    const lastName = document.getElementById('last name').value;
    const emailAddress = document.getElementById('email address').value;
    const password = document.getElementById('password').value;
    // Instantiate details 
    const details = new Details(firstName, lastName, emailAddress, password);
    //Instantiate UI
    const ui = new UI();

    

    //validate
    if(firstName === '' || lastName === '' || emailAddress === '' || password === ''){
        //Error Alert
        ui.showAlert('Please fill in your details', 'error');
    } else{
        //ui to details
        ui.addDetialsToList(details);

        // Add to LS
        Store.addDetails(details);
        //Show success 
        ui.showAlert('Details Added!', 'success');

        //Clear Fields
        ui.clearFields();
    }
    e.preventDefault();
});
// Event Listener for delete
document.getElementById('my-docs').addEventListener('click', 
function(e){
     //Instantiate details and UI
      const ui = new UI();

      //Delete details
      ui.deleteDetails(e.target);
  
      //Show message
      ui.showAlert('Details Removed!', 'success');
      e.preventDefault();
});