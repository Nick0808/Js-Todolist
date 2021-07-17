// Dark mode toggle
document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('nav').classList.toggle('dark')
    document.querySelector('nav').classList.toggle('light')
}

// Check leap year
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !==0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let month_picker = document.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}
// Generate Calendar

generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    let calendar_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML =''

    let currentDate = new Date()
    if (!month) month = currentDate.getMonth()
    if (!year) year = currentDate.getFullYear()

    let current_month = `${month_names[month]}`
    month_picker.innerHTML = current_month
    calendar_header_year.innerHTML = year

    // get firest day of month

    let first_day = new Date(year, month, 1)

    for(let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if(i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
        if (i - first_day.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
            day.classList.add('current-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.onclick = () => {
        month_list.classList.remove('show')
        current_month.value = index
        generateCalendar(current_month.value, current_year.value)
    }
    month_list.appendChild(month)
})

document.querySelector('#prev-year').onclick = () => {
    --current_year.value
    generateCalendar(current_month.value, current_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++current_year.value
    generateCalendar(current_month.value, current_year.value)
}

let currentDate = new Date()

let current_month = {value: currentDate.getMonth()}
let current_year = {value: currentDate.getFullYear()}

generateCalendar(current_month.value, current_year.value)
