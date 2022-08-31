const CoursesTemplate = document.querySelector("[courses-template]")
const PythonCoursesContainer = document.querySelector("[python-courses-container]")
const ExcelCoursesContainer = document.querySelector("[excel-courses-container]")
const form = document.querySelector("form")
const NumOfCourses = 2

let python_courses = [], excel_courses = []
let courses_categories = [python_courses, excel_courses]
let courses_servers = ["Python", "Excel"]
let containers = [PythonCoursesContainer, ExcelCoursesContainer]
let last_searched_text = "" // to keep track of the filtered courses when resizing

window.addEventListener("resize", (e) => {
    e.preventDefault()
    display_courses(last_searched_text)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    last_searched_text = document.querySelector("[search-courses]").value.toLowerCase()
    display_courses(last_searched_text)
})

// fetching the courses from the data base

for (let i = 0; i < NumOfCourses; i++) {
    let new_carousel_item = document.createElement("div")
    new_carousel_item.classList.add("carousel-item")
    new_carousel_item.classList.add("active")

    let new_cards_wrapper = document.createElement("div")
    new_cards_wrapper.classList.add("cards-wrapper")

    new_carousel_item.appendChild(new_cards_wrapper)

    let count_courses = 0
    let courses_per_slide = Math.ceil(window.innerWidth/350.0)

    fetch("http://localhost:3000/"+courses_servers[i])
    .then(res => res.json())
    .then(data => {
        courses_categories[i] = data.map(course => {
            const Course = CoursesTemplate.content.cloneNode(true).children[0]
            const image = Course.querySelector("[image]")
            const title = Course.querySelector("[title]")
            const tutor = Course.querySelector("[tutor]")
            const rating = Course.querySelector("[rating]")
            const numberofvotes = Course.querySelector("[numberofvotes]")
            const price = Course.querySelector("[price]")
            const bestseller = Course.querySelector("[bestseller]")

            image.src = course.image
            image.alt = "course"+course.id

            title.textContent = course.title

            tutor.textContent = course.tutor

            rating.textContent = course.rating
            numberofvotes.textContent = course.numberofvotes
            
            price.textContent = course.price

            bestseller.classList.toggle("hide", course.bestseller === "no")

            new_cards_wrapper.appendChild(Course)
            if (++count_courses >= courses_per_slide) {
                containers[i].appendChild(new_carousel_item)
                new_carousel_item = document.createElement("div")
                new_carousel_item.classList.add("carousel-item")
                new_cards_wrapper = document.createElement("div")
                new_cards_wrapper.classList.add("cards-wrapper")
                new_carousel_item.appendChild(new_cards_wrapper)
                count_courses = 0
            }


            return { title: course.title, tutor: course.tutor, element: Course }
        })
        if (count_courses) containers[i].appendChild(new_carousel_item)
    })
}

function display_courses(value)
{
    let courses_per_slide = Math.ceil(window.innerWidth/350.0)
    let python_courses_to_be_displayed = []
    let Excel_courses_to_be_displayed = []
    let courses_to_be_displayed = [python_courses_to_be_displayed, Excel_courses_to_be_displayed]

    // filter courses
    for (let i = 0; i < NumOfCourses; i++) {
        while(containers[i].firstChild) { // remove all the previous displayed items
            containers[i].removeChild(containers[i].lastChild)
        }
        courses_categories[i].forEach(course => {
            const ok = course.title.toLowerCase().includes(value) || course.tutor.toLowerCase().includes(value)
            if (ok) courses_to_be_displayed[i].push(course)
        })
    }

    // display filtered courses
    for (let i = 0; i < NumOfCourses; i++) {
        let count_displayed_courses = 0
        let new_carousel_item = document.createElement("div")
        new_carousel_item.classList.add("carousel-item")
        new_carousel_item.classList.add("active")
        let new_cards_wrapper = document.createElement("div")
        new_cards_wrapper.classList.add("cards-wrapper")
        new_carousel_item.appendChild(new_cards_wrapper)
        for (let j = 0; j < courses_to_be_displayed[i].length; j++) {
            new_cards_wrapper.appendChild(courses_to_be_displayed[i][j].element)
            if (++count_displayed_courses >= courses_per_slide) {
                containers[i].appendChild(new_carousel_item)
                new_carousel_item = document.createElement("div")
                new_carousel_item.classList.add("carousel-item")
                new_cards_wrapper = document.createElement("div")
                new_cards_wrapper.classList.add("cards-wrapper")
                new_carousel_item.appendChild(new_cards_wrapper)
                count_displayed_courses = 0
            }
        }
        if (count_displayed_courses) containers[i].appendChild(new_carousel_item)
    }
}

