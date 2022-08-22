const CoursesTemplate = document.querySelector("[courses-template]")
const PythonCoursesContainer = document.querySelector("[python-courses-container]")
const form = document.querySelector("form")

let courses = []

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const value = document.querySelector("[search-courses]").value
    courses.forEach(course => {
        const ok = course.title.toLowerCase().includes(value) || course.tutor.toLowerCase().includes(value)
        course.element.classList.toggle("hide", !ok)
    })
})

fetch("http://localhost:3000/courses")
.then(res => res.json())
.then(data => {
    courses = data.map(course => {
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

        PythonCoursesContainer.append(Course)

        return { title: course.title, tutor: course.tutor, element: Course }
    })
})