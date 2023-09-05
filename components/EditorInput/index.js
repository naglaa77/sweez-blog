import {Editable} from "slate-react";
import CustomEditor from "../../utile/customEditor";
import React, {useCallback} from "react";

const CodeElement = (props) => (
    <pre {...props.attributes} style={{backgroundColor: "black", color: "white"}}>
      <code>{props.children}</code>
    </pre>
)

const HeadingElement = (props) => (
    <h1 {...props.attributes} style={{backgroundColor: "red", color: "white"}}>
        <code>{props.children}</code>
    </h1>
)
const DefaultElement = (props) => <p {...props.attributes}> {props.children.props?.children ?? props.children}</p>

const Leaf = (props) => (
    <span {...props.attributes} style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        textDecoration: props.leaf.underline ? 'underline' : 'none',
        fontStyle: props.leaf.italic ? 'italic' : 'norml'
    }}>
        {props.children}
    </span>
)


const EditorInput = (props) => {
    const {editor} = props
    const renderElement = useCallback((props) => {
        console.log('type', props.element.type)
        switch (props.element.type) {
            // case 'heading-one':
            //     console.log('Rendering heading-one');
            //     return <HeadingElement {...props}/>
            // case 'heading-two':
            //     return <h2 style={{fontSize: "2.5rem"}} {...props.attributes} >
            //         {props.children}
            //     </h2>

            case 'code':
                return <CodeElement {...props}/>
            default:
                console.log(props.children)
                return <DefaultElement {...props}/>
        }
    }, [])


    const renderLeaf = useCallback((props) => <Leaf {...props}/>, [])
    return (
        <Editable
            className="p-[.3rem]  border border-gray-300 mt-[1rem] md:mt-[1.5rem] rounded-[4px] text-base md:text-[1.2rem]  md:w-full"
            onChange={(value) => {
                console.log('onChange', value)
            }}
            editor={editor}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onPaste={(event) => {
                CustomEditor.handlePaste(editor, event)
            }}
            onKeyDown={event => {
                if (!event.ctrlKey) {

                    return
                }
                console.log(event.key)
                switch (event.key) {

                    case 'b': {
                        event.preventDefault()
                        CustomEditor.toggleMark(editor, 'bold')
                        break
                    }
                    case 'i': {
                        event.preventDefault()
                        CustomEditor.toggleMark(editor, 'italic')
                        break
                    }
                }
            }}
        />
    )
}
export default EditorInput