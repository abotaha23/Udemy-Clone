const PythonCoursesTemplate = document.querySelector("[python-courses-template]")
const PythonCoursesContainer = document.querySelector("[python-courses-container]")
const ExcelCoursesTemplate = document.querySelector("[excel-courses-template]")
const ExcelCoursesContainer = document.querySelector("[excel-courses-container]")
const form = document.querySelector("form")

let python_courses = [], excel_courses = []

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const value = document.querySelector("[search-courses]").value.toLowerCase()
    python_courses.forEach(course => {
        const ok = course.title.toLowerCase().includes(value) || course.tutor.toLowerCase().includes(value)
        course.element.classList.toggle("hide", !ok)
    })
    excel_courses.forEach(course => {
        const ok = course.title.toLowerCase().includes(value) || course.tutor.toLowerCase().includes(value)
        course.element.classList.toggle("hide", !ok)
    })
})

let count_courses = 0, wanted = Math.ceil(window.innerWidth/350.0)

let new_carousel_item = document.createElement("div")
new_carousel_item.classList.add("carousel-item")
new_carousel_item.classList.add("active")

let new_cards_wrapper = document.createElement("div")
new_cards_wrapper.classList.add("cards-wrapper")

new_carousel_item.appendChild(new_cards_wrapper)


fetch("http://localhost:3000/Python")
.then(res => res.json())
.then(data => {
    python_courses = data.map(course => {
        const Course = PythonCoursesTemplate.content.cloneNode(true).children[0]
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

        if (++count_courses == wanted) {
            PythonCoursesContainer.appendChild(new_carousel_item)

            new_carousel_item = document.createElement("div")
            new_carousel_item.classList.add("carousel-item")
           
            new_cards_wrapper = document.createElement("div")
            new_cards_wrapper.classList.add("cards-wrapper")

            new_carousel_item.appendChild(new_cards_wrapper)

            count_courses = 0
        }

        return { title: course.title, tutor: course.tutor, element: Course }
    })
})

if (count_courses) PythonCoursesContainer.appendChild(new_carousel_item)

let count_courses2 = 0, wanted2 = Math.ceil(window.innerWidth/350.0)

let new_carousel_item2 = document.createElement("div")
new_carousel_item2.classList.add("carousel-item")
new_carousel_item2.classList.add("active")

let new_cards_wrapper2 = document.createElement("div")
new_cards_wrapper2.classList.add("cards-wrapper")

new_carousel_item2.appendChild(new_cards_wrapper2)


fetch("http://localhost:3000/Excel")
.then(res => res.json())
.then(data => {
    excel_courses = data.map(course => {
        const Course = ExcelCoursesTemplate.content.cloneNode(true).children[0]
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
        
        new_cards_wrapper2.appendChild(Course)

        if (++count_courses2 == wanted2) {
            ExcelCoursesContainer.appendChild(new_carousel_item2)

            new_carousel_item2 = document.createElement("div")
            new_carousel_item2.classList.add("carousel-item")
           
            new_cards_wrapper2 = document.createElement("div")
            new_cards_wrapper2.classList.add("cards-wrapper")

            new_carousel_item2.appendChild(new_cards_wrapper2)

            count_courses2 = 0
        }

        return { title: course.title, tutor: course.tutor, element: Course }
    })
})

if (count_courses2) ExcelCoursesContainer.appendChild(new_carousel_item2)
