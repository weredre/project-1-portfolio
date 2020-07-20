/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
// function myFunction() {
//   var x = document.getElementById("myLinks");
//   if (x.style.display === "block") {
//     x.style.display = "none";
//   } else {
//     x.style.display = "block";
//   }
// }
let url = `https://spreadsheets.google.com/feeds/list/1TuLZxeZam3eE970199Qj9Rrv94OnYqXdvjx4PgKJa08/od6/public/values?alt=json`

fetch(url)  // starts the fetch process
    .then( response => response.json() )    // returns the JSON data as a JS object
    .then( data => {

        // creates an array of parsed project objects
        const projects = data.feed.entry.map( entry => {
             return {
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                url: entry.gsx$url.$t
             }
         })

         app(projects)  // calls the application with your new projects array as argument

    })

// all application logic is included inside the app() function
const app = (projects) => {

    // creates a jQuery DOM element based on an individual project object
    const createProjectElement = (project) => {
        const $div = $('<div>').addClass("project")
        $div.append($('<h2>').text(project.title))
        $div.append($('<img>').attr('src', project.image))
        $div.append($('<p>').addClass("description").text(project.description))
        $div.append($('<a>').attr('href', project.url).text("LINK >>"))
        return $div
    }

    // adds each project element to <body>
    projects.forEach(project => {
        const $projectDiv = createProjectElement(project)
        $('#portfolio').append($projectDiv)
    })

}
