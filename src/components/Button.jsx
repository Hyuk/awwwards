export default function Button(props) {
  return (
    <button className="bg-blue-75 text-blue-100 px-5 py-2 rounded-lg">
      {props.title}
    </button>
  )
}