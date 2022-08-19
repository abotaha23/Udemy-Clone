const CoursesTemplate = document.querySelector("[courses-template]")
const PythonCoursesContainer = document.querySelector("[python-courses-container]")
const SearchCourses = document.querySelector("[search-courses]")

let courses = []

SearchCourses.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
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
        const id = course.id
        const image = Course.querySelector("[image]")
        const title = Course.querySelector("[title]")
        const tutor = Course.querySelector("[tutor]")
        const rating = Course.querySelector("[rating]")
        const numberofvotes = Course.querySelector("[numberofvotes]")
        const price = Course.querySelector("[price]")
        const bestseller = Course.querySelector("[bestseller]")

        image.src = course.image
        image.alt = "course"+id

        title.textContent = course.title
        tutor.textContent = course.tutor
        
        price.textContent = course.price

        if (id == 1) {
            rating.textContent = "4 ⭐⭐⭐⭐"
            numberofvotes.textContent = "(942)"
            bestseller.classList.toggle("hide", true) // hide it if it's not a bestseller
        }

        else if (id == 2) {
            rating.textContent = "4 ⭐⭐⭐⭐"
            numberofvotes.textContent = "(253)"
            bestseller.textContent = "Bestseller"
        }

        else if (id == 3) {
            rating.textContent = "3 ⭐⭐⭐"
            numberofvotes.textContent = "(458)"
            bestseller.classList.toggle("hide", true)
        }

        else if (id == 4) {
            rating.textContent = "4 ⭐⭐⭐⭐"
            numberofvotes.textContent = "(112)"
            bestseller.classList.toggle("hide", true)
        }

        else {
            rating.textContent = "5 ⭐⭐⭐⭐⭐"
            numberofvotes.textContent = "(93)"
            bestseller.classList.toggle("hide", true) 
        }

        PythonCoursesContainer.append(Course)

        return { title: course.title, tutor: course.tutor, element: Course }
    })
})