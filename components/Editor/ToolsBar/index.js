import CustomEditor from "../../../utile/customEditor";

const ToolsBar = ({editor}) => {

    return (
        <div className=" flex gap-4 pb-1 bg-gray-300">
            <button className="font-bold  p-1.5 md:px-3 md:py-1 rounded-md text-base md:text-tablet"
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleMark(editor, 'bold')
                    }}>
                B
            </button>

            <button
                className="underline underline-offset-1  p-1.5 md:px-3 md:py-1 rounded-md text-base md:text-tablet"
                onMouseDown={(event) => {
                    event.preventDefault()
                    CustomEditor.toggleMark(editor, 'underline')
                }}>
                U
            </button>

            <button className="p-1.5 md:px-3 md:py-1 rounded-md text-base md:text-tablet italic uppercase"
                    onMouseDown={(event) => {
                        event.preventDefault()
                        CustomEditor.toggleMark(editor, 'italic')
                    }}>
                I
            </button>

        </div>
    )
}
export default ToolsBar