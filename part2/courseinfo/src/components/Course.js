const Header = ({name}) => (<div><h1>{name}</h1></div>)

const Part = ({part, exercises}) => (<div><p>{part} {exercises}</p></div>)

const Content = ({parts}) => {console.log(parts[0])
return (
<div>
    {parts.map((item, index) => <Part part = {parts[index].name} exercises = {parts[index].exercises} key={parts[index].id}/>)}
    <Total parts={parts}/>
</div>)}
  
const Total = ({parts}) => {
    console.log(parts[0].exercises)
    return (<div><p> Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)} </p></div>)}

const Course = ( {course} ) => (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
    </div>
)

const Courses = ( {courses} ) => (
    <div>
        {courses.map(course =>
            <Course key={course.id} course={course}/>
        )}
    </div>
)
export default Courses