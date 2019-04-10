// creates users w/ element paramter
function createUser(element) {
    // returns document with element created in document
    return document.createElement(element);
}

function append(parent, element) {
    return document.appendChild(element);
}



fetch('https://randomuser.me/api/?results=50')
    //first async request; response is transformed into json format
    .then((response) => console.log(response.json()))

    // gathers and organizes data for display in html input
    .then(function (data) {
        let users = response.data.results;
        // return users into mapped array into function of user
        return users.map(function (user) {
            //creates three more variables for element creation
            let li = createUser('li'),
                img = createUser('img'),
                p = createUser('p');
            img.src = user.picture.large;
            p.innerHTML = `${user.name.first} ${user.name.last}`;
            // for each li add an image tag
            append(li, img);
            // for each li add a parapgragh tag
            append(li, p);
            append(document/getElementById('users', li))
        })
})

.then(function(data){

})

.catch(function(error){
    console.log(error)
})
