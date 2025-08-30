export default function TestCSS() {
  return (
    <div className="bg-red-500 text-white p-8 m-4">
      <h1 className="text-2xl font-bold">CSS Test Page</h1>
      <p className="mt-4">If you can see red background and white text, basic Tailwind is working.</p>
      <div className="bg-blue-500 p-4 mt-4 rounded-lg">
        <p>This should be blue with rounded corners</p>
      </div>
    </div>
  )
}
