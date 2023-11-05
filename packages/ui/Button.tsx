export const Button = ({ onSubmit, buttonText }) => {
    return (
        // <button onClick={ onSubmit } type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-3 px-5 dark:focus:ring-yellow-900">{ buttonText }</button>
        <button onClick={ onSubmit } type="button" className="bg-yellow-500">{ buttonText }</button>
    )
}